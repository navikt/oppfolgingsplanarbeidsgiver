// TODO: koden i denne filen kommer i en senere versjon av NavSpa
//  -- koden kan da slettes når @navikt/navspa til v4.x blir tilgjengelig

export function getMiljø() {
  const hostname = window.location.hostname;
  if (hostname.includes('tjenester.nav.no') || hostname.includes('oppfolgingsplanarbeidsgiver.nais.oera.no')) {
    return 'prod-sbs';
  }
  if (hostname.includes('tjenester-q1.nav.no') || hostname.includes('oppfolgingsplanarbeidsgiver.nais.oera-q.local')) {
    return 'dev-sbs';
  }
  return 'local';
}

/**
 * Extracts paths to load from a Create React App asset manifest.
 * @param manifestObject parsed json from the asset manifest
 */
function extractPathsFromCRAManifest(manifestObject) {
  const pathsToLoad = [];
  const { files, entrypoints } = manifestObject;
  if (files == null || typeof files !== 'object' || !Array.isArray(entrypoints)) {
    throw new Error(`Invalid manifest: ${JSON.stringify(manifestObject)}`);
  }

  const fileList = Object.entries(files).map(([name, path]) => ({ name, path }));

  entrypoints.forEach((entrypoint) => {
    const matchingFile = fileList.find((file) => file.path.endsWith(entrypoint));

    if (matchingFile) {
      pathsToLoad.push(matchingFile.path);
    } else {
      console.warn(`Fant ikke fil i asset-manifest for entrypoint ${entrypoint}`);
    }
  });

  return pathsToLoad;
}

export function makeAbsolute(baseUrl, maybeAbsolutePath) {
  if (maybeAbsolutePath.startsWith('http')) {
    return maybeAbsolutePath;
  }
  if (baseUrl.startsWith('http')) {
    const url = new URL(baseUrl);
    return `${url.origin}${maybeAbsolutePath}`;
  }
  return `${window.location.origin}${maybeAbsolutePath}`;
}

export function createAssetManifestParser(mikrofrontendConfig) {
  return (manifestObject) => {
    const pathsToLoad = extractPathsFromCRAManifest(manifestObject);
    const debugPaths = pathsToLoad.map((path) => makeAbsolute(mikrofrontendConfig.appBaseUrl, path));
    return debugPaths;
  };
}
