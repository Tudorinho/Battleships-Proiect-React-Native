import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("");

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setUsername(user);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUser();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        username ? (
          <>
            <Button
              title="User Details"
              onPress={() => navigation.navigate("UserDetails")}
            />
            <Button title="Logout" onPress={handleLogout} />
          </>
        ) : (
          <>
            <Button
              title="Login"
              onPress={() => navigation.navigate("Login")}
            />
            <Button
              title="Register"
              onPress={() => navigation.navigate("Register")}
            />
          </>
        ),
    });
  }, [navigation, username]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    setUsername("");
  };

  return (
    <View style={styles.container}>
      {username ? (
        <Text>Welcome, {username}!</Text>
      ) : (
        <Text>Please log in or register.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
