import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useState, useContext } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { NotesContext } from '../_layout';

export default function EditNote() {
  const { id } = useLocalSearchParams();
  const { notes, setNotes } = useContext(NotesContext);
  const router = useRouter();

  const note = notes.find((n: any) => n.id === id);
  const [text, setText] = useState(note?.text || '');

  const updateNote = () => {
    const updated = notes.map((n: any) =>
      n.id === id ? { ...n, text } : n
    );
    setNotes(updated);
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={updateNote}>
        <Text style={styles.text}>Update</Text>
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
    backgroundColor: 'orange',
    padding: 15,
    alignItems: 'center',
  },
  text: { color: 'white' },
});