import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components";
import { Container, FilterStyleProps, Title } from "./styles";

interface FilterProps extends FilterStyleProps, TouchableOpacityProps {
  title: string;
}

export default function Filter({ title, isActive = false, ...rest }: FilterProps) {
  const theme = useTheme();

  return (
    <Container
      style={{
        borderWidth: isActive ? 1 : 0,
        borderStyle: isActive ? 'solid' : undefined,
        borderColor: isActive ? theme.COLORS.GREEN_700 : 'none'
      }}
      {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}
