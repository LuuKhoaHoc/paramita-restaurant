import { useMediaQuery } from "@prismane/core/hooks"

export function useResponsive() {
  const isMobile = useMediaQuery('(max-width: 26.5625rem)')
  const isTablet = useMediaQuery('(min-width: 26.625rem) and (max-width: 64rem)')
  const isLaptop = useMediaQuery('(min-width: 64.0625rem) and (max-width: 90rem)')

  return { isMobile, isTablet, isLaptop }
}