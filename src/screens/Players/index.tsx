import Button from "@components/Button"
import ButtonIcon from "@components/ButtonIcon"
import Filter from "@components/Filter"
import Header from "@components/Header"
import Highlight from "@components/Highlight"
import Input from "@components/Input"
import ListEmpty from "@components/ListEmpty"
import PlayerCard from "@components/PlayerCard"
import { useState } from "react"
import { FlatList } from "react-native"
import * as S from "./styles"

export default function Players() {
  const [team, setTeam] = useState('');
  const [players, setPlayers] = useState(['Rodrigo', 'Matheus', 'Alano', 'Leo', 'Luiz Fernando', 'Kayke', 'Souza', 'Érik']);


  return (
    <S.Container>
      <Header showBackButton />

      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />

      <S.Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />

        <ButtonIcon type="SECONDARY" icon="add" />
      </S.Form>

      <S.HeaderList>
        <FlatList
          keyExtractor={item => item}
          data={['Time A', 'Time B', 'Time C']}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam((prevState) => item === prevState ? '' : item)}
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
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <PlayerCard
            onRemove={() => { }}
            name={item}
          />
        )}
      />

      <Button type="SECONDARY" title="Remover Turma" />
    </S.Container>
  )
}