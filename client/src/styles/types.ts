export interface Theme {
  primaryFont: string;
  colors: {
    primary: string;
    primaryHover: string;
    primaryActive: string;
    text: string;
    lightText: string;
    componentBackground: string;
    componentHover: string;
    needs: string;
    needsBackground: string;
    wants: string;
    wantsBackground: string;
    incomes: string;
    incomesBackground: string;
    error: string;
    errorBackground: string;
    background: string;
    border: string;
    placeholder: string;
  };
  fonts: {
    header: {
      size: string;
      weight: string;
    };
    default: {
      size: string;
      weight: string;
      secondaryWeight: string;
      tertiaryWeight: string;
    };
    small: {
      size: string;
      weight: string;
    };
  };
  space: {
    s: string;
    m: string;
    l: string;
    xl: string;
    xxl: string;
    max: string;
  };
  borderRadius: {
    base: string;
    large: string;
    circle: string;
  };
  shadows: {
    default: string;
    small: string;
  };
}
