import * as React from 'react';
import { View } from 'react-native';
import { CardTypes } from '../../../types/cardTypes';
import TextField from '../../commons/TextField';
import { CardFieldProps } from './types';

export const CardField = ({ value, onChange, onBlur, error }: CardFieldProps) => {
  const handleChange = (value: string) => {
    const cardType = (() => {
      if (value.length <= 0) return null;
      if (value[0] === '4') return CardTypes.Visa;
      if (value[0] === '5') return CardTypes.MasterCard;
      if (value[0] === '6') return CardTypes.Discover;
      if (value.startsWith('34') || value.startsWith('37')) return CardTypes.AmericanExpress;
      if (value.startsWith('30') || value.startsWith('36') || value.startsWith('38'))
        return CardTypes.DinersClub;
      return null;
    })();

    const cardLength =
      cardType === null
        ? 16
        : cardType === CardTypes.AmericanExpress
        ? 15
        : cardType === CardTypes.DinersClub
        ? 14
        : 16;

    onChange(value, cardType, cardLength);
  };

  return (
    <View>
      <TextField
        placeholder="Card number"
        autoComplete="cc-number"
        keyboardType="numeric"
        onBlur={onBlur}
        value={value}
        onChangeText={handleChange}
        error={error}
        testID="card-input"
      />
    </View>
  );
};
