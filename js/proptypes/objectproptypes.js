export const keyValue = function (props, propNavn, componentNavn) {
    const obj = props[propNavn];
    if (!obj) {
        return null;
    }
    try {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i += 1) {
            if (typeof obj[keys[i]] !== 'string') {
                return new Error(`${propNavn} er ugyldig propType - inneholder ugyldig key-value-par for nøkkel '${keys[i]}' i ${componentNavn}`);
            }
        }
        return null;
    } catch (e) {
        return new Error(`${propNavn} er ugyldig propType...`, e);
    }
};
