import { StyleSheet, View  } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { Container } from '@/components/Container';
import { Row } from '@/components/Row';

export default function DetailsScreen() {
  const params = useLocalSearchParams()

  return (
    <Container>
      <View style={styles.wrapper}>
        <Row marginBottom={20}>
        <ThemedText>Title: </ThemedText>
        <ThemedText>{params.title}</ThemedText>
      </Row>
        <Row marginBottom={20}>
          <ThemedText>Url: </ThemedText>
          <ThemedText>{params.url}</ThemedText>
        </Row>
        <Row marginBottom={20}>
          <ThemedText>Category: </ThemedText>
          <ThemedText>{params.category}</ThemedText>
        </Row>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop:10
  },
});
