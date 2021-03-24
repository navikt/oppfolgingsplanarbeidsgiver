import chai from 'chai';
import rewire from 'rewire';
import getArbeidsoppgave from '../mock/mockArbeidsoppgave';
import { input2RSArbeidsoppgave } from '../../js/utils/arbeidsoppgaveUtils';

const expect = chai.expect;

describe('ArbeidsOppgaveUtils', () => {
  const arbeidsOppgave = getArbeidsoppgave();

  const file = rewire('../../js/utils/arbeidsoppgaveUtils');
  const isDefined = file.__get__('isDefined');

  it('Skal isDefined retunere true', () => {
    expect(isDefined('test')).to.deep.equal(true);
  });

  it('Skal isDefined retunere false', () => {
    expect(isDefined()).to.deep.equal(false);
  });

  it('Skal kontrollre input2RSArbeidsoppgave', () => {
    expect(input2RSArbeidsoppgave(arbeidsOppgave).arbeidsoppgavenavn).to.deep.equal('Arbeidsoppgave');
  });
});
