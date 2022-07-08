import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import HomeScreen from '../../src/screens/Home';
import { cardErrors, cvvErrors, expiryErrors, nameErrors } from '../../src/constants/errors';
import { act } from 'react-test-renderer';

const validCards = {
  visa: '4929815815816575',
  mastercard: '5229081971450691',
  amex: '374155765743059',
  diners: '3009282651805672',
  discover: '6011379386952677',
};

it('renders correctly', () => {
  render(<HomeScreen />);
});

it('should return an error when no card', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const cardInput = getByTestId('card-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.required)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(cardInput, '9999999999999999');
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.required)).toBeNull();
});

it('should return an error on invalid card format', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const cardInput = getByTestId('card-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.changeText(cardInput, '9999999999999999');
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.validate)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(cardInput, validCards.visa);
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.validate)).toBeNull();
});

it('should accept valid cards', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const cardInput = getByTestId('card-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.changeText(cardInput, validCards.visa);
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.validate)).toBeNull();
  await act(() => {
    fireEvent.changeText(cardInput, validCards.mastercard);
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.validate)).toBeNull();
  await act(() => {
    fireEvent.changeText(cardInput, validCards.amex);
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.validate)).toBeNull();
  await act(() => {
    fireEvent.changeText(cardInput, validCards.discover);
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.validate)).toBeNull();
  await act(() => {
    fireEvent.changeText(cardInput, validCards.diners);
    fireEvent.press(submitButton);
  });
  expect(queryByText(cardErrors.validate)).toBeNull();
});

it('should return error when no date', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const expiryInput = getByTestId('expiry-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.press(submitButton);
  });
  expect(queryByText(expiryErrors.required)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(expiryInput, '12/99');
    fireEvent.press(submitButton);
  });
  expect(queryByText(expiryErrors.required)).toBeNull();
});

it('should return error on invalid date format', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const expiryInput = getByTestId('expiry-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.changeText(expiryInput, '1234');
    fireEvent.press(submitButton);
  });
  expect(queryByText(expiryErrors.validate)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(expiryInput, '12/99');
    fireEvent.press(submitButton);
  });
  expect(queryByText(expiryErrors.validate)).toBeNull();
});

it('should return error on expired date', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const expiryInput = getByTestId('expiry-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.changeText(expiryInput, '09/11');
    fireEvent.press(submitButton);
  });
  expect(queryByText(expiryErrors.validate)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(expiryInput, '01/22');
    fireEvent.press(submitButton);
  });
  expect(queryByText(expiryErrors.validate)).not.toBeNull();
});

it('should return error when no cvv', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const cvvInput = getByTestId('cvv-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.press(submitButton);
  });
  expect(queryByText(cvvErrors.required)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(cvvInput, '129');
    fireEvent.press(submitButton);
  });
  expect(queryByText(cvvErrors.required)).toBeNull();
});

it('should return error on invalid cvv format', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const cvvInput = getByTestId('cvv-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.changeText(cvvInput, '12');
    fireEvent.press(submitButton);
  });
  expect(queryByText(cvvErrors.minLength)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(cvvInput, '12345');
    fireEvent.press(submitButton);
  });
  expect(queryByText(cvvErrors.maxLength)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(cvvInput, 'asd');
    fireEvent.press(submitButton);
  });
  expect(queryByText(cvvErrors.pattern)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(cvvInput, '123');
    fireEvent.press(submitButton);
  });
  expect(queryByText(cvvErrors.pattern)).toBeNull();
  expect(queryByText(cvvErrors.maxLength)).toBeNull();
  expect(queryByText(cvvErrors.minLength)).toBeNull();
});

it('should return error when no first name', async () => {
  const { getByTestId, queryAllByText } = render(<HomeScreen />);
  const firstNameInput = getByTestId('first-name-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.press(submitButton);
  });
  expect(queryAllByText(nameErrors.required).length).toBe(2);
  await act(() => {
    fireEvent.changeText(firstNameInput, 'Javier');
    fireEvent.press(submitButton);
  });
  expect(queryAllByText(nameErrors.required).length).toBe(1);
})

it('should return error on invalid characters', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const firstNameInput = getByTestId('first-name-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.changeText(firstNameInput, '1234');
    fireEvent.press(submitButton);
  });
  expect(queryByText(nameErrors.pattern)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(firstNameInput, 'Javier');
    fireEvent.press(submitButton);
  });
  expect(queryByText(nameErrors.pattern)).toBeNull();
});

it('should return error when no last name', async () => {
  const { getByTestId, queryAllByText } = render(<HomeScreen />);
  const lastNameInput = getByTestId('last-name-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.press(submitButton);
  });
  expect(queryAllByText(nameErrors.required).length).toBe(2);
  await act(() => {
    fireEvent.changeText(lastNameInput, 'Olivieri');
    fireEvent.press(submitButton);
  });
  expect(queryAllByText(nameErrors.required).length).toBe(1);
})

it('should return error on invalid characters', async () => {
  const { getByTestId, queryByText } = render(<HomeScreen />);
  const lastNameInput = getByTestId('last-name-input');
  const submitButton = getByTestId('submit-button');
  await act(() => {
    fireEvent.changeText(lastNameInput, '1234');
    fireEvent.press(submitButton);
  });
  expect(queryByText(nameErrors.pattern)).not.toBeNull();
  await act(() => {
    fireEvent.changeText(lastNameInput, 'Olivieri');
    fireEvent.press(submitButton);
  });
  expect(queryByText(nameErrors.pattern)).toBeNull();
});
