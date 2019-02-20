export const forsoektHentetSykmeldte = (sykmeldte) => {
    return sykmeldte.hentet || sykmeldte.hentingFeilet;
};

export const forsoektHentetOppfolgingsdialoger = (oppfolgingsdialoger) => {
    return oppfolgingsdialoger.hentet || oppfolgingsdialoger.hentingFeilet;
};

export const henterEllerHarHentetSykmeldinger = (sykmeldinger) => {
    return sykmeldinger.henter || sykmeldinger.hentet;
};

export const sykmeldtHarBlittSlettet = (sykmeldte, nesteSykmeldte) => {
    return sykmeldte.sletter && nesteSykmeldte.slettet;
};

export const henterEllerHarHentetToggles = (toggles) => {
    return toggles.henter || toggles.hentet || toggles.hentingFeilet;
};
