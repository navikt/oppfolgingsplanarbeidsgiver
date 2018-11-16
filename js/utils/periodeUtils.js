const parsedato = (dato) => {
    const datoSplit = dato.split('.');
    let ar = datoSplit[2];
    if (ar.length === 2) {
        ar = `20${ar}`;
    }
    return `${ar}-${datoSplit[1]}-${datoSplit[0]}`;
};

export const fraInputdatoTilJSDato = (inputDato) => {
    const d = parsedato(inputDato);
    return new Date(d);
};
