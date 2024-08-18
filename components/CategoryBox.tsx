import { View, StyleSheet, FlatList, Linking } from 'react-native';
import { ThemedText } from './ThemedText';
import { BookmarkTypeGroup } from '@/types/Bookmark';
import { Row } from './Row';
import { Button } from './Button';
import { useRouter } from 'expo-router';

type Props = {
    data:BookmarkTypeGroup[]
}

export function CategoryBox({ data }: Props) {
  const router = useRouter()
  return (
    <View>
        {data&&data.map((categoryGroupItem, index:number)=>{
          return(
            <View key={index}>
              <ThemedText type="subtitle">Category {categoryGroupItem.category}</ThemedText>
              <View style={styles.container} key={index}>
                <FlatList 
                  data={categoryGroupItem.items} 
                  renderItem={
                    (item)=>{
                      return(
                        <Row marginBottom={10} justifyContent='space-between'>
                          <ThemedText onPress={()=>Linking.openURL(item.item.url)}>{item.item.title}</ThemedText>
                          <Button onPress={()=>{router.push({pathname:'/(screens)/Details',params:{category:item.item.category, id:item.item.id, title:item.item.title, url:item.item.url}})}} title='Details' />
                        </Row>
                      )
                    }}
                />
              </View>
            </View>
          )
        })}
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:20,
        borderWidth:1,
        borderColor:'rgba(0,0,0.2)',
        height:120,
        paddingTop:20,
        marginBottom:20,
        marginTop:5
    }
})
