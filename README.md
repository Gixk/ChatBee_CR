# ChatBee 🐝

**ChatBee** es un asistente conversacional especializado en abejas de Costa Rica. Utiliza tecnologías avanzadas de inteligencia artificial y procesamiento de lenguaje natural (NLP) 
para responder preguntas relacionadas con estos insectos voladores. 
Este proyecto está diseñado para manejar consultas en lenguaje natural y generar respuestas precisas basadas en información confiable.

## Descripción

**ChatBee** es una solución interactiva para usuarios interesados en el tema. A través de un chatbot accesible, el sistema puede procesar preguntas sobre la biología de las abejas, su comportamiento, y su importancia ecológica, entre otros temas, utilizando fuentes oficiales y técnicas avanzadas de inteligencia artificial.

El sistema está compuesto por:
- **Frontend**: Aplicación React para la interfaz de usuario.
- **Backend**: API RESTful desarrollada con **FastAPI**.
- **Generación de Respuestas**: Utiliza **Gemini Flash 2.5** para generar respuestas contextualizadas.
- **Base de Datos Vectorial**: **Chroma DB** para almacenar y recuperar embeddings.
- **Procesamiento de Datos**: Pipeline para la carga y preparación de documentos en formato PDF.

## Tecnologías utilizadas

- **React**: Para la construcción de la interfaz de usuario del chatbot.
- **Next.js**: Framework de React para el desarrollo del frontend.
- **Python**: Backend desarrollado con **FastAPI**.
- **FastAPI**: Framework rápido para APIs en Python.
- **Gemini 2.5 Flash**: Modelo de lenguaje para generar respuestas contextualizadas.
- **Chroma DB**: Base de datos vectorial para almacenar y recuperar información.
- **LangChain**: Para la orquestación de los componentes de procesamiento de lenguaje.
- **ReactMarkdown**: Para renderizar las respuestas del chatbot con buen formato.
- **PyPDFLoader**: Para procesar documentos en PDF.
- **Uvicorn**: Servidor ASGI para ejecutar **FastAPI**.
- **Dotenv**: Gestión de variables de entorno.

## Instalación

### Requisitos previos

- **Node.js** y **npm** (para el frontend)
- **Python 3.x** (para el backend)
- **Git** (para gestionar el repositorio)

### Pasos para instalar

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Gixk/ChatBee_CR.git
   cd ChatBee_CR

2. **Instalar dependencias del frontend**:
    ```bash
   cd frontend-chat
   npm install
   
4. **Instalar dependencias del backend**:
    ```bash
   cd ../backend
   pip install -r requirements.txt
   
6. **Configurar variables de entorno en .env**:
    ```bash
     GEMINI_API_KEY=<clave_de_api_de_Gemini>
     
8. **Ejecutar backend y frontend**:
    ```bash
   cd ../backend
   uvicorn app.main:app
   
   cd ../frontend-chat
   npm run dev


## Uso
- Iniciar tanto el servidor frontend como backend siguiendo las instrucciones anteriores.
- Acceder a la aplicación en el navegador en http://localhost:3000.
- Hacer uso del chat.

## Licencia
no c
