import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const storedUsers = await AsyncStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.some((u) => u.username === username);

    if (userExists) {
      Alert.alert("Error", "Username already taken");
    } else {
      const newUser = { username, password };
      await AsyncStorage.setItem("users", JSON.stringify([...users, newUser]));
      await AsyncStorage.setItem("user", username);
      navigation.navigate("UserDetails");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Aici setăm titlul antetului la un șir gol
      headerRight: null,
      headerLeft: () => (
        <Button title="Home" onPress={() => navigation.navigate("Home")} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Register.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signUpText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#f0f0f0",
  },
  button: {
    width: "80%",
    height: 40,
    backgroundColor: "#1e90ff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signUpText: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
});
