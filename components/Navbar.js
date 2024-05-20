import React, { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem("user");
      setIsLoggedIn(!!user);
    };
    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    setIsLoggedIn(false);
    navigation.navigate("Home");
  };

  return (
    <View style={styles.navbar}>
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      {isLoggedIn ? (
        <>
          <Button
            title="User Details"
            onPress={() => navigation.navigate("UserDetails")}
          />
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : (
        <>
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
