export const OPPRETT_TILTAK_NY = 'OPPRETT_TILTAK_NY';
export const OPPRETT_SKJEMANAVN = 'OPPRETT_SKJEMANAVN';
export const GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN = 'GODKJENN_OPPFOLGINGSPLAN_SKJEMANAVN';
export const DATOVELGERFELT_SKJEMA = 'DATOVELGERFELT_SKJEMA';
export const tekstfeltRegex = new RegExp('.*<[^ ][^>]+[^ ]>.*');
export const tekstfeltInneholderUgyldigTegnRegex = new RegExp('^[^a-zA-Z0-9-å,Å,ø,Ø,Æ,æ]+[0-9A-Za-z:;., !$?\\-_]');
export const tekstfeltBegynnerMedUgyldigTegnRegex = new RegExp('^[^a-zA-Z0-9-å,Å,ø,Ø,Æ,æ]');
export const maanedListe = [
  'januar',
  'februar',
  'mars',
  'april',
  'mai',
  'juni',
  'juli',
  'august',
  'september',
  'oktober',
  'november',
  'desember',
];
export const MND_SIDEN_SYKMELDING_GRENSE_FOR_OPPFOELGING = 4;

export const HOST_NAMES = {
  SYFOOPREST: 'syfooprest',
};

export const NOTIFIKASJONBOKS_TYPE = {
  ADVARSEL: 'ADVARSEL',
  SUKSESS: 'SUKSESS',
};

export const KANGJENNOMFOERES = {
  KAN: 'KAN',
  KAN_IKKE: 'KAN_IKKE',
  TILRETTELEGGING: 'TILRETTELEGGING',
  IKKE_VURDERT: 'IKKE_VURDERT',
};

export const TILRETTELEGGING = {
  PAA_ANNET_STED: 'PAA_ANNET_STED',
  MED_MER_TID: 'MED_MER_TID',
  MED_HJELP: 'MED_HJELP',
};

export const SIDETYPE = {
  ARBEIDSOPPGAVER: 'ARBEIDSOPPGAVER',
  TILTAK: 'TILTAK',
  PLANER: 'PLANER',
};

export const STATUS = {
  AKTIV: 'AKTIV',
  AVBRUTT: 'AVBRUTT',
  UNDER_ARBEID: 'UNDER_ARBEID',
  UTDATERT: 'UTDATERT',
};

export const STATUS_TILTAK = {
  FORSLAG: 'FORSLAG',
  AVTALT: 'AVTALT',
  IKKE_AKTUELT: 'IKKE_AKTUELT',
};
