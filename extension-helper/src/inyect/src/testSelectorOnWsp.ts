export function testSelectorOnWsp(){
    const selector = prompt("Testear selector")
    if(!selector){
        alert("Cancelando operacion (no se ingreso selector)")
        return
    }
    const whatsappNumberElement = document.querySelectorAll(selector)
    
    if(whatsappNumberElement&&whatsappNumberElement.length>0){
        alert("Elemento encontrado (revisar consola)")
        console.log("whatsappNumberElement: ", whatsappNumberElement)
        return
    }
    alert("Elemento no encontrado")
}