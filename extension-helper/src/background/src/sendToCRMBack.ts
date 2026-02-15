import { crmRequest } from "../../inyect/src/types";
import { plusToStorage } from "./utils";


export async function getFormToken() {
  try {
    const res = await fetch("https://crm.jeny.com.ar/addlead.php", {
      method: "GET",
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });

    if (!res.ok) {
      throw new Error("No se pudo cargar CRM");
    }

    const html = await res.text();
    const extractFormTokenRegex= /<input\b[^>]*\bname=["']form_token["'][^>]*\bvalue=["']([^"']+)["'][^>]*>/;
    const formTokenMatch = html.match(extractFormTokenRegex);


    const token = formTokenMatch ? formTokenMatch[1] : null;

    if (!token) {
      throw new Error("No se encontró form_token");
    }

    return token;
  } catch (err) {
    console.error("Error obteniendo form token:", err);
    return null;
  }
}

export async function sendToCRM(data: crmRequest) {
    const formToken = await getFormToken();
    if(!formToken&&!data.form_token){
        throw new Error("No se pudo obtener el form token. Cortando para evitar problemas con el CRM");
    }
    data.form_token = formToken || data.form_token!;
    console.log("Form token: ", data.form_token);
    const withDefaults={
        ...data,
        leadloca: data.leadloca || "NNN",
        leadname: data.leadname || "NNN",
        asignacion: data.asignacion || "derivar",
        producto: data.producto || "2",
        gestion: data.gestion || "1",
        comentario: data.comentario || "",
        cargar: data.cargar || ""
    }
    if(withDefaults.sgrupoderi === ""){
        delete withDefaults.sgrupoderi;
    }
    console.log("Last test before fetching: ", withDefaults)
    const res = await fetch("https://crm.jeny.com.ar/addlead.php", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(withDefaults as Record<string, string>)
    });

    if (!res.ok) {
        throw new Error("No se pudo enviar el lead a CRM");
    }
    
    const responseText = await res.text();
    const matchRegex = /var\s+mensaje\s*=\s*["']<span\b[^>]*>([\s\S]*?)<\/span>["']/;
    const resultStatusMsgMatch = responseText.match(matchRegex);
    const resultStatusMsg = resultStatusMsgMatch?.[1] || "";
    
    if(resultStatusMsg==="Se agregó contacto!"){
        if(data.leadloca==="NNN"){
            plusToStorage(1, "agregado", true);
            console.log("Agregado NNN");
        }else{
            if(data.asignacion==="derivar"&&data.sgrupoderi==="27"){
                plusToStorage(1, "agregado_interior");
                console.log("Agregado interior");
            }else if(data.asignacion==="pull"&&data.sgrupoderi!=="27"){
                plusToStorage(1, "agregado_pull");
                console.log("Agregado normal");
            }
        }
    }else if( resultStatusMsg==="Se actualizó contacto!"){
        if(data.leadloca==="NNN"){
            plusToStorage(1, "actualizado", true);
            
        }else{
            if(data.asignacion==="derivar"&&data.sgrupoderi==="27"){
                plusToStorage(1, "actualizado_interior");
            }else if(data.asignacion==="pull"&&data.sgrupoderi!=="27"){
                plusToStorage(1, "actualizado_pull");
            }
        }
    }
    
    
    return resultStatusMsg;
}
