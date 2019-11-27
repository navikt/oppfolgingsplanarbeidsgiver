export const HENT_OPPFOLGINGSPLANER_FEILET = 'HENT_OPPFOLGINGSPLANER_FEILET';
export const OPPFOLGINGSPLANER_HENTET = 'OPPFOLGINGSPLANER_HENTET';
export const HENTER_OPPFOLGINGSPLANER = 'HENTER_OPPFOLGINGSPLANER';
export const HENT_OPPFOLGINGSPLANER_FORESPURT = 'HENT_OPPFOLGINGSPLANER_FORESPURT';

export const OPPRETT_OPPFOLGINGSPLAN_FORESPURT = 'OPPRETT_OPPFOLGINGSPLAN_FORESPURT';
export const OPPRETTER_OPPFOLGINGSPLAN = 'OPPRETTER_OPPFOLGINGSPLAN';
export const OPPFOLGINGSPLAN_OPPRETTET = 'OPPFOLGINGSPLAN_OPPRETTET';
export const OPPRETT_OPPFOLGINGSPLAN_FEILET = 'OPPRETT_OPPFOLGINGSPLAN_FEILET';

export const GODKJENN_PLAN_FORESPURT = 'GODKJENN_PLAN_FORESPURT';
export const GODKJENNER_PLAN = 'GODKJENNER_PLAN';
export const PLAN_GODKJENT = 'PLAN_GODKJENT';
export const GODKJENN_PLAN_FEILET = 'GODKJENN_PLAN_FEILET';

export const AVVIS_PLAN_FORESPURT = 'AVVIS_PLAN_FORESPURT';
export const AVVISER_PLAN = 'AVVISER_PLAN';
export const PLAN_AVVIST = 'PLAN_AVVIST';
export const AVVIS_PLAN_FEILET = 'AVVIS_PLAN_FEILET';

export const henterOppfolgingsplaner = () => {
    return {
        type: HENTER_OPPFOLGINGSPLANER,
    };
};

export const oppfolgingsplanerHentet = (data = []) => {
    return {
        type: OPPFOLGINGSPLANER_HENTET,
        data,
    };
};

export const hentOppfolgingsplanerFeilet = () => {
    return {
        type: HENT_OPPFOLGINGSPLANER_FEILET,
    };
};

export const hentOppfolgingsplaner = () => {
    return {
        type: HENT_OPPFOLGINGSPLANER_FORESPURT,
    };
};

export const oppretterOppfolgingsplan = (fnr) => {
    return {
        type: OPPRETTER_OPPFOLGINGSPLAN,
        fnr,
    };
};

export const oppfolgingsplanOpprettet = (data, fnr) => {
    return {
        type: OPPFOLGINGSPLAN_OPPRETTET,
        data,
        fnr,
    };
};
export const opprettOppfolgingsplanFeilet = (fnr) => {
    return {
        type: OPPRETT_OPPFOLGINGSPLAN_FEILET,
        fnr,
    };
};
export const opprettOppfolgingsplan = (oppfolgingsplan, fnr) => {
    return {
        type: OPPRETT_OPPFOLGINGSPLAN_FORESPURT,
        oppfolgingsplan,
        fnr,
    };
};

export const godkjennPlan = (id, gyldighetstidspunkt, status, fnr, delMedNav) => {
    return {
        type: GODKJENN_PLAN_FORESPURT,
        id,
        gyldighetstidspunkt,
        status,
        fnr,
        delMedNav,
    };
};

export const godkjennerPlan = (fnr) => {
    return {
        type: GODKJENNER_PLAN,
        fnr,
    };
};

export const planGodkjent = (id, gyldighetstidspunkt, status, fnr, delMedNav) => {
    return {
        type: PLAN_GODKJENT,
        id,
        gyldighetstidspunkt,
        status,
        fnr,
        delMedNav,
    };
};

export const godkjennPlanFeilet = (fnr) => {
    return {
        type: GODKJENN_PLAN_FEILET,
        fnr,
    };
};


export const avvisPlan = (id, fnr) => {
    return {
        type: AVVIS_PLAN_FORESPURT,
        id,
        fnr,
    };
};

export const avviserPlan = (fnr) => {
    return {
        type: AVVISER_PLAN,
        fnr,
    };
};

export const planAvvist = (id, fnr) => {
    return {
        type: PLAN_AVVIST,
        id,
        fnr,
    };
};

export const avvisPlanFeilet = (fnr) => {
    return {
        type: AVVIS_PLAN_FEILET,
        fnr,
    };
};
