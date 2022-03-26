export const asyncGet = async (keyName) => {
  try {
    return await AsyncStorage.getItem(keyName);
  } catch (e) {
    alert("Failed to fetch the data from storage");
  }
};

export const asyncSet = async (keyName, value) => {
  try {
    AsyncStorage.setItem(keyName, value);
  } catch (e) {
    alert("Failed to save the data from storage");
  }
};
