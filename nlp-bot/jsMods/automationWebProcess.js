
import { chromium } from "playwright";
import fs from "fs";

const userCredentials = {
    email: "***REMOVED***",
    password: "***REMOVED***"
}

async function processContacts(page){
    await page.goto("https://crm.jeny.com.ar/addlead.php", {
        waitUntil: 'domcontentloaded'
    });


    const jsonContacts = JSON.parse(fs.readFileSync("nlp-bot/contactToLoad.json", "utf-8"))
    let contactToLoad = jsonContacts.list

    // 2. Usar for...of para asegurar ejecución SECUENCIiAL
    for (let i = 0; i < contactToLoad.length; i++) {
        const contact = contactToLoad[i];
        try {
            await page.goto("https://crm.jeny.com.ar/addlead.php", {
                waitUntil: 'domcontentloaded',
            });

            console.log(`Procesando: ${contact.id}...`);

            // Llenado de campos

            if(!contact.nombres){
                await page.click("button[id='nn1']");
                continue;
            }

            await page.fill('input[name="leadname"]', contact.nombres);

            
            await page.fill('input[name="leadloca"]', contact.localidades);
            
            const numeroLimpio = contact.id.replace(/[\s-\.]/g, "");
            await page.fill('input[name="leadcel"]', numeroLimpio);

            // Lógica de Radio y Select
            if (contact.pulls === "interior") {
                await page.locator('input[type="radio"]').nth(1).check();
                await page.selectOption('select[id="sgrupoderi"]', '27');
            } else {
                await page.selectOption('select[id="spullderi"]', contact.pulls);
            }

            // Enviar y esperar
            

            console.log("Contacto: AGREGADO AL CRM +++++");
            // 2. DETENER el script hasta que TÚ hagas clic en el botón
            await page.waitForFunction(() => {
                // Buscamos el botón type="submit"
                const btn = document.querySelector('button[type="submit"]');
                return new Promise((resolve) => {
                    btn.addEventListener('click', () => resolve(true), { once: true });
                });
            });

            console.log("¡Clic detectado! Pasando al siguiente registro...");
            // 3. Actualizar el archivo JSON quitando el procesado
            const remainingContacts = contactToLoad.filter(c => c.id !== contact.id);
            fs.writeFileSync("nlp-bot/contactToLoad.json", JSON.stringify({
                list: remainingContacts
            }, null, '\t'));
            
            // Actualizamos la referencia local para el filtro del próximo ciclo
            contactToLoad = remainingContacts;

        } catch (error) {
            console.error(`Error con el contacto ${contact.id}:`, error.message);
            // Si falla uno, el bucle sigue con el siguiente gracias al try/catch
        }
    }
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function execute(page){
    await sleep(100);
    await processContacts(page);
}

export async function startAutomationWebProcess(){//Se debe iniciar una vez se tengan todos los datos en un JSON, asi se cargan todos de una
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    console.log("Browser and page created");
    try {
        console.log('Navegando...');
        // Prueba con opciones comunes de solución
        await page.goto("https://crm.jeny.com.ar/login.php", {
        waitUntil: 'domcontentloaded',
        timeout: 60000
        });

        await page.waitForSelector('input[name="email"]');
        await page.fill('input[name="email"]', userCredentials.email);
        
        await page.waitForSelector('input[name="password"]');
        await page.fill('input[name="password"]', userCredentials.password);

        await page.waitForSelector('button[type="submit"]');
        await page.click('button[type="submit"]');

        
        console.log('¡Login exitoso!');

        await execute(page)

        
    } catch (error) {
        console.error('ERROR CAPTURADO:', error.message); // **MUY IMPORTANTE**
    } finally {
        // No cerrar inmediatamente para poder ver los logs
        console.log('Script finalizado. El navegador se mantiene abierto.');
        // await browser.close(); // Puedes descomentarlo después
    }
}

