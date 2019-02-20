export const skalHenteOPTilgang = (state, action) => {
    const erSykmeldteHentet = state.sykmeldte.hentet && !state.sykmeldte.hentingFeilet;
    const sykmeldt = action.sykmeldt || {};
    const reducer = state.tilgang[sykmeldt.fnr] || {};

    return (erSykmeldteHentet && sykmeldt.fnr && !reducer.henter && !reducer.hentingForsokt) || false;
};
