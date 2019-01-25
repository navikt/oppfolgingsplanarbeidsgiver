export const HENT_OPPFOLGINGSDIALOGER_FEILET = 'HENT_OPPFOLGINGSDIALOGER_FEILET';
export const OPPFOLGINGSDIALOGER_HENTET = 'OPPFOLGINGSDIALOGER_HENTET';
export const HENTER_OPPFOLGINGSDIALOGER = 'HENTER_OPPFOLGINGSDIALOGER';
export const HENT_OPPFOLGINGSDIALOGER_FORESPURT = 'HENT_OPPFOLGINGSDIALOGER_FORESPURT';

export const OPPRETT_OPPFOLGINGSDIALOG_FORESPURT = 'OPPRETT_OPPFOLGINGSDIALOG_FORESPURT';
export const OPPRETTER_OPPFOLGINGSDIALOG = 'OPPRETTER_OPPFOLGINGSDIALOG';
export const OPPFOLGINGSDIALOG_OPPRETTET = 'OPPFOLGINGSDIALOG_OPPRETTET';
export const OPPRETT_OPPFOLGINGSDIALOG_FEILET = 'OPPRETT_OPPFOLGINGSDIALOG_FEILET';

export const GODKJENN_DIALOG_FORESPURT = 'GODKJENN_DIALOG_FORESPURT';
export const GODKJENNER_DIALOG = 'GODKJENNER_DIALOG';
export const DIALOG_GODKJENT = 'DIALOG_GODKJENT';
export const GODKJENN_DIALOG_FEILET = 'GODKJENN_DIALOG_FEILET';

export const AVVIS_DIALOG_FORESPURT = 'AVVIS_DIALOG_FORESPURT';
export const AVVISER_DIALOG = 'AVVISER_DIALOG';
export const DIALOG_AVVIST = 'DIALOG_AVVIST';
export const AVVIS_DIALOG_FEILET = 'AVVIS_DIALOG_FEILET';

export const henterOppfolgingsdialoger = () => {
    return {
        type: HENTER_OPPFOLGINGSDIALOGER,
    };
};

export const oppfolgingsdialogerHentet = (data = []) => {
    return {
        type: OPPFOLGINGSDIALOGER_HENTET,
        data,
    };
};

export const hentOppfolgingsdialogerFeilet = () => {
    return {
        type: HENT_OPPFOLGINGSDIALOGER_FEILET,
    };
};

export const hentOppfolgingsdialoger = () => {
    return {
        type: HENT_OPPFOLGINGSDIALOGER_FORESPURT,
    };
};

export const oppretterOppfolgingsdialog = (fnr) => {
    return {
        type: OPPRETTER_OPPFOLGINGSDIALOG,
        fnr,
    };
};

export const oppfolgingsdialogOpprettet = (data, fnr) => {
    return {
        type: OPPFOLGINGSDIALOG_OPPRETTET,
        data,
        fnr,
    };
};
export const opprettOppfolgingsdialogFeilet = (fnr) => {
    return {
        type: OPPRETT_OPPFOLGINGSDIALOG_FEILET,
        fnr,
    };
};
export const opprettOppfolgingsdialog = (oppfolgingsdialog, fnr) => {
    return {
        type: OPPRETT_OPPFOLGINGSDIALOG_FORESPURT,
        oppfolgingsdialog,
        fnr,
    };
};

export const godkjennDialog = (id, gyldighetstidspunkt, status, fnr) => {
    return {
        type: GODKJENN_DIALOG_FORESPURT,
        id,
        gyldighetstidspunkt,
        status,
        fnr,
    };
};

export const godkjennerDialog = (fnr) => {
    return {
        type: GODKJENNER_DIALOG,
        fnr,
    };
};

export const dialogGodkjent = (id, gyldighetstidspunkt, status, fnr) => {
    return {
        type: DIALOG_GODKJENT,
        id,
        gyldighetstidspunkt,
        status,
        fnr,
    };
};

export const godkjennDialogFeilet = (fnr) => {
    return {
        type: GODKJENN_DIALOG_FEILET,
        fnr,
    };
};


export const avvisDialog = (id, fnr) => {
    return {
        type: AVVIS_DIALOG_FORESPURT,
        id,
        fnr,
    };
};

export const avviserDialog = (fnr) => {
    return {
        type: AVVISER_DIALOG,
        fnr,
    };
};

export const dialogAvvist = (id, fnr) => {
    return {
        type: DIALOG_AVVIST,
        id,
        fnr,
    };
};

export const avvisDialogFeilet = (fnr) => {
    return {
        type: AVVIS_DIALOG_FEILET,
        fnr,
    };
};
