export type ThemeProps = {
  colors: {
    lightPrimary: string
    lightSecondary: string
    darkPrimary: string
    darkTertiary: string
    darkSecondary: string
    primaryColor: string
    altColor: string
    expenseColor: string
    incomeColor: string
    altBackground: string
    errorColor: string
    background: string
  }
  fonts: string[]
  fontSizes: {
    small: string
    smallLineHeight: string
    base: string
    medium: string
    baseLineHeight: string
    display: string
    displayLineHeight: string
  }
  misc: {
    headerHeight: string
    sidebarWidth: string
    aTags: string
    aTtagsHover: string
    borderRadius: string
  }
}

export type TypographyProps = {
  color?: string
  size?: string
}
