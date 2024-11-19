"use client"

import React, { useState } from "react";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import { useGPTContext } from "@/contexts/gptContext";



// Configuração do worker do PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js`;

export function UserFormCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    resumeContent: "",
    jobDescription: "",
  });
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

      // Leitura do arquivo PDF com PDF.js
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

      fileReader.readAsArrayBuffer(file); // Ler o arquivo como ArrayBuffer
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resumeContent) {
      alert("Por favor, faça upload de um arquivo antes de enviar.");
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
    }
    finally {
      if (resultJson) {
        setGptResponse(resultJson.result);
      }
    }
  };

  return (
    <>
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

              <div className="input-container ">
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  placeholder=" "
                  className="styled-textarea h-64 w-32"
                  rows={6}
                  required
                ></textarea>
                <span className="input-label">Descrição da Vaga</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className={cn(buttonVariants({ size: "default", variant: "default" }))}>
              Enviar
            </Button>
          </CardFooter>
        </form>
      </Card>
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