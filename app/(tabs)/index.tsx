import React, {useState} from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, TextInput } from 'react-native';
import { useContext } from 'react';
import { NotesContext } from '../_layout';
import { useRouter } from 'expo-router';
import NoteItem from '@/components/NoteItem';

export default function Home() {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { notes, setNotes, darkMode, setDarkMode } = useContext(NotesContext);

  const deleteNote = (id: string) => {
    const filtered = notes.filter((n: any) => n.id !== id);
    setNotes(filtered);
  };

  
  const filteredNotes = notes.filter((n: any) => {
    const matchesSearch = n.text.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || n.category === categoryFilter;
  
    return matchesSearch && matchesCategory;
  });

  const sortedNotes = [...filteredNotes].sort((a: any, b: any) => {
    return b.isFavorite - a.isFavorite;
  });

  const toggleFavorite = (id: string) => {
    const updated = notes.map((n: any) =>
      n.id === id ? { ...n, isFavorite: !n.isFavorite } : n
    );
    setNotes(updated);
  };

  const clearAll = () => {
    setNotes([]);
  };

  return (
    <View style={styles.container}>
      <View style={{
        flex: 1,
        padding: 20,
        backgroundColor: darkMode ? '#121212' : 'white'
        }}>
          <Pressable onPress={() => setDarkMode(!darkMode)}>
            <Text>{darkMode ? 'Light Mode' : 'Dark Mode'}</Text>
          </Pressable>
        </View>
      <TextInput
        placeholder="Search notes..."
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />
      <TextInput
        placeholder="Filter Category (All, Work, Study...)"
        value={categoryFilter}
        onChangeText={setCategoryFilter}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />
      {filteredNotes.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 50 }}>
            No notes found 📝
          </Text>
        ) : (
          <FlatList
            data={sortedNotes}
            renderItem={({ item }: any) => (
              <NoteItem
                note={item}
                onDelete={() => deleteNote(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            )}
            keyExtractor={(item: any) => item.id}
          />
        )}

      <Pressable
        style={styles.button}
        onPress={() => router.push('/add')}
      >
        <Text style={styles.text}>Add Note</Text>
      </Pressable>

      <Text style={{ marginBottom: 10 }}>
        Total Notes: {notes.length}
      </Text>
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