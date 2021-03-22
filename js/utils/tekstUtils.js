export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const textBothApprovedOppfolgingsplan = (arbeidstakerName) => {
    return `Denne versjonen av planen er godkjent av ${arbeidstakerName} og deg.`;
};
