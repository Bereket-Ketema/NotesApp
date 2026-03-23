import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Note } from '../types';
import React from 'react';

type Props = {
  note: Note;
  onDelete: () => void;
};

export default function NoteItem({ note, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <Text>{note.text}</Text>
      <Pressable onPress={onDelete}>
        <Text style={{ color: 'red' }}>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
  },
});