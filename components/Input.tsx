import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

type Props = {
    placeholder:string
    value:string
    onChangeText:()=>void,
    secureTextEntry:boolean
}

export function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  ...props
}:Props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
});

export default Input;
