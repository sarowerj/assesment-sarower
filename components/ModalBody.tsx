import { ReactNode } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
    children:ReactNode
}

export function ModalBody({ children }: Props) {
  return (
    <>
    <TouchableOpacity style={styles.underlay}/>
    <View style={styles.container}>
        {children}
    </View>
    </>
  );
}

const styles = StyleSheet.create({
    underlay:{
        paddingHorizontal:20,
        backgroundColor:'rgba(0,0,0,.5)',
        height:Dimensions.get('window').height,
    },
    container:{
        position:'absolute',
        left:20,
        right:20,
        top:20,
        backgroundColor:'white',
        padding:20
    }
})
