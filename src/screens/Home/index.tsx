import React from 'react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import { CardField } from '../../components/cards/CardField';
import { CardType } from '../../components/cards/CardTypes';
import { Button } from '../../components/commons/Button';
import TextField from '../../components/commons/TextField';
import { cardErrors, cvvErrors, expiryErrors, nameErrors } from '../../constants/errors';
import { CardTypes } from '../../types/cardTypes';
import {
  ActionsContainer,
  CardContainer,
  Container,
  ErrorText,
  InputContainer,
  Row,
  SuccessText,
} from './styles';

const HomeScreen = () => {
  const [success, setSuccess] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      card: '',
      expiryDate: '',
      cvv: '',
      firstName: '',
      lastName: '',
    },
  });

  const [cardType, setCardType] = useState<null | CardTypes>(null);
  const [cardLength, setCardLength] = useState(16);

  const handleChange = (newCardType: null | CardTypes, newCardLength: number) => {
    if (cardType !== newCardType) {
      setCardType(newCardType);
    }
    if (cardLength !== newCardLength) {
      setCardLength(newCardLength);
    }
  };

  const luhnCheck = (num: string) => {
    let arr = num
      .split('')
      .reverse()
      .map((x) => parseInt(x));
    let lastDigit = arr.splice(0, 1)[0];
    let sum = arr.reduce(
      (acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
      0
    );
    sum += lastDigit;
    return sum % 10 === 0;
  };

  const expiryCheck = (num: string) => {
    const arr = num.split('/');
    // Format
    if (!arr[0] || !arr[1]) return false;
    else if (arr[0].length !== 2 || arr[1].length !== 2) return false;
    // Month between 1 - 12
    else if (parseInt(arr[0]) > 12 || parseInt(arr[0]) < 1) return false;
    // If card expired this year
    else if (arr[1] === '22') {
      const currentMonth = new Date().getMonth() + 1;
      if (parseInt(arr[0]) < currentMonth) return false;
      // If card is expired
    } else if (parseInt(arr[1]) < 22) return false;
    return true;
  };

  const onSubmit = () => {
    setSuccess(true);
  };

  const onError = () => setSuccess(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <CardType cardType={cardType} />
        <CardContainer>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: cardLength,
              maxLength: cardLength,
              validate: luhnCheck,
            }}
            name="card"
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <CardField
                  value={value}
                  onBlur={onBlur}
                  onChange={(value, type, length) => {
                    onChange(value);
                    handleChange(type, length);
                  }}
                  error={!!errors.card}
                />
                <ErrorText>
                  {(errors.card && cardErrors[errors.card.type]) || errors.card?.type}
                </ErrorText>
              </>
            )}
          />
        </CardContainer>
        <Row>
          <Controller
            control={control}
            name="expiryDate"
            rules={{ required: true, validate: expiryCheck }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputContainer>
                <TextField
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                  testID="expiry-input"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  error={!!errors.expiryDate}
                />
                <ErrorText>
                  {(errors.expiryDate && expiryErrors[errors.expiryDate.type]) ||
                    errors.expiryDate?.type}
                </ErrorText>
              </InputContainer>
            )}
          />
          <Controller
            control={control}
            name="cvv"
            rules={{
              required: true,
              minLength: cardType === CardTypes.AmericanExpress ? 4 : 3,
              maxLength: cardType === CardTypes.AmericanExpress ? 4 : 3,
              pattern: /^[0-9]+$/i
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputContainer>
                <TextField
                  placeholder="CVV"
                  autoComplete="cc-csc"
                  keyboardType="number-pad"
                  testID="cvv-input"
                  maxLength={cardType === CardTypes.AmericanExpress ? 4 : 3}
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  error={!!errors.cvv}
                />
                <ErrorText>
                  {(errors.cvv && cvvErrors[errors.cvv.type]) || errors.cvv?.type}
                </ErrorText>
              </InputContainer>
            )}
          />
        </Row>
        <Row>
          <Controller
            control={control}
            name="firstName"
            rules={{ required: true, pattern: /^[a-z ]+$/i }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputContainer>
                <TextField
                  placeholder="First name"
                  testID="first-name-input"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  error={!!errors.firstName}
                />
                <ErrorText>
                  {(errors.firstName && nameErrors[errors.firstName.type]) ||
                    errors.firstName?.type}
                </ErrorText>
              </InputContainer>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            rules={{ required: true, pattern: /^[a-z ]+$/i }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputContainer>
                <TextField
                  placeholder="Last name"
                  testID="last-name-input"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  error={!!errors.lastName}
                />
                <ErrorText>
                  {(errors.lastName && nameErrors[errors.lastName.type]) || errors.lastName?.type}
                </ErrorText>
              </InputContainer>
            )}
          />
        </Row>
        <ActionsContainer>
          {success && <SuccessText>Card validated successfully</SuccessText>}
          <Button onPress={handleSubmit(onSubmit, onError)} text="Submit" testID="submit-button" />
        </ActionsContainer>
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;
