"use client";

import { useEffect, useState } from "react";
import { Modal } from "./ui/modal";
import { useGPTContext } from '@/contexts/gptContext';
export function ResponseModal() {
  const { gptResponse, setGptResponse } = useGPTContext();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!!gptResponse) {
      setOpen(true);
    }
  }, [gptResponse]);

  const onClose = () => {
    setOpen(false);
    setGptResponse('')
  }

  function formatGptResponse(response: string) {
    // Remove marcadores de negrito e outras marcações
    const cleanedResponse = response.replace(/\*\*/g, '').trim();
  
    // Extrai o texto de match completo e o número do match usando regex
    const matchTextMatch = cleanedResponse.match(/Seu Match com a vaga é de: (\d+%)/);
    const match = matchTextMatch ? "Seu Match com a vaga é de: " : '';
    const matchNumber = matchTextMatch ? matchTextMatch[1] : '';
  
    // Extrai a frase "Baseado nessa vaga e nesse currículo"
    const basedOnTextMatch = cleanedResponse.match(/Baseado nessa vaga e nesse currículo, aqui vão as minhas sugestões\./);
    const basedOnText = basedOnTextMatch ? basedOnTextMatch[0] : '';
  
    // Extrai o conteúdo entre os títulos
    const compatibilityMatch = cleanedResponse.match(/O que está no currículo que é compatível com a vaga:(.*?)(Ausente no currículo e a vaga pede:|$)/s);
    const absenceMatch = cleanedResponse.match(/Ausente no currículo e a vaga pede:(.*?)(Sugestões de melhoria do currículo para se adequar à descrição da vaga:|$)/s);
    const suggestionsMatch = cleanedResponse.match(/Sugestões de melhoria do currículo para se adequar à descrição da vaga:(.*)/s);
  
    // Remove traços no final de cada seção e faz o trim
    const removeTrailingDash = (text: string) => text.trim().replace(/-$/, '').trim();
  
    // Extrai os textos das seções ou coloca um valor padrão caso estejam ausentes
    const compatibility = compatibilityMatch ? removeTrailingDash(compatibilityMatch[1]) : 'Sem informações';
    const absence = absenceMatch ? removeTrailingDash(absenceMatch[1]) : 'Sem informações';
    const suggestions = suggestionsMatch ? removeTrailingDash(suggestionsMatch[1]) : 'Sem informações';
  
    // Retorna o objeto formatado
    const formattedResponse = {
      match,
      matchNumber,
      basedOnText,
      compatibility,
      absence,
      suggestions,
    };
  
    return formattedResponse;
  }
  
  
  

  
  const formattedResponse = gptResponse ? formatGptResponse(gptResponse) : null;


  return (
    <Modal isOpen={open} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-4xl md:text-4xl font-semibold text-center py-2">Análise</h2>
        <div className="text-lg max-h-96 overflow-y-auto">
          <h3 className="text-3xl font-semibold mt-4">{formattedResponse?.match} <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F8711DFF] to-[#FF0800FF] font-bold">{formattedResponse?.matchNumber}</span></h3>
          <p className="mb-3">{formattedResponse?.basedOnText}</p>
          <h3 className="text-2xl mb-3 font-semibold mt-4">O que está no currículo que é compatível com a vaga:</h3>
          <p className="mb-3">{formattedResponse?.compatibility}</p>
          <h3 className="text-2xl mb-3 font-semibold mt-4">Ausente no currículo e a vaga pede:</h3>
          <p className="mb-3">{formattedResponse?.absence}</p>
          <h3 className="text-2xl mb-3 font-semibold mt-4">Sugestões</h3>
          <p className="mb-3">{formattedResponse?.suggestions}</p>
        </div>
      </div>
    </Modal>
  );
}

