/**
 * Performance utilities for detecting low-end devices and optimizing UX
 */

export interface PerformanceMetrics {
  isLowEnd: boolean;
  isMobile: boolean;
  hardwareConcurrency: number;
  deviceMemory: number;
  prefersReducedMotion: boolean;
}

/**
 * Detect if the current device is low-end based on hardware capabilities
 */
export function detectLowEndDevice(): PerformanceMetrics {
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  const deviceMemory = (navigator as any).deviceMemory || 4;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Consider device low-end if it has limited hardware
  const isLowEnd = hardwareConcurrency <= 2 || deviceMemory <= 2 || isMobile;

  return {
    isLowEnd,
    isMobile,
    hardwareConcurrency,
    deviceMemory,
    prefersReducedMotion,
  };
}

/**
 * Check if we should skip animations based on device performance
 */
export function shouldSkipAnimations(): boolean {
  const metrics = detectLowEndDevice();
  return metrics.isLowEnd || metrics.prefersReducedMotion;
}

/**
 * Get optimized animation settings based on device performance
 */
export function getAnimationSettings() {
  const metrics = detectLowEndDevice();

  if (metrics.isLowEnd || metrics.prefersReducedMotion) {
    return {
      enabled: false,
      scrollTrigger: false,
      parallax: false,
      complexAnimations: false,
    };
  }

  return {
    enabled: true,
    scrollTrigger: true,
    parallax: true,
    complexAnimations: true,
  };
}
