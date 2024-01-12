import { useMediaQuery } from "@prismane/core/hooks"

export function useResponsive() {
  const isMobile = useMediaQuery('(max-width: 48rem)')
  const isTablet = useMediaQuery('(min-width: 48.0625rem) and (max-width: 63.9375rem)')
  const isLaptop = useMediaQuery('(min-width: 64rem) and (max-width: 90rem)')

  return { isMobile, isTablet, isLaptop }
}