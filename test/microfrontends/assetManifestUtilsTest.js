import chai from 'chai';
import { makeAbsolute } from '../../js/microfrontends/assetManifestUtils';
import { withCurrentLocation } from '../mock/testUtils';

const expect = chai.expect;

describe('makeAbsoulte oppdaterer path til ressurser fra asset-manifest avhengig av domene', () => {
  it('returnerer samme path når begge kjører på samme domene', () => {
    withCurrentLocation('http://dummy.io/containerapp', () => {
      expect(
        makeAbsolute('/samtalestotte-podlet', '/samtalestotte-podlet/static/css/main.a617e044.chunk.css')
      ).to.equal('http://dummy.io/samtalestotte-podlet/static/css/main.a617e044.chunk.css');
    });
  });
});
