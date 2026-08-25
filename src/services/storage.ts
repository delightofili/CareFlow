import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveData(key: string, data: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save key "${key}":`, error);
  }
}

export async function getData<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`Failed to load key "${key}":`, error);
    return null;
  }
}
