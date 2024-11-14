import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingPageHeader
        items={[
          { title: "Início", href: "/#inicio" },
          { title: "Como funciona?", href: "/#comofuncionamos" },
        ]}
      />
      <main className="flex-1">{props.children}</main>
      <Footer
        builtBy="Conect.AI"
        builtByLink=""
        githubLink="https://github.com/jvsfrancisco"
        twitterLink="https://twitter.com/stack_auth"
        linkedinLink="linkedin.com/company/stack-auth"
      />
    </div>
  );
}
