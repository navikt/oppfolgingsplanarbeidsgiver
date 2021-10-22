// TODO: koden i denne filen kommer i en senere versjon av NavSpa
//  -- koden kan da slettes når @navikt/navspa til v4.x blir tilgjengelig

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

export function joinPaths(...paths) {
  return paths
    .map((path, idx) => {
      if (path.trim() === '' || path === '/') {
        return null;
      }

      const isFirstPath = idx === 0;
      const isLastPath = idx === paths.length - 1;

      let cleanedPath = path;

      if (cleanedPath.startsWith('/') && !isFirstPath) {
        cleanedPath = cleanedPath.substr(1);
      }

      if (cleanedPath.endsWith('/') && !isLastPath) {
        cleanedPath = cleanedPath.substr(0, path.length - 1);
      }

      return cleanedPath;
    })
    .filter((p) => p != null)
    .join('/');
}

export function makeAbsolute(baseUrl, maybeAbsolutePath) {
  const proxyUrl = `${window.location.origin}/oppfolgingsplanarbeidsgiver/api`;
  if (maybeAbsolutePath.startsWith('http')) {
    return maybeAbsolutePath;
  }
  return joinPaths(proxyUrl, maybeAbsolutePath);
}

export function createAssetManifestParser(mikrofrontendConfig) {
  return (manifestObject) => {
    const pathsToLoad = extractPathsFromCRAManifest(manifestObject);
    return pathsToLoad.map((path) => makeAbsolute(mikrofrontendConfig.appBaseUrl, path));
  };
}
