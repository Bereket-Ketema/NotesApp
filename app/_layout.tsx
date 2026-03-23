import { Stack } from 'expo-router';
import { useState } from 'react';
import { Note } from '../types';
import { createContext } from 'react';
import React from 'react';

export const NotesContext = createContext<any>(null);

export default function Layout() {
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      <Stack />
    </NotesContext.Provider>
  );
}