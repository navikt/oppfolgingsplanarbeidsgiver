import { maanedListe } from '../konstanter';

export const erGyldigDatoIFortiden = (dato) => {
    const oppgittDato = new Date(dato);
    const dagensDatoStart = new Date(new Date().setHours(0, 0, 0, 0));
    return oppgittDato.getTime() < dagensDatoStart.getTime();
};

export const toDateMedMaanedNavn = (dato) => {
    const nyDato = new Date(dato);
    const dag = nyDato.getDate();
    const maaned = maanedListe[nyDato.getMonth()];
    const aar = nyDato.getFullYear();
    return `${dag}. ${maaned} ${aar}`;
};
