import '@testing-library/jest-dom';
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import  Inputfelt, { texts } from '../../js/skjema/Inputfelt';
  

const inputRole = 'input';
const submitRole = 'submit';
const alertRole = 'alert';

test('Skal vise riktig feilmeldinger ved validering', () => {
  const onSubmit = jest.fn();
  const avbryt = jest.fn();

  const emptyString = '';
  const invalidString = '?? Invalid string';
  var tooLongString = '';
  for (var i = 0; i < 101; i++) {
    tooLongString += 'C';
  }

  render(<Inputfelt
    oppdateringFeilet={false}
    spinner={false}
    onSubmit={onSubmit}
    avbryt={avbryt}
  />);

  const textareaInput = screen.getByRole(inputRole);
  const submitButton = screen.getByRole(submitRole);
  
  fireEvent.change(textareaInput, { target: { value: emptyString}});
  fireEvent.click(submitButton);
  const errorTextEmptyInput = screen.getByText(texts.errors.emptyInput);
  expect(errorTextEmptyInput).toBeInTheDocument();

  fireEvent.change(textareaInput, { target: { value: invalidString}});
  fireEvent.click(submitButton);
  const errorTextInvalidChar = screen.getByText(texts.errors.invalidCharacters);
  expect(errorTextInvalidChar).toBeInTheDocument();

  fireEvent.change(textareaInput, { target: { value: tooLongString}});
  fireEvent.click(submitButton);
  const errorTextTooLong = screen.getByText(texts.errors.maxLengthExceeded);
  expect(errorTextTooLong).toBeInTheDocument();
});

test('Skal IKKE vise feilmelding dersom input er gyldig', () => {
  const onSubmit = jest.fn();
  const avbryt = jest.fn();

  const validString = 'Valid string';

  render(<Inputfelt
    oppdateringFeilet={false}
    spinner={false}
    onSubmit={onSubmit}
    avbryt={avbryt}
  />);

  const textareaInput = screen.getByRole(inputRole);
  const submitButton = screen.getByRole(submitRole);

  fireEvent.change(textareaInput, { target: { value: validString}});
  fireEvent.click(submitButton);
  const errorPanel = screen.getByRole(alertRole);
  expect(errorPanel).not.toHaveTextContent();
});

test('Skal vise alertboks dersom lagring av ny arbeidsoppgave feiler', () => {
  const onSubmit = jest.fn();
  const avbryt = jest.fn();

  const alertRole = 'alert';

  render(<Inputfelt
    oppdateringFeilet={true}
    spinner={false}
    onSubmit={onSubmit}
    avbryt={avbryt}
  />);

  expect(screen.getByText(texts.errors.update)).toBeInTheDocument();
});
