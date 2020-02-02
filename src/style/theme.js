const colors = {
  primary: '#5248f6',
  primaryDark: '#5746f7',
  secondary: '#f8f8f8',
  white: '#ffffff',
  dark: '#424242',
};

const theme = {
  app: {
    primaryBackground: `linear-gradient(to right, ${colors.primary}, ${colors.primaryDark})`,
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
    linkBackground: 'rgba(74, 168, 226, 0.1)',
  },
  options: {
    color: colors.dark,
  },
};

export default theme;
