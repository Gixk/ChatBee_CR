from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

load_dotenv()


def obtener_cadena():
    # & objeto para convertir texto en vectores numéricos
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001", google_api_key=os.getenv("GEMINI_API_KEY")
    )

    # & Carga la bd vectorial de vectorstore
    vectores = Chroma(persist_directory="vectorstore", embedding_function=embeddings)

    # & Buscador que busca similitudes
    retriever = vectores.as_retriever()

    prompt = PromptTemplate(
        variables_input=["context", "question"],
        template="""
            Eres un asistente conversacional especializado en abejas de Costa Rica. 
            Tu tarea es ayudar a los usuarios respondiendo preguntas sobre las abejas en Costa Rica, incluyendo especies locales, comportamientos y cualquier aspecto relacionado con su biología y ecología.

            Si el usuario hace una pregunta que esté relacionada con las abejas en general (por ejemplo, sobre sus hábitos, sus tipos o su biología), puedes responder de forma flexible y basada en conocimientos generales sobre abejas. Sin embargo, siempre que sea posible, intenta proporcionar una conexión o ejemplo específico de las abejas en Costa Rica.

            **Recuerda**: Si el usuario pregunta sobre algo completamente fuera del contexto de las abejas o no relacionado con Costa Rica, responde de manera educada que tu especialización se limita a abejas en Costa Rica, pero estás disponible para ayudar con temas relacionados.
            usa emojis de abejitas cuando lo veas necesario 🐝
            Contexto: {context}            
            Pregunta: {question}
        """,
    )

    # Configurar modelo Gemini
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        google_api_key=os.getenv("GEMINI_API_KEY"),
        temperature=0.3,
    )

    #! modelo que responde
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt},
    )
    return qa_chain
