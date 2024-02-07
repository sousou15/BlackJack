#ESTO ES UN SCRIPT PARA RENOMBRAR LAS CARTAS DE TAL FORMA QUE TENGA LA ESTRUCTURA [NÚMERO][PRIMERA LETRA DEL PALO].png
# import os

# def cambiar_nombres_directorio(ruta_directorio):
#     # Obtener la lista de archivos en el directorio
#     archivos = os.listdir(ruta_directorio)

#     # Iterar sobre cada archivo
#     for nombre_archivo in archivos:
#         # Construir el nuevo nombre de archivo
#         nuevo_nombre = nombre_archivo.replace('_', '') \
#                         .replace('clubs', 'T') \
#                         .replace('diamonds', 'R') \
#                         .replace('spades', 'P') \
#                         .replace('hearts', 'C') \
#                         .replace('of', '') \
#                         .replace('king', 'K') \
#                         .replace('queen', 'Q') \
#                         .replace('jack', 'J') \
#                         .replace('ace', 'A')

#         # Ruta completa del archivo antiguo y nuevo
#         antigua_ruta = os.path.join(ruta_directorio, nombre_archivo)
#         nueva_ruta = os.path.join(ruta_directorio, nuevo_nombre)

#         # Renombrar el archivo
#         os.rename(antigua_ruta, nueva_ruta)
#         print(f"Renombrado: {nombre_archivo} -> {nuevo_nombre}")

# # Ruta del directorio de imágenes
# ruta_del_directorio = './cartasPNG'

# # Llama a la función para cambiar los nombres
# cambiar_nombres_directorio(ruta_del_directorio)

import os

def cambiar_nombres_directorio(ruta_directorio):
    # Obtener la lista de archivos en el directorio
    archivos = os.listdir(ruta_directorio)

    # Iterar sobre cada archivo
    for nombre_archivo in archivos:
        # Verificar si el carácter "2" está en la tercera posición
        if len(nombre_archivo) >= 3 and nombre_archivo[2] == '2':
            # Construir el nuevo nombre de archivo sin el carácter "2"
            nuevo_nombre = nombre_archivo[:2] + nombre_archivo[3:]

            # Ruta completa del archivo antiguo y nuevo
            antigua_ruta = os.path.join(ruta_directorio, nombre_archivo)
            nueva_ruta = os.path.join(ruta_directorio, nuevo_nombre)

            # Renombrar el archivo
            os.rename(antigua_ruta, nueva_ruta)
            print(f"Renombrado: {nombre_archivo} -> {nuevo_nombre}")
        else:
            print(f"No se realiza cambio para: {nombre_archivo}")

# Ruta del directorio de imágenes
ruta_del_directorio = './cartasPNG'

# Llama a la función para cambiar los nombres
cambiar_nombres_directorio(ruta_del_directorio)

