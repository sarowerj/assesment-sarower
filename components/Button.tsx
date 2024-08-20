import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
  title: string;
  color?: string;
  textColor?: string;
};

// Define the Button component
export function Button({
  onPress,
  title,
  color = "#0000",
  textColor = "rgba(0,0,0,.5)",
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

// Define styles for the Button component
const styles = StyleSheet.create({
  button: {
    paddingVertical: 2,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.5)",
  },
  buttonText: {
    fontSize: 14,
  },
});
