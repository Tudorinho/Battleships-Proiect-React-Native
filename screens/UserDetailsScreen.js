import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserDetailsScreen({ navigation }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      setUsername(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Logout" onPress={handleLogout} />,
      headerLeft: () => (
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      ),
    });
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text>User Details:</Text>
      <Text>Username: {username}</Text>
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
