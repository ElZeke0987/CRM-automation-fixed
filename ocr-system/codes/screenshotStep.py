import mss
import mss.tools
import pygetwindow as gw
import time
from datetime import datetime
from pynput import keyboard
from ocrStep import ocrStep
from PIL import Image
import numpy as np
import cv2

lista_imagenes_bgr = []      

def capturar_ventana_mss(titulo_ventana):
    # ... (aquí buscas tu ventana como ya haces) ...
    
    # Ajustamos la región
    # IMPORTANTE: mss a veces falla si el ancho/alto no son números pares
    ventanas = gw.getWindowsWithTitle(titulo_ventana)
    if not ventanas:
        print(f"No se encontró ventana con título: '{titulo_ventana}'")
        return
    ventana = ventanas[0]  # Tomar la primera coincidencia
    # Obtenemos medidas totales
    ancho_total = ventana.width
    alto_total = ventana.height
    
    # Supongamos que tu formulario está en el centro:
    # Ignoramos el 20% superior (barra de herramientas)
    # Ignoramos el 10% lateral (menús)
    
    diseno_regiones = {
            "numero": {"left": int(ventana.left + 410), "top": int(ventana.top + 125), "width": 300, "height": 60},
            "chat": {"left": int(ventana.left + 610), "top": int(ventana.top + 200), "width": 760, "height": 525}#110
        }
    with mss.mss() as sct:
        try:
            # 1. Capturamos los datos crudos (raw)
            screenshot = sct.grab(diseno_regiones["chat"])
            
            # 2. CONVERSIÓN CRÍTICA: 
            # El color rosa/rojo ocurre por el canal Alpha y el orden BGR.
            # Convertimos de BGRA (formato Windows/GPU) a RGB (formato estándar)
            #img = Image.frombytes("RGB", screenshot.size, screenshot.bgra, "raw", "BGRX")

            # Conversión DIRECTA a NumPy array (Formato OpenCV BGR)
            # Esto es muchísimo más rápido que usar Image.frombytes o guardar PNG
            img_array = np.array(screenshot)
            
            # mss devuelve BGRA (4 canales). PaddleOCR prefiere BGR (3 canales).
            img_bgr = cv2.cvtColor(img_array, cv2.COLOR_BGRA2BGR)
            lista_imagenes_bgr.append(img_bgr)
            # 3. Guardar usando Pillow (mucho más robusto que mss.tools)
            nombre_archivo = f"./ocr-system/temp/scsh_{int(time.time())}.png"
            img = Image.fromarray(img_bgr)
            img.save(nombre_archivo, "PNG")
            
            print(f"✓ Captura corregida guardada en lista, total: {len(lista_imagenes_bgr)}")
            #ocrStep() # Descomenta cuando verifiques que la imagen sale bien
            
        except Exception as e:
            print(f"✗ Error en captura: {e}")