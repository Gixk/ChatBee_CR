
'use client';

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { hacerPregunta } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

const ChatBox = () => {
    const [input, setInput] = useState("");
    const [mensajes, setMensajes] = useState([
        {
            tipo: 'asistente',
            texto: 'Mediante este chat podés saber todo lo que quieras sobre las diferentes especies de abejas que existen en todo Costa Rica. Preguntá lo que quieras, como: ¿Cuántas abejas existen en Costa Rica? 🐝'
        },
    ]);
    const [loading, setLoading] = useState(false);


    /* Permite que el chat baje automáticamente */
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [mensajes]);


    /* Vacía el input */
    const enviarMensaje = async () => {
        if (input.trim() === "") return;

        const preguntaActual = input;
        setMensajes((prev) => [...prev, { tipo: "usuario", texto: preguntaActual }]);
        setInput("");
        setLoading(true);

        try {
            const { result, source_documents } = await hacerPregunta(preguntaActual);

            // Extraer fuentes únicas desde metadata
            const fuentes = [
                ...new Set(
                    source_documents.map((doc) =>
                        doc.metadata?.source?.split("/")?.pop() || "Desconocido"
                    )
                ),
            ];


            const respuestaFinal =
                result +
                (fuentes.length > 0
                    ? `\n\n________________________________________\nFuentes: ${fuentes.join(", ")}`
                    : "");
            setMensajes((prev) => [...prev, { tipo: "asistente", texto: respuestaFinal }]);

        } catch (error) {
            setMensajes((prev) => [
                ...prev,
                { tipo: "asistente", texto: "Lo siento, algo salió mal 😵" }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-100 w-full max-w-2xl h-[80vh] sm:h-[95vh] flex flex-col justify-between rounded-xl bg-opacity-90 shadow-lg border overflow-hidden border-amber-400">

            <div className="text-center font-bold text-3xl p-4 border-b">
                ChatBee 🐝
            </div>


            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

                {/* Se recorren los mensajes con map */}
                {mensajes.map((msg, i) => (
                    <div
                        key={i}
                        className={`px-6 py-3 rounded-lg max-w-[70%] shadow text-l whitespace-pre-wrap break-words ${msg.tipo === 'usuario'
                            ? 'bg-amber-200 text-black self-end'
                            : 'bg-gray-200 text-black self-start'
                            }`}
                    >
                        {/* Usar ReactMarkdown para renderizar el texto en formato Markdown */}
                        <ReactMarkdown children={msg.texto} remarkPlugins={[remarkGfm]} />
                    </div>
                ))}


                <div ref={chatEndRef} />
            </div>


            {/* Círculo de carga */}
            {loading && (
                <div className="flex justify-center items-center">
                    <div className="border-t-4 border-amber-300 border-solid w-8 h-8 rounded-full animate-spin"></div>
                </div>
            )}


            {/* INPUT Y BOTON DE ENVIO */}
            <div className="items-center p-4 flex gap-2">
                <textarea
                    placeholder="Escribe tu mensaje"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            enviarMensaje();
                        }
                    }}
                    className="flex-1 resize-none rounded-md border border-amber-500 p-2 text-l shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <Button onClick={enviarMensaje} className=" bg-amber-300 text-black" >
                    Enviar
                </Button>
            </div>

        </div>
    );
}

export default ChatBox;
