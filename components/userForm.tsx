"use client"

import React, { useState } from "react";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import { useGPTContext } from "@/contexts/gptContext";
import { DNA } from "react-loader-spinner";

const vagas = [
  {
    nome: "Programa de Estágio Vivo",
    descrição: "Ser estudante de ensino superior, com matrícula ativa em cursos de bacharelado ou tecnólogo; Ter disponibilidade para estagiar 6 horas por dia (30h semanais); Estar liberado pela sua instituição de ensino para realizar estágio remunerado. Possuir previsão de formatura entre jul/2026 e jul/2027, garantindo que possa estagiar por pelo menos 01 ano;"
  },
  {
    nome: "Programa de Estágio Icatu Seguros",
    descrição: "Estudantes a partir do 2º período e que estejam, no mínimo, a um ano e meio da formatura (previsão para 2026.2). Dos cursos de: Tecnologia (todos), Engenharia de Produção, Ciências Atuariais, Ciências Econômicas, Ciências Contábeis, Administração, Estatística, Psicologia, Direito, Comunicação, Design"
  },
  {
    nome: "Programa de Estágio Santander",
    descrição: "Cursando a partir do segundo semestre da graduação; Disponibilidade de estagiar 4h ou 6h por dia"
  },
  {
    nome: "Programa de Estágio Nestlé",
    descrição: "Estar cursando ensino superior, a partir do terceiro semestre até o penúltimo semestre (faltando 1 ano para a conclusão do curso); Todos os cursos superiores bacharelado e técnicos são aceitos; Conhecimento básico do pacote office (Word, Excel, Power Point); Possuir disponibilidade para estagiar 6 horas diárias no modelo de trabalho híbrido (3 vezes por semana no escritório e 2 vezes por semana de maneira remota); Ter muita vontade de aprender e construir com a gente. Morar em SP ou região."
  },
  {
    nome: "Outros",
    descrição: ""
  }
];

// Configuração do worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`;


export function UserFormCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    resumeContent: "",
    jobDescription: "",
    selectedVaga: "Outros",
  });
  const [loading, setLoading] = useState(false); // Adicionando estado de loading
  const { setGptResponse } = useGPTContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        resume: file,
      }));

      const fileReader = new FileReader();
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let fullText = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          textContent.items.forEach(item => {
            const textItem = item as { str: string };
            fullText += textItem.str + ' ';
          });
        }
        setFormData((prevData) => ({
          ...prevData,
          resumeContent: fullText,
        }));
      };

      fileReader.readAsArrayBuffer(file);
    }
  };

  const handleVagaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedVaga = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedVaga,
      jobDescription: selectedVaga !== "Outros"
        ? vagas.find(vaga => vaga.nome === selectedVaga)?.descrição || ""
        : "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Inicia o carregamento

    if (!formData.resumeContent) {
      alert("Por favor, faça upload de um arquivo antes de enviar.");
      setLoading(false); // Finaliza o carregamento em caso de erro
      return;
    }

    let resultJson;
    try {
      const data = { name: formData.name, resume: formData.resumeContent, jobDescription: formData.jobDescription };
      const response = await fetch('/api/checkMatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      resultJson = await response.json();
      console.log('Resposta da API:', resultJson);
    } catch (error) {
      console.error('Erro ao enviar para a API:', error);
    } finally {
      setLoading(false); // Finaliza o carregamento após a resposta
      if (resultJson) {
        setGptResponse(resultJson.result);
      }
    }
  };

  return (
    <>
      {loading ? <DNA
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      /> :
        <Card className="relative z-10 w-full max-w-6xl border-primary border-2 shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    name="name"
                    type="text"
                    typeSpan="Name"
                    value={formData.name}
                    handleChange={handleChange}
                  >
                    <BadgeIcon />
                  </Input>
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    typeSpan="Email"
                    value={formData.email}
                    handleChange={handleChange}
                  >
                    <EmailIcon />
                  </Input>
                </div>

                <div className="relative pt-10 pb-10">
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    className="input-file"
                    required
                  />
                  <label htmlFor="resume" className="custom-file-upload border p-2">
                    Upload Currículo
                  </label>
                  {formData.resume && (
                    <p className="file-name mt-2 text-sm">{formData.resume.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="selectedVaga" className="block text-sm font-medium mb-3">Selecione uma vaga</label>
                  <select
                    id="selectedVaga"
                    name="selectedVaga"
                    value={formData.selectedVaga}
                    onChange={handleVagaChange}
                    className="block w-full p-2 border border-gray-300 rounded-md mb-10"
                  >
                    {vagas.map((vaga) => (
                      <option key={vaga.nome} value={vaga.nome}>{vaga.nome}</option>
                    ))}
                  </select>
                </div>

                <div className="input-container mt-4">
                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    placeholder=" "
                    className="styled-textarea h-64 w-full"
                    rows={6}
                    required
                  ></textarea>
                  <span className="input-label">Descrição da Vaga</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" className={cn(buttonVariants({ size: "default", variant: "default" }))}>
                {loading ? "Carregando..." : "Enviar"}
              </Button>
            </CardFooter>
          </form>
        </Card>}
    </>
  );
}

export function UserFormSection() {
  return (
    <>
      <section
        id="user-form"
        className="relative z-10 container min-h-screen flex flex-col justify-center space-y-6 py-20 md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold">Formulário de Compatibilidade</h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            Insira seus dados e descubra a porcentagem de compatibilidade com a vaga desejada.
          </p>
        </div>
        <div className="mx-auto lg:w-[40rem] flex justify-center">
          <UserFormCard />
        </div>
      </section>
    </>
  );
}