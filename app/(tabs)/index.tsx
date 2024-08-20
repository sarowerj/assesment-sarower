import { StyleSheet, Modal } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "expo-router";
import { Container } from "@/components/Container";
import { CategoryBox } from "@/components/CategoryBox";
import { BookmarkType, BookmarkTypeGroup } from "../../types/Bookmark";
import { Button } from "@/components/Button";
import { ModalBody } from "@/components/ModalBody";
import { AddBookMark } from "@/components/forms/AddBookmark";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [bookmarkModal, setBookmarkModal] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkTypeGroup[]>();

  const data: BookmarkType[] = [
    {
      id: 1,
      title: "Javascript",
      url: "https://www.javascript.com/",
      category: "A",
    },
    {
      id: 2,
      title: "HTML",
      url: "https://html.com/",
      category: "A",
    },
  ];

  const data2: BookmarkTypeGroup[] = [
    {
      category: "A",
      items: data,
    },
  ];

  useEffect(() => {
    async function getAllBookmarks() {
      await AsyncStorage.setItem("bookmarks", JSON.stringify(data2));
      const allKeys = await AsyncStorage.getItem("bookmarks");
      if (allKeys) {
        setBookmarks(JSON.parse(allKeys));
      }
    }

    getAllBookmarks();
  }, []);

  const updateBookmarks = () => {
    setBookmarkModal(false);
    async function getAllBookmarks() {
      // await AsyncStorage.setItem('bookmarks', JSON.stringify(data2))
      const allKeys = await AsyncStorage.getItem("bookmarks");
      if (allKeys) {
        setBookmarks(JSON.parse(allKeys));
      }
    }

    getAllBookmarks();
  };

  //shrc@selisegroup.com
  return (
    <Container>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Bookmark Manager</ThemedText>
        <Button title="Add Bookmark" onPress={() => setBookmarkModal(true)} />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {bookmarks ? (
          <CategoryBox data={bookmarks}></CategoryBox>
        ) : (
          <ThemedText>There is no bookmarks</ThemedText>
        )}
      </ThemedView>
      <Modal transparent={true} visible={bookmarkModal}>
        <ModalBody>
          <AddBookMark
            handleSave={() => updateBookmarks()}
            handleCancel={() => setBookmarkModal(false)}
          />
        </ModalBody>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
