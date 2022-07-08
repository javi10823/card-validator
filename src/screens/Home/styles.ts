import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardContainer = styled.View`
  margin-vertical: 16px;
`;

export const InputContainer = styled.View`
  width: ${(Dimensions.get('window').width / 5) * 2}px;
`;

export const ErrorText = styled.Text`
  font-size: 16px;
  color: #f44;
`;

export const SuccessText = styled.Text`
  font-size: 20px;
  color: #3a4;
  text-align: center;
  margin-bottom: 16px;
`;

export const ActionsContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
