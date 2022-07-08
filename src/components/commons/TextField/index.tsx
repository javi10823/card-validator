import React, { FC } from 'react';
import { View } from 'react-native';
import { CustomTextInput } from './styles';
import { CustomTextInputProps } from './types';

const TextField: FC<CustomTextInputProps> = (props) => (
  <View>
    <CustomTextInput {...props} />
  </View>
);

export default TextField;
