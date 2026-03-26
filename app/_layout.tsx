import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { Note } from '../types';
import { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotesContext = createContext<any>(null);

export default function Layout() {
  const [notes, setNotes] = useState<Note[]>([]);

  // 🔹 Load notes on start
  useEffect(() => {
    const loadNotes = async () => {
      const data = await AsyncStorage.getItem('notes');
      if (data) setNotes(JSON.parse(data));
    };
    loadNotes();
  }, []);

  // 🔹 Save notes whenever changed
  useEffect(() => {
    AsyncStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      <Stack />
    </NotesContext.Provider>
  );
}