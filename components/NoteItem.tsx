import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Note } from '../types';
import { useRouter } from 'expo-router';
import React from 'react';

type Props = {
  note: Note;
  onDelete: () => void;
};

export default function NoteItem({ note, onDelete }: Props) {
  const router = useRouter();

  return (
    <View style={styles.item}>
      <Text>{note.text}</Text>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Pressable onPress={() => router.push(`/edit/${note.id}`)}>
          <Text style={{ color: 'blue' }}>Edit</Text>
        </Pressable>

        <Pressable onPress={onDelete}>
          <Text style={{ color: 'red' }}>Delete</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {}
})