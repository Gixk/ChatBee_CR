# inicio de backend: uvicorn main:app --reload --port 8000
#! uvicorn app.main:app --reload --reload-exclude venv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.chat import obtener_cadena
import markdown


app = FastAPI()
modeloChat = obtener_cadena()


# Se habilita CORS para comunicar back y front
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pregunta(BaseModel):
    pregunta: str
    

@app.get("/api/ping")
def ping():
    return {"mensaje": "Backend conectado"}


@app.post("/api/chatbee")
async def chatbee(p: Pregunta):
    try:
        resultado = modeloChat.invoke({"query": p.pregunta})
        respuesta_con_formato = resultado["result"]

        respuesta_html = markdown.markdown(respuesta_con_formato)

        return {
            "result": resultado["result"],
            "source_documents": [
                {
                    "metadata": doc.metadata,
                    "page_content": doc.page_content
                } 
                for doc in resultado["source_documents"]
            ]
        }
    except Exception as e:
        return {
            "result": f"Error al procesar la pregunta: {str(e)}",
            "source_documents": []
        }