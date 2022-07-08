import styled from 'styled-components/native';
import { CustomTextInputProps } from './types';

export const CustomTextInput = styled.TextInput<CustomTextInputProps>`
  border-bottom-color: ${({ error }) => (error ? '#f44' : 'black')};
  border-bottom-width: 1px;
  padding: 5px;
  font-size: 20px;
  color: black;
`;
