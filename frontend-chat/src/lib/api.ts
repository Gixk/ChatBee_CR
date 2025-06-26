export interface DocumentoFuente {
  metadata: {
    source: string;
    [key: string]: any;
  };
  page_content: string;
}


export interface RespuestaChat {
  result: string;
  source_documents: DocumentoFuente[];
}



export async function hacerPregunta(pregunta: string): Promise<RespuestaChat> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chatbee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ pregunta }),
    });

    if (!res.ok) {
      throw new Error('Error al conectarse con el backend');
    }

    const data = await res.json();
    return data as RespuestaChat;
    
  } catch (error) {
    console.error(error);
    return {
      result: 'Hubo un error al procesar la pregunta.',
      source_documents: [],
    };
  }
}
