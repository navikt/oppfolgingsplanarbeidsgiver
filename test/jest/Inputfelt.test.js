import '@testing-library/jest-dom';
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import  Inputfelt, { texts } from '../../js/skjema/Inputfelt';

test('Skal vise riktig feilmeldinger ved validering', () => {
  const onSubmit = jest.fn()
  const avbryt = jest.fn()

  const validString = 'Valid string'
  const emptyString = ''
  const invalidString = '?? Invalid string'
  var tooLongString = ''
  for (var i = 0; i < 101; i++) {
    tooLongString += 'C';
  }

  const inputRole = 'input';
  const submitRole = 'submit';
  const alertRole = 'alert';

  render(<Inputfelt
    oppdateringFeilet={false}
    spinner={false}
    onSubmit={onSubmit}
    avbryt={avbryt}
  />)

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

  fireEvent.change(textareaInput, { target: { value: validString}});
  fireEvent.click(submitButton);
  const errorText = screen.getByRole(alertRole);
  expect(errorText).not.toHaveTextContent();
});
