import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import * as S from "./styles";

export default function NewGroup() {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation();

  const handleNew = () => {
    navigate('Players', { group })
  };

  return (
    <S.Container>
      <Header showBackButton />

      <S.Content>
        <S.Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          value={group}
          onChangeText={setGroup}
          placeholder="Nome da turma"
        />

        <Button
          style={{ marginTop: 20 }}
          title="Criar"
          onPress={handleNew}
        />
      </S.Content>
    </S.Container>
  )
}

