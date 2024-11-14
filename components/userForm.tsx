"use client";
import React, { useState } from "react";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import EmailIcon from '@mui/icons-material/Email';

export function UserFormCard() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null as File | null,
    jobDescription: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        resume: e.target.files ? e.target.files[0] : null,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Aqui você pode fazer o upload do arquivo e enviar os dados do formulário
  };

  return (
    <Card className="w-full max-w-6xl border-primary border-2 shadow-lg">
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
                <EmailIcon />
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

            <div className="relative pt-10 pb-10"> {/* Adiciona um margin-bottom maior para espaçamento */}
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
                <p className="file-name mt-2 text-sm text-gray-400">{formData.resume.name}</p>
              )}
            </div>
            
            <div className="input-container">
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
  );
}

export function UserFormSection() {
  return (
    <section
      id="user-form"
      className="relative z-1 container min-h-screen flex flex-col justify-center space-y-6 py-8 md:py-12 lg:py-24"
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
  );
}
