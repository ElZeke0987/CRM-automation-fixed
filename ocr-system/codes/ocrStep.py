# Initialize PaddleOCR instance
from paddleocr import PaddleOCR
from clearText import clearText
from jsExecutor import ejecutarNLPJS
ocr = PaddleOCR(
    use_doc_orientation_classify=False,
    use_doc_unwarping=False,
    use_textline_orientation=False)

# Run OCR inference on a sample image 

#image_path = r'D:\@ARCHIVOS_USUARIO@\Desktop\CascadeProjects\CRM-automation\ocr-system\temp\scsh.png'

import pytesseract


"""
    Available attributes: ['__class__', '__class_getitem__', '__contains__', '
    __delattr__', '__delitem__', '__dict__', '__dir__', '__eq__', '__format__', '__ge__', 
    '__getattribute__', '__getitem__', '__getstate__', '__gt__', '__hash__', '__init__', 
    '__init_subclass__', '__ior__', '__iter__', '__le__', '__len__', '__lt__', '__module__', 
    '__ne__', '__new__', '__or__', '__reduce__', '__reduce_ex__', '__repr__', '__reversed__', 
    '__ror__', '__setattr__', '__setitem__', '__sizeof__', '__str__', '__subclasshook__', 
    '__weakref__', 
    '_deps_', '_get_input_fn', '_img_writer', '_json_writer', '_rand_fn', '_save_funcs', 
    '_to_img', '_to_json', '_to_str', 'clear', 'copy', 'fromkeys', 'get', 'get_minarea_rect', 
    'img', 'items', 'json', 'keys', 'pop', 'popitem', 'print', 'save_all', 'save_to_img', 
    'save_to_json', 'setdefault', 'str', 'update', 'values']
"""
# Visualize the results and save the JSON results


from pathlib import Path
import os
imagenes = []

def buscarImagenes():
    # 1. Definir la ruta de la carpeta
    ruta_carpeta = Path('./ocr-system/temp')

    # 2. Definir las extensiones de imagen que buscas
    extensiones = ['*.jpg', '*.jpeg', '*.png', '*.bmp', '*.webp']

    # 3. Crear el array (lista) de rutas

    for ext in extensiones:
        # rglob busca también en subcarpetas; usa glob para solo la carpeta actual
        imagenes.extend(list(ruta_carpeta.glob(ext)))

    # Convertir a strings si PaddleOCR lo requiere así
    imagenes_str = [str(img) for img in imagenes]

    print(f"Se encontraron {len(imagenes_str)} ")
    print("Rutas:")
    for ruta in imagenes_str:
        print(f"  {ruta}")

def ocrStep(lista_imagenes_bgr):
    
    pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
    print("OCR Step, processing image... ")
    #lista_imagenes = [os.path.join('./ocr-system/temp', f) for f in os.listdir('./ocr-system/temp') if f.endswith(('.png', '.jpg', '.jpeg'))]
    
    if not lista_imagenes_bgr:
        print("No hay imágenes para procesar")
        return
    print(f"Procesando {len(lista_imagenes_bgr)} imágenes")
    results = []
    for img in lista_imagenes_bgr:
        result = pytesseract.image_to_string(img, lang="spa")
        print(f"Result: {result}")
        results.append(result)

    #result = pytesseract.image_to_string(lista_imagenes_bgr, lang="spa")
    #image_path = r'D:\@ARCHIVOS_USUARIO@\Desktop\CascadeProjects\CRM-automation\ocr-system\temp\scsh.png'

    for res in results:
        all_texts = res
        number = all_texts
        print(f"rec-texts: {all_texts}")
        

        
        print("-" * 50)

#clearedText = clearText(all_texts)
#print(f"clearedText: {clearedText}")
#ejecutarNLPJS(clearedText)