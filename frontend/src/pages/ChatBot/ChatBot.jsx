import { useState } from "react";
import { useSelector } from "react-redux";
import { useGptActions } from "../../hooks/useGptActions";
import "./Module.scss";

export const ChatBot = () => {
  const { chatGptResponse } = useGptActions();
  const { responseGpt, status } = useSelector((state) => state.gpt);
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (content.trim()) {
      await chatGptResponse(content); 
      setContent(""); 
    }
  };

  return (
    <div className="container-ia">
      <div className="content-ia">
        <h1>¿En qué puedo ayudarte?</h1>
        <div className="input-container">
          <input
            type="text"
            className="form-input-ai"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe tu consulta aquí..."
          />
          <button onClick={handleSubmit} className="send-button">
            Enviar
          </button>
        </div>
        {status === "loading" && <p>Cargando...</p>} 
        {responseGpt && <p className="response-text">{responseGpt}</p>} 
      </div>
    </div>
  );
};
