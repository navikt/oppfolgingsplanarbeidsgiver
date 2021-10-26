export const skalHenteOPTilgang = (state, action) => {
  const erSykmeldtHentet = state.sykmeldt.hentet && !state.sykmeldt.hentingFeilet;
  const sykmeldt = action.sykmeldt || {};
  const reducer = state.tilgang[sykmeldt.fnr] || {};

  return (erSykmeldtHentet && sykmeldt.fnr && !reducer.henter && !reducer.hentingForsokt) || false;
};
