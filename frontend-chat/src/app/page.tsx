'use client';

import { useState } from 'react';
import ChatBox from '@/components/Chat';

export default function HomePage() {
  const [mensaje, setMensaje] = useState("");

  return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <ChatBox></ChatBox>
      </main>
  );
}



/* 
  const hacerPing = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/ping`);
      setMensaje(response.data.mensaje);
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      setMensaje("Error al conectar con el backend");
    }
  };
 */