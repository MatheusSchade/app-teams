import ButtonIcon from "@components/ButtonIcon"
import Filter from "@components/Filter"
import Header from "@components/Header"
import Highlight from "@components/Highlight"
import Input from "@components/Input"
import { useState } from "react"
import { FlatList } from "react-native"
import * as S from "./styles"

export default function Players() {
  const [team, setTeam] = useState('');
  const [players, setPlayers] = useState(['Time A', 'Time B', 'Time C']);

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
          data={players}
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


    </S.Container>
  )
}