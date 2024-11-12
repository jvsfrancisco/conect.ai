import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { useTheme } from "next-themes";
import { loadSlim } from "@tsparticles/slim"; // Certifique-se de ter instalado com `npm install @tsparticles/slim`

const Particle = () => {
  const [init, setInit] = useState(false);
  const { theme } = useTheme();

  // Inicializa o motor de partículas uma vez
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {},
      fpsLimit: 60, // Limita os frames por segundo para otimizar desempenho
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: theme === "dark" ? "#ffffff" : "#f98137", // Altera a cor conforme o tema
        },
        move: {
          enable: true, // Habilita o movimento
          speed: 0.3, // Define a velocidade para o mínimo possível
          direction: MoveDirection.none, // Movimento em todas as direções
            random: false,
            straight: false,
            outModes: {
            default: OutMode.out,
            },
            attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
            },
          },
          number: {
            value: 80,
            density: {
            enable: false,
            },
          },
          opacity: {
            value: 0.9,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: theme === "dark" ? 1 : 2, // Tamanho menor se for escuro
            random: { 
            enable: true, 
            minimumValue: theme === "dark" ? 0.2 : 0.5, 
            maximumValue: theme === "dark" ? 1 : 2 
            },
          },
          links: {
            enable: false, // Desativa as linhas de ligação
        },
      },
      detectRetina: true,
    }),
    [theme] // Adiciona `theme` como dependência para atualizar as cores dinamicamente
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
        className="absolute inset-0 z-0" // Posiciona as partículas atrás do conteúdo
      />
    );
  }

  return <></>;
};

export default Particle;
