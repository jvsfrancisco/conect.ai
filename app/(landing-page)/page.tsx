
import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { PricingGrid } from "@/components/pricing";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ArticleIcon from '@mui/icons-material/Article';

export default async function IndexPage() {

  return (
    <>
      <Hero 
        title2=" Conectando Jovens ao Mercado"
        subtitle="Encontre o match ideal entre seu currículo universitário e a vaga de estágio perfeita."
        primaryCtaText="Comece Agora"
        primaryCtaLink={"/"}
      />


      <div id="comofuncionamos" />
      <FeatureGrid
        title="Como Funciona?"
        subtitle="O passo a passo para encontrar o match perfeito."
        items={[
          {
            icon: (
              <ArticleIcon/>
            ),
            title1: "Passo 1 :",
            title2: "Preencha seu Formulário",
            description:
              "Insira seus dados pessoais, detalhes do seu currículo e a vaga que deseja se inscrever.",
          },
          {
            icon: (
              <FindInPageIcon/>
            ),
            title1: "Passo 2 :",
            title2: "Análise de Compatibilidade",
            description:
              "O sistema processa suas informações e analisa seu perfil para calcular a compatibilidade com a vaga selecionada.",
          },
          {
            icon: (
              <TipsAndUpdatesIcon/>
            ),
            title1: "Passo 3 :",
            title2: "Resultado e Dicas",
            description:
               "Receba a porcentagem de compatibilidade e sugestões de como melhorar seu currículo para aumentar as chances de sucesso.",
          },
        ]}
      />

      <div id="depoimentos" />
      <PricingGrid
        title="Pricing"
        subtitle="Flexible plans for every team."
        items={[
          {
            title: "Basic",
            price: "Free",
            description: "For individuals and small projects.",
            features: [
              "Full source code",
              "100% Open-source",
              "Community support",
              "Free forever",
              "No credit card required",
            ],
            buttonText: "Get Started",
            buttonHref: "/",
          },
          {
            title: "Pro",
            price: "$0.00",
            description: "Ideal for growing teams and businesses.",
            features: [
              "Full source code",
              "100% Open-source",
              "Community support",
              "Free forever",
              "No credit card required",
            ],
            buttonText: "Upgrade to Pro",
            isPopular: true,
            buttonHref: "/",
          },
          {
            title: "Enterprise",
            price: "Still Free",
            description: "For large organizations.",
            features: [
              "Full source code",
              "100% Open-source",
              "Community support",
              "Free forever",
              "No credit card required",
            ],
            buttonText: "Contact Us",
            buttonHref: "/",
          },
        ]}
      />
    </>
  );
}
