import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
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
          <View style={styles.headerButtonsContainer}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate("UserDetails")}
            >
              <Text style={styles.headerButtonText}>User Details</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleLogout}
            >
              <Text style={styles.headerButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.headerButtonsContainer}>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.headerButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.headerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
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
        <>
          <Image
            source={require("../assets/images/avatar.png")}
            style={styles.avatar}
          />
          <Text style={styles.welcomeText}>Welcome, {username}!</Text>
        </>
      ) : (
        <Text style={styles.infoText}>Please log in or register.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  headerButtonsContainer: {
    flexDirection: "row",
  },
  headerButton: {
    marginHorizontal: 8,
    backgroundColor: "#1e90ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  headerButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 18,
    color: "#666",
  },
});
