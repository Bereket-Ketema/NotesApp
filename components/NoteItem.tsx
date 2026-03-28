import { View, Text, Pressable, StyleSheet,  Alert} from 'react-native';
import { Note } from '../types';
import { useRouter } from 'expo-router';
import React from 'react';


type Props = {
  note: Note;
  onDelete: () => void;
  onToggleFavorite: () => void;
};

export default function NoteItem({ note, onDelete, onToggleFavorite }: Props) {
  const router = useRouter();

  const confirmDelete = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: onDelete }
      ]
    );
  };

  return (
    <View style={styles.item}>
      <Text>{note.text} ({note.category})</Text>
      <Text>
        {note.isFavorite ? '⭐ ' : ''}{note.text}
      </Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable onPress={onToggleFavorite}>
          <Text style={{ color: 'gold' }}>★</Text>
        </Pressable>

        <Pressable onPress={() => router.push(`/edit/${note.id}`)}>
          <Text style={{ color: 'blue' }}>Edit</Text>
        </Pressable>

        <Pressable onPress={confirmDelete}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {}
})