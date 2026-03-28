import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useState, useContext } from 'react';
import { useRouter } from 'expo-router';
import { NotesContext } from '../_layout';
import { Note } from '@/types';
import React, { useRef, useEffect } from 'react';

export default function AddNote() {
  const [text, setText] = useState('');
  const { notes, setNotes } = useContext(NotesContext);
  const [selectedCategory, setSelectedCategory] = useState('General');
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addNote = () => {
    if (text.trim() === '') return;

    if (text.trim().length < 3) {
      alert("Note must be at least 3 characters");
      return;
    }


    const newNote: Note = {
      id: Date.now().toString(),
      text,
      category: selectedCategory,
      isFavorite: false,
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

      <TextInput
        ref={inputRef}
        placeholder="Category (Work, Study, Personal)"
        value={selectedCategory}
        onChangeText={setSelectedCategory}
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