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
import { getPlayerByGroupAndTeam } from "@storage/player/getPlayerByGroupAndTeam"
import { removePlayerByGroup } from "@storage/player/removePlayerByGroup"
import { CustomError } from "@utils/CustomError"
import { useEffect, useRef, useState } from "react"
import { Alert, FlatList, TextInput } from "react-native"
import * as S from "./styles"

interface RouteParams {
  group: string;
}

export default function Players() {
  const [team, setTeam] = useState('Time A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const { params } = useRoute()
  const newPlayerNameInputRef = useRef<TextInput>(null)

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
      setNewPlayerName('')
      newPlayerNameInputRef.current?.blur(); // tira o foco do input
      fetchPlayersByTeam()

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

  async function handleRemovePlayer(playerName: string) {
    try {
      const group = (params as RouteParams)?.group;
      await removePlayerByGroup(playerName, group);
      fetchPlayersByTeam()

    } catch (error: any) {
      console.log(error)
      Alert.alert("Remover pessoa", `Não foi possível remover a pessoa selecionada`);
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
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done" // serve para o botão de V do teclado do android dar um submit na função acima, sem que o user precise ir no ícone de +
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
            onRemove={() => handleRemovePlayer(item?.name)}
            name={item?.name}
          />
        )}
      />

      <Button type="SECONDARY" title="Remover Turma" />
    </S.Container>
  )
}