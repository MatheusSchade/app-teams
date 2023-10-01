import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { ButtonTypeStyleProps, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  type?: ButtonTypeStyleProps;
}

export default function Button({ title, type = 'PRIMARY', style, ...rest }: Props) {
  const theme = useTheme();

  return (
    // <Container type={type} {...rest}> // erro de tipagem no type gerou bug e não permite fazer o bundling corretamente. Refatorado
    // <Title>{title}</Title>
    // </Container>

    <TouchableOpacity
      style={{
        flex: 1,
        minHeight: 56,
        maxHeight: 56,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK,
        ...style as object
      }}
      {...rest}>
      <Title>{title}</Title>
    </TouchableOpacity>
  );
}

