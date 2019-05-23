export const erGyldigDatoIFortiden = (dato) => {
    const oppgittDato = new Date(dato);
    const dagensDatoStart = new Date(new Date().setHours(0, 0, 0, 0));
    return oppgittDato.getTime() < dagensDatoStart.getTime();
};
