import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { detectLowEndDevice } from "@/lib/performance";

gsap.registerPlugin(ScrollTrigger);

type LenisInstance = InstanceType<typeof Lenis>;
type WindowWithLenis = { lenis?: LenisInstance };

export const useLenis = () => {
  useEffect(() => {
    const metrics = detectLowEndDevice();

    if (metrics.isLowEnd) {
      // Don't initialize Lenis on low-end devices
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    (window as unknown as WindowWithLenis).lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      (window as unknown as WindowWithLenis).lenis = undefined;
      gsap.ticker.remove(updateLenis);
    };
  }, []);
};
