import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
import { useTheme } from "next-themes";
import { loadSlim } from "@tsparticles/slim";

const Particle = () => {
  const [init, setInit] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const { theme } = useTheme();
  console.log("theme: ", theme);

  useEffect(() => {
    setMounted(true); 
  }, []);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {},
      fpsLimit: 60,
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
          value: mounted && theme === "dark" ? "#ffffff" : "#f98137",
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: MoveDirection.none,
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
          value: mounted && theme === "dark" ? 1 : 2,
          random: {
            enable: true,
            minimumValue: mounted && theme === "dark" ? 0.2 : 0.5,
            maximumValue: mounted && theme === "dark" ? 1 : 2,
          },
        },
        links: {
          enable: false,
        },
      },
      detectRetina: true,
    }),
    [mounted, theme]
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={options}
        className="absolute inset-0 z-0"
      />
    );
  }

  return <></>;
};

export default Particle;
