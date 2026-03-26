import React, {useState} from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { useContext } from 'react';
import { NotesContext } from '../_layout';
import { useRouter } from 'expo-router';
import NoteItem from '@/components/NoteItem';

export default function Home() {
  const { notes, setNotes } = useContext(NotesContext);
  const router = useRouter();

  const deleteNote = (id: string) => {
    const filtered = notes.filter((n: any) => n.id !== id);
    setNotes(filtered);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }: any) => (
          <NoteItem note={item} onDelete={() => deleteNote(item.id)} />
        )}
        keyExtractor={(item: any) => item.id}
      />

      <Pressable
        style={styles.button}
        onPress={() => router.push('/add')}
      >
        <Text style={styles.text}>Add Note</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  text: { color: 'white' },
});