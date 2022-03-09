const dineSykmeldteMedSykmeldinger = [
  {
    narmestelederId: '123',
    fnr: '01010112345',
    navn: 'Kreativ Hatt',
    orgnummer: '333444555',
    sykmeldinger: [
      {
        innspillTilArbeidsgiver: 'string',
        arbeidsevne: {
          tilretteleggingArbeidsplass: 'Fortsett som sist',
        },
        arbeidsgiver: 'Pengeløs sparebank',
        bekreftelse: {
          sykmelder: 'Fornavn Etternavn',
          sykmelderTlf: 'string',
          utstedelsesdato: '2022-02-16',
        },
        friskmelding: {
          arbeidsfoerEtterPerioden: true,
          hensynPaaArbeidsplassen: 'Må ta det pent',
        },
        mulighetForArbeid: {
          aarsakAktivitetIkkeMulig434: 'andre årsaker til sykefravær',
          aktivitetIkkeMulig434: ['ANNET'],
          perioder: [
            {
              fom: new Date().toISOString().split('T')[0],
              tom: '2090-02-16',
              grad: 100,
              reisetilskudd: false,
              avventende: 'string',
            },
          ],
        },
        pasient: {
          fnr: '01010112345',
          navn: 'Kreativ Hatt',
        },
        skalViseSkravertFelt: true,
        stillingsprosent: 100,
        sykmeldingId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    ],
  },
];

module.exports = {
  dineSykmeldteMedSykmeldinger,
};
