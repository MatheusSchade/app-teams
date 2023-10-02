import logoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";
import * as S from "./styles";

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  const { navigate } = useNavigation();

  function handleGoBack() {
    navigate('Groups')
  }

  return (
    <S.Container>
      {showBackButton && <S.BackButton onPress={handleGoBack}>
        <S.BackIcon color="#FFF" size={32} />
      </S.BackButton>}

      <S.Logo source={logoImg} />
    </S.Container>
  )
}