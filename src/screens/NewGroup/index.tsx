import Button from "@components/Button";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import Input from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { createGroup } from "@storage/group/createGroup";
import { CustomError } from "@utils/CustomError";
import { useState } from "react";
import { Alert } from "react-native";
import * as S from "./styles";

export default function NewGroup() {
  const [group, setGroup] = useState('')

  const { navigate } = useNavigation();

  async function handleNew() {
    try {
      if (group?.trim()?.length === 0) {
        return Alert.alert("Novo grupo", `Informe um nome do grupo para cadastrar`)
      }

      await createGroup(group)
      navigate('Players', { group })
    } catch (error: any) {
      if (error instanceof CustomError) {
        return Alert.alert("Novo grupo", error?.message ?? `Erro ao tentar cadastrar novo grupo`)
      }

      console.log(error)
      Alert.alert("Novo grupo", `Erro ao tentar cadastrar novo grupo`)
    }

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

