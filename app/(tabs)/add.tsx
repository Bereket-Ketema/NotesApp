import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { NotesContext } from '../_layout';
import { Note } from '@/types';
import React from 'react';

export default function AddNote() {
  const [text, setText] = useState('');
  const { notes, setNotes } = useContext(NotesContext);
  const router = useRouter();

  const addNote = () => {
    if (text.trim() === '') return;

    const newNote: Note = {
      id: Date.now().toString(),
      text,
    };

    setNotes([...notes, newNote]);
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Write your note..."
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={addNote}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
  },
  text: { color: 'white' },
});