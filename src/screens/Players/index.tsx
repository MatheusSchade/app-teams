import Button from "@components/Button"
import ButtonIcon from "@components/ButtonIcon"
import Filter from "@components/Filter"
import Header from "@components/Header"
import Highlight from "@components/Highlight"
import Input from "@components/Input"
import ListEmpty from "@components/ListEmpty"
import PlayerCard from "@components/PlayerCard"
import { useRoute } from "@react-navigation/native"
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO"
import { addPlayerByGroup } from "@storage/player/addPlayerByGroup"
import { getAllPlayersByGroup } from "@storage/player/getAllPlayersByGroup"
import { getPlayerByGroupAndTeam } from "@storage/player/getPlayerByGroupAndTeam"
import { CustomError } from "@utils/CustomError"
import { useEffect, useState } from "react"
import { Alert, FlatList } from "react-native"
import * as S from "./styles"

interface RouteParams {
  group: string;
}

export default function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const { params } = useRoute()

  async function handleAddPlayer() {
    if (newPlayerName?.trim().length === 0) {
      return Alert.alert("Nova pessoa", 'Insira o nome de uma nova pessoa para poder adicionar ao time');
    }

    if (!team) {
      return Alert.alert("Nova pessoa", 'Selecione o time a qual a nova pessoa irá pertencer');
    }

    const group = (params as RouteParams)?.group;
    const newPlayer: PlayerStorageDTO = { name: newPlayerName, team };

    try {
      await addPlayerByGroup(newPlayer, group);
      fetchPlayersByTeam()
      const players = await getAllPlayersByGroup(group);

    } catch (error: any) {
      if (error instanceof CustomError) {
        return Alert.alert("Nova pessoa", error?.message)
      } else {
        console.log(error)
        Alert.alert("Nova pessoa", `Erro ao tentar cadastrar nova pessoa`)
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const group = (params as RouteParams)?.group;
      const playersByTeam = await getPlayerByGroupAndTeam(group, team);

      setPlayers(playersByTeam)

    } catch (error: any) {
      console.log(error)
      Alert.alert("Buscar", `Erro ao buscar as pessoas do time selecionado`);
    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight
        title={(params as RouteParams)?.group}
        subtitle="adicione a galera e separe os times"
      />

      <S.Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onChangeText={setNewPlayerName}
        />

        <ButtonIcon onPress={handleAddPlayer} type="PRIMARY" icon="add" />
      </S.Form>

      <S.HeaderList>
        <FlatList
          keyExtractor={item => item}
          data={['Time A', 'Time B', 'Time C']}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
              activeOpacity={0.85}
            />
          )}
          horizontal
        />

        <S.NumberOfPlayers>{players?.length}</S.NumberOfPlayers>
      </S.HeaderList>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players?.length === 0 && { flex: 1 }
        ]}
        ListEmptyComponent={() => <ListEmpty message="Nao há pessoas nesse time" />}
        data={players}
        keyExtractor={item => item?.name}
        renderItem={({ item }) => (
          <PlayerCard
            onRemove={() => { }}
            name={item?.name}
          />
        )}
      />

      <Button type="SECONDARY" title="Remover Turma" />
    </S.Container>
  )
}