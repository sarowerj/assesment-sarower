import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    children:ReactNode,
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"
    marginBottom?:number
}

export function Row({ children, justifyContent='flex-start', marginBottom=0 }: Props) {
  return (
    <View style={[styles.container, {justifyContent:justifyContent, marginBottom:marginBottom}]}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
    }
})
