import React from 'react';
import { ButtonContainer, ButtonText } from './styles';
import { ButtonProps } from './types';

export const Button = ({ text, onPress, testID }: ButtonProps) => (
  <ButtonContainer onPress={onPress} testID={testID}>
    <ButtonText>{text}</ButtonText>
  </ButtonContainer>
);
