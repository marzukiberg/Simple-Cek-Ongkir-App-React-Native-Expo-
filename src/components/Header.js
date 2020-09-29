import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../utils/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <MaterialCommunityIcons name="truck" size={24} color="white" />
      <Text style={styles.headerText}>CekOngkirApp</Text>
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    // flex: 0.1,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primaryDark,
  },
  headerText: {
    color: "white",
    marginLeft: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
});
