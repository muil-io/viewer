const colors = {
  primary: '#6735E0',
  primaryDark: '#332557',
  secondary: '#f8f8f8',
  white: '#ffffff',
  dark: '#424242',
  lightDark: '#adadad',
  shadow: '#0000003d',
  light: '#e6e6e6',
};

const theme = {
  app: {
    primaryBackground: `linear-gradient(to top right, ${colors.primaryDark}, ${colors.primary})`,
    secondaryBackground: colors.secondary,
    contentBackground: colors.white,
  },
  page: {
    templateNameColor: colors.white,
    screenInactiveColor: colors.secondary,
    screenActiveColor: colors.primary,
    color: colors.primary,
  },
  sidebar: {
    logoColor: colors.white,
    color: colors.primary,
    linkColor: colors.dark,
    linkIndicator: colors.primary,
    linkBackground: 'rgba(103,53,224, 0.1)',
    shadowColors: colors.shadow,
    border: colors.light,
    loading: colors.light,
  },
  tabs: {
    border: colors.primary,
  },
  options: {
    color: colors.dark,
    border: colors.light,
  },
  emptyState: {
    color: colors.lightDark,
  },
};

export default theme;
