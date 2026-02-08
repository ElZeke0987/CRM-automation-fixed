from pynput import keyboard
from ocrStep import ocrStep
from screenshotStep import capturar_ventana_mss, lista_imagenes_bgr
from jsExecutor import ejecutarNLPJS


def al_presionar(tecla):
    try:
        # Si la tecla tiene un nombre (letras, números)
        nombre_tecla = tecla.char
    except AttributeError:
        # Si es una tecla especial (Ctrl, Alt, F1, etc)
        nombre_tecla = str(tecla)

     


    if nombre_tecla == 'p':
        print("=====SCREENSHOT TAKEN=====")
        capturar_ventana_mss("WhatsApp")
    if nombre_tecla == 'o':
        print("=====OCR STEP=====")
        print(f"Procesando {len(lista_imagenes_bgr)} imágenes")
        ocrStep(lista_imagenes_bgr)
        lista_imagenes_bgr.clear()
    # ACCIÓN: Detener el programa con la tecla 'Esc'
    if nombre_tecla == 'i':
        ejecutarNLPJS("automation")
    if tecla == keyboard.Key.esc :
        print("Cerrando programa...")
        return False

def startKeyHandler():
    # Iniciar el escuchador
    with keyboard.Listener(on_press=al_presionar) as escuchador:
        print("Escuchando inputs de teclado")
        escuchador.join()