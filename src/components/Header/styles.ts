import { CaretLeft } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import styled from "styled-components/native";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
width: 46px;
height: 55px;
`;

export const BackButton = styled(TouchableOpacity).attrs(props => ({
  activeOpacity: 0.75
}))`
flex: 1;
`;

export const BackIcon = styled(CaretLeft).attrs(props => ({
  color: props.theme.COLORS.WHITE,
  size: 32
}))``;
