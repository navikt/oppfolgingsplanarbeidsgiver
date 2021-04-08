const sykmeldt = {
  navn: 'Postmann Pat',
  fnr: '01234567891',
  orgnummer: '81549300',
  koblingId: 123,
  harNySykmelding: true,
};

const expectedSykmeldt = {
  fnr: '01234567891',
  orgnummer: '81549300',
  koblingId: 123,
};

const mockSykmeldt = (s = {}) => {
  return Object.assign({}, sykmeldt, s);
};

export const getExpectedSykmeldt = (s = {}) => {
  return Object.assign({}, expectedSykmeldt, s);
};

export default mockSykmeldt;
