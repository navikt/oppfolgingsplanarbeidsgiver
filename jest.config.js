module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
    '^.+\\.(css|less)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(nav-frontend-typografi-style|nav-frontend-lenker-style|nav-frontend-alertstriper-style|nav-frontend-skjema-style|nav-frontend-veileder-style|nav-frontend-chevron-style|nav-frontend-ekspanderbartpanel-style|nav-frontend-etiketter-style|nav-frontend-knapper-style|nav-frontend-lenkepanel-style|nav-frontend-lenker-style|nav-frontend-lukknapp-style|nav-frontend-modal-style|nav-frontend-paneler-style|nav-frontend-spinner-style)/)',
  ],
  testEnvironment: 'jest-environment-jsdom',
};
