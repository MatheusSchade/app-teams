import { RefObject } from "react";
import { TextInput, TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import * as S from "./styles";

interface InputProps extends TextInputProps {
  inputRef?: RefObject<TextInput>
}

export default function Input({ inputRef, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <S.Container
      {...rest}
      ref={inputRef}
      placeholderTextColor={theme.COLORS.GRAY_300}
    />
  )
}