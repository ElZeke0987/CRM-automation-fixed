import subprocess
import json
import os


script = f"D:\\@ARCHIVOS_USUARIO@\\Desktop\\CascadeProjects\\CRM-automation\\nlp-bot\\index.js"

def ejecutarNLPJS(input):
    resultado = subprocess.Popen(
        ['node', script],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8"
    )

    if input != "automation":
        input_json = json.dumps(input)
        resultado.stdin.write(input_json)
        resultado.stdin.flush()
        stdout, stderr = resultado.communicate()
        print("stdout: ", stdout)
        if(stderr != ""):
            print("Error: ", stderr)
        resultado.stdin.close()
        resultado.wait()
        return stdout

    resultado.stdin.write(input)
    resultado.stdin.flush()
    stdout, stderr = resultado.communicate()
    print("stdout: ", stdout)
    if(stderr != ""):
        print("Error: ", stderr)
    resultado.stdin.close()
    resultado.wait()
    return stdout
