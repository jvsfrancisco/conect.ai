import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(request: Request) {

  try {
    const body = await request.json();
    const { name, resume, jobDescription } = body;

    if (!name || !resume || !jobDescription) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Você é especialista em avaliar a compatibilidade entre um currículo e uma descrição de vaga. O seu principal trabalho é identificar se um candidato passaria na etapa de triagem de uma vaga. Dada a descrição da vaga você vai analisar as palavras-chave, competências, responsabilidades, habilidades comportamentais e comparar com o currículo.

Você vai ter a descrição da vaga e o currículo. Analise e retorne em 3 principais tópicos:
- O que está no currículo que é compatível com a vaga:
- Ausente no currículo e a vaga pede:
- Sugestões de melhoria do currículo para se adequar à descrição da vaga.

Premissas:
- Um bom currículo deve conter descrições de experiências, educação ou projetos que estejam alinhados com as expectativas do cargo detalhadas na descrição da vaga.
- Você não deve utilizar qualquer outra informação além do currículo e da descrição da vaga fornecidos, não invente nada.
- É necessário contextualizar frases e expressões para identificar com precisão as palavras-chave, mesmo que estejam inseridas em estruturas de frases mais complexas.
- Todas as análises, descobertas e sugestões devem ser fornecidas em Português (Brasil).

Sua tarefa é gerar um relatório analítico sobre a compatibilidade do currículo com a descrição da vaga, focando principalmente nos três tópicos mencionados acima.

Prefixo de Resposta: Seu Match com a vaga é de: {match}. Baseado nessa vaga e nesse currículo, aqui vão as minhas sugestões.`, // Restante do conteúdo omitido para clareza
        },
        {
          role: "user",
          content: `Nome: ${name}\nCurrículo: ${resume}\nDescrição da Vaga: ${jobDescription}\nQual é a porcentagem de match entre o candidato e a vaga?`,
        },
      ]
    });

    const matchAnalysis = response.choices[0].message?.content ?? 'Nenhuma resposta gerada.';

    return NextResponse.json({ result: matchAnalysis });
  } catch (error) {
    console.error('Erro na requisição à API do OpenAI:', error);
    return NextResponse.json({ error: 'Erro ao processar a solicitação.' }, { status: 500 });
  }
}
