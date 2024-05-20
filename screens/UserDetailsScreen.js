import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
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
      headerRight: () => (
        <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
          <Text style={styles.headerButtonText}>Logout</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.headerButtonText}>Home</Text>
        </TouchableOpacity>
      ),
      title: "",
    });
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/avatar.png")}
        style={styles.avatar}
      />
      <Text style={styles.title}>User Details</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Username: {username}</Text>
        <Text style={styles.detailText}>Meciuri jucate: 0</Text>
        <Text style={styles.detailText}>Meciuri castigate: 0</Text>
        <Text style={styles.detailText}>Meciuri pierdute: 0</Text>
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
    backgroundColor: "#f8f9fa",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  detailsContainer: {
    width: "80%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  detailText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 10,
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
});
