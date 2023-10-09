import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { CustomError } from "@utils/CustomError";
import { getAllGroups } from "./getAllGroups";

export async function createGroup(newGroup: string) {
  try {
    const storedGroups = await getAllGroups();

    const groupAlreadyExists = storedGroups?.includes(newGroup);

    if (groupAlreadyExists) {
      throw new CustomError(`Já existe um grupo cadastrado com esse nome`);
    }

    const groupsToStore = JSON.stringify([...storedGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, groupsToStore)
  } catch (error) {
    throw error;
  }
}