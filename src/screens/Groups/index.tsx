import Button from "@components/Button";
import GroupCard from "@components/GroupCard";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import ListEmpty from "@components/ListEmpty";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAllGroups } from "@storage/group/getAllGroups";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import * as S from "./styles";

export default function Groups() {
  const [groups, setGroups] = useState<string[]>(['Amigos']);

  const { navigate } = useNavigation();

  const handleNewGroup = () => {
    navigate('NewGroup')
  }

  const fetchGroups = async () => {
    try {
      const groups = await getAllGroups()
      setGroups(groups);
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenGroup = (group: string) => {
    navigate("Players", { group })
  };

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []));

  console.log('groups', groups)

  return (
    <S.Container>
      <Header />
      <Highlight title="Turmas" subtitle="jogue com a sua turma" />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={groups?.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => <ListEmpty message="Que tal cadastrar a primeira turma?" />}
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard onPress={() => handleOpenGroup(item)} title={item} />
        )}
      />

      <Button title={"Criar nova turma"} onPress={handleNewGroup} />
    </S.Container>
  )
}


