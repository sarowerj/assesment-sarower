import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    children:ReactNode
}

export function Container({ children }: Props) {
  return (
    <View style={styles.container}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        backgroundColor:'white',
        flex:1
    }
})
