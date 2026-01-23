log_clearing = True
from difflib import SequenceMatcher
import re
unnecesary_words = ['anunciodefacebook',
'pago', 
'gracias',
'buenosdias'
'verdetalles', 
'teinteresennostrospurificedores?te', 
'teinteresennostrospurificedoreste',
'hazclicaguíparaverlainformacióndecontacto',
'buenastardes',
'lasucursalcorrespondienteatuzonagracias',
'porfavorindicamelalocalidadparaquetepasentoda',
'lainformacionpromocionesyformasdepagodesde',
'muchasgraciasportucontactoyaderivetuconsultv',
'alasucursalcorrespondienteatuzonasevana',
'estarcontactandoconvosparapoderasesorartey',
'pasartetodalainformacionpromocionesvformasde',
'másinfopor',
'correspondienteatuzonase',
'contactando',
'pasartetodala',
'ainformacionpromocionesy',
'formasdepagodesde',
'formasde',
'ofrecemospruebagrantis', 
'ofrecemospruebagratis',
'iteinteresannuestrospurificadoreste',
'recibisteunmensajeentutelefonoperonoescompatibleconestaversinde', 
'simeinteresa', 
'holacómoestásminombreesmicaelaparareciir',
'holacómoestásminombreesmicaelapararecibir' 
'tunombre',
'paraquélocalidadeselpurificador',
'whatsappweb',
'recibisteunmensajeentutelefonoperonoescompatibleconestaversionde',
'recibisteunmensajeentutelefonoperonoescompatibleconestaversionde',
'***',
'seactivaronlosmensajestemporaleslosmensajesnuevosdesaparecerande',
'opcionparaconservarloshazclicparacambiaresto',
'estechatdespuésde24horasdehabersidoenviadosamenosqueseusela',
'másinfoporfavorindicame'
'holacómoestásminombreesmicaelapararecibir'
'3aluu',
'3aluu',
'tunombre',
'享',
'másinfoporfavorindicame']

def es_similar(texto_ocr, lista_negra, umbral=0.8):
    """
    Retorna True si el texto_ocr se parece a alguno de la lista negra.
    Umbral 0.8 significa 80% de similitud.
    """
    for palabra_basura in lista_negra:
        similitud = SequenceMatcher(None, texto_ocr, palabra_basura).ratio()
        if similitud >= umbral:
            return True
    return False

def clearText(rec_texts):

    clearedText = {
        "number": rec_texts[0],
        "text": ""
    }
    for i, text in enumerate(rec_texts):
        text_no_signos = text.lower()
        #text_no_signos = ''.join(c for c in text_no_signos if c.isalnum() or c.isspace())
        #Revisar el cambio de signos por espacios
        text_prc = text.strip().lower()
        text_prc = ''.join(c for c in text_prc if c.isalnum())

        if log_clearing:
            print(f"Procesando texto: {text_prc} y {text_no_signos}")
        # Expresión regular para detectar formatos tipo 13:34, 1:20, 08:00
        patron_hora = re.compile(r'^\d{1,2}:\d{2}$')


        # Comprobamos aproximación
        # 1. ¿Es una hora exacta? (Ej: "13:34")
        
        # Comprobamos si el texto solo contiene numeros
        if text_prc.isdigit():
            if log_clearing:
                print(f"Eliminado (Solo números): {text_prc}")
            continue

        if patron_hora.match(text):
            if log_clearing:
                print(f"Eliminado (Patrón Hora): {text}")
            continue
            
        # 2. ¿Es una palabra basura (usando aproximación)?
        # (Aquí podrías integrar el es_similar que vimos antes)
        if any(word in text_prc for word in unnecesary_words) or es_similar(text_prc, unnecesary_words):
            if log_clearing:
                print(f"Eliminado (Palabra basura): {text_prc}")
            continue
        tabla = str.maketrans(".-", "  ") # Cambia '.' por ' ' y '-' por ' '
        texto_limpio = text_no_signos.translate(tabla)
        clearedText["text"] += " " + texto_limpio

       
    return clearedText