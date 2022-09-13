import { Sykmeldt } from '@/shapes/types';
import { addSpaceAfterEverySixthCharacter } from '@/utils/tekstUtils';
import { People } from '@navikt/ds-icons';

export const getAgSideMenuHeader = (sykmeldt?: Sykmeldt) => {
  if (sykmeldt?.navn && sykmeldt?.fnr) {
    return {
      title: sykmeldt?.navn,
      subtitle: `Fødselsnr: ${addSpaceAfterEverySixthCharacter(sykmeldt?.fnr)}`,
      Icon: People,
    };
  }

  return false;
};

export const getSykmeldtNameAndFnr = (sykmeldt?: Sykmeldt) => {
  return {
    navn: sykmeldt?.navn ?? '',
    fnr: sykmeldt?.fnr ?? '',
  };
};
