import logoImg from "@assets/logo.png";
import * as S from "./styles";

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  return (
    <S.Container>
      {showBackButton && <S.BackButton>
        <S.BackIcon color="#FFF" size={32} />
      </S.BackButton>}

      <S.Logo source={logoImg} />
    </S.Container>
  )
}