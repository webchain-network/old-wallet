

Object.defineProperty(exports, '__esModule', { value: true });
const styles_1 = require('@material-ui/core/styles');
const colors_1 = require('./colors');

const spacing = 10;
const theme = {
  emeraldColors: colors_1.default,
  palette: {
    primary: colors_1.default.emerald,
    secondary: colors_1.default.ash,
    divider: colors_1.default.conch.main,
    background: {
      default: colors_1.default.snow,
    },
    action: {
      selected: colors_1.default.snow,
      hover: 'none',
    },
  },
  spacing: {
    unit: spacing,
  },
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 400,
    fontFamily: [
      '"Rubik"',
      '"Roboto"',
      'sans-serif',
    ].join(','),
  },
  overrides: {
    MuiFormControl: {
      root: {
        marginBottom: spacing * 2,
        boxSizing: 'border-box',
        borderRadius: '1px',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: colors_1.default.conch.main,
        paddingLeft: spacing,
        paddingRight: spacing,
      },
    },
    MuiFormHelperText: {
      root: {
        position: 'absolute',
        bottom: -(spacing * 2),
      },
    },
    MuiButton: {
      root: {
        color: colors_1.default.emerald.main,
        borderRadius: 0,
        minHeight: spacing * 4,
      },
      contained: {
        color: colors_1.default.white.main,
        backgroundColor: colors_1.default.emerald.main,
        boxShadow: 'none',
      },
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: spacing * 3,
        paddingRight: spacing * 3,
      },
    },
    MuiInputAdornment: {
      root: {
        maxHeight: 'none',
      },
    },
    MuiInput: {
      root: {
        height: spacing * 5,
      },
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      },
      colorDefault: {
        backgroundColor: colors_1.default.white.main,
      },
    },
    MuiList: {
      root: {
        borderTop: `1px solid ${colors_1.default.conch.main}`,
      },
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiListItem: {
      root: {
        borderBottom: `1px solid ${colors_1.default.conch.main}`,
        borderRight: 'none',
        borderLeft: 'none',
      },
    },
    MuiPaper: {
      root: {
        border: `1px solid ${colors_1.default.conch.main}`,
      },
    },
    MuiMenuItem: {
      root: {
        cursor: 'pointer',
        padding: `${spacing / 2}px ${spacing * 8}px ${spacing / 2}px ${spacing * 4}px`,
        border: 'none',
        lineHeight: `${spacing * 2}px`,
        marginLeft: spacing / 2,
        height: 'auto',
        '&$selected': {
          marginLeft: '0',
          borderLeft: `${spacing / 2}px solid ${colors_1.default.emerald.main}`,
        },
      },
    },
    MuiTypography: {
      gutterBottom: {
        marginBottom: spacing * 4,
      },
      paragraph: {
        marginBottom: spacing * 2,
      },
    },
  },
  props: {
    MuiTypography: {
      color: 'secondary',
    },
    MuiInput: {
      disableUnderline: true,
    },
    MuiFormHelperText: {
      error: true,
    },
    MuiPaper: {
      square: true,
      elevation: 0,
    },
    MuiList: {
      disablePadding: true,
    },
  },
};
const muiTheme = styles_1.createMuiTheme(theme);
exports.default = muiTheme;
