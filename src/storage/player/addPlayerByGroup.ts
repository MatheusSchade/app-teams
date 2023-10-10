import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { CustomError } from "@utils/CustomError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { getAllPlayersByGroup } from "./getAllPlayersByGroup";

export async function addPlayerByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const storedPlayersByGroup = await getAllPlayersByGroup(group);

    const playerAlreadyExists = storedPlayersByGroup?.filter(player => player?.name === newPlayer?.name);

    if (playerAlreadyExists?.length > 0) {
      throw new CustomError(`Essa pessoa já foi adicionada em um time nesse grupo`);
    }

    const playerToStore = JSON.stringify([...storedPlayersByGroup, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, playerToStore);

  } catch (error) {
    throw error;
  }
}