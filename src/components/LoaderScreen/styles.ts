import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.COLORS.GRAY_600};
  align-items:  center;
  justify-content: center;
`;

export const LoadIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.GRAY_200,
  size: 84
}))``;