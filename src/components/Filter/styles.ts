import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export interface FilterStyleProps {
  isActive?: boolean;
}

export const Title = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.FONT_FAMILY.BOLD};
    font-size: ${theme.FONT_SIZE.SM}px;
    color: ${theme.COLORS.WHITE};
  `};
  text-transform: uppercase;
`;

export const Container = styled(TouchableOpacity)`
  border-radius: 4px;
  margin-right: 12px;
  height: 38px;
  width: 70px;
  align-items: center;
  justify-content: center;
`;

