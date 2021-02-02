const colors = {
  primary: '#6735E0',
  primaryDark: '#332557',
  white: '#ffffff',
  dark: '#424242',
  gray1: '#adadad',
  gray2: '#d6d6d6',
  gray3: '#f1f1f1',
  gray4: '#f8f8f8',
  error: '#fa4251',
  success: '#46D39A',
  shadow: '#0000003d',
};

const theme = {
  colors,
  app: {
    primaryBackground: `linear-gradient(to top right, ${colors.primaryDark}, ${colors.primary})`,
    secondaryBackground: colors.gray4,
    contentBackground: colors.white,
  },
  page: {
    templateNameColor: colors.white,
    color: colors.primary,
  },
  sidebar: {
    logoColor: colors.white,
    color: colors.primary,
    linkColor: colors.dark,
    linkIndicator: colors.primary,
    linkBackground: 'rgba(103,53,224, 0.1)',
    shadowColors: colors.shadow,
    border: colors.gray3,
    loading: colors.gray2,
  },
  tabs: {
    border: colors.primary,
  },
  options: {
    color: colors.dark,
    border: colors.gray2,
  },
  emptyState: {
    color: colors.gray1,
  },
};

export default theme;
