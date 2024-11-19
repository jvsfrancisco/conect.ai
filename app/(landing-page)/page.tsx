
import { FeatureGrid } from "@/components/features";
import { Hero } from "@/components/hero";
import { UserFormSection } from '@/components/userForm';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InsightsIcon from '@mui/icons-material/Insights';

export default async function IndexPage() {

  return (
    <>
      <Hero
        title2=" Conectando Jovens ao Mercado"
        subtitle="Encontre o match ideal entre seu currículo universitário e a vaga de estágio perfeita."
        primaryCtaText="Comece Agora"
        primaryCtaLink={"/forms"}
      />

      <div id="comofuncionamos" />
      <FeatureGrid
        title="Como Funciona?"
        subtitle="O passo a passo para encontrar o match perfeito."
        items={[
          {
            icon: <PersonAddIcon />,
            title1: "Passo 1 :",
            title2: "Cadastre-se na Plataforma",
            description:
              "Crie uma conta gratuita e tenha acesso a todas as funcionalidades da plataforma.",
          },
          {
            icon: <ArticleIcon />,
            title1: "Passo 2 :",
            title2: "Preencha seu Formulário",
            description:
              "Insira seus dados pessoais, detalhes do seu currículo e a vaga que deseja se inscrever.",
          },
          {
            icon: <InsightsIcon />,
            title1: "Passo 3 :",
            title2: "Resultado e Dicas",
            description:
              "Receba a porcentagem de compatibilidade e sugestões de como melhorar seu currículo para aumentar as chances de sucesso.",
          },
        ]}
      />
    </>
  );
}
