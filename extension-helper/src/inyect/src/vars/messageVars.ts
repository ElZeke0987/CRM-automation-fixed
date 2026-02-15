const hour = new Date().getHours()
export const greetingByHour1 = (hour >= 6 && hour < 12) ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches"
export const greetingByHour2 = (hour >= 6 && hour < 12) ? "Buen día" : hour < 19 ? "Buenas tardes" : "Buenas noches"
export const myName = "Micaela"
export const whoYouAre = `Soy ${myName}, gracias por contactarnos`

export const greetingNormal = "¡Hola! 😊"
export const greeting = greetingByHour1 + ", " + whoYouAre

/*
Por favor indicame la localidad para que te pasen toda la información, 
promociones y formas de pago desde la sucursal correspondiente a tu zona. Gracias
*/
export const firstQuestion1 = "Para pasarte precio, del purificador, decime por favor tu localidad."
export const firstQuestion2 = `Por favor indicame la localidad para que te pasen toda la información, promociones y formas de pago desde la sucursal correspondiente a tu zona. Gracias`

export const firstQuestion = firstQuestion2

export const secondQuestion = "¿Con quien tengo el gusto?"

