import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Participante } from '../models/Participante';

interface ContextType {
  participantes: Participante[];
  agregar: (p: Participante) => void;
  eliminar: (id: number) => void;
  resetear: () => void;
}

export const ParticipantesContext = createContext<ContextType | undefined>(undefined);

export const ParticipantesProvider = ({ children }: { children: ReactNode }) => {
  const [participantes, setParticipantes] = useState<Participante[]>([]);

  const fetchParticipantes = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/participantes');
      if (response.ok) {
        const data = await response.json();
        setParticipantes(data);
      }
    } catch (error) {
      console.error('Error al obtener participantes', error);
    }
  };

  useEffect(() => {
    fetchParticipantes();
  }, []);

  const agregar = async (nuevoParticipante: Participante) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/participantes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoParticipante),
      });

      if (response.ok) {
        const guardado = await response.json();
        setParticipantes((prev) => [...prev, guardado]);
      }
    } catch (error) {
      console.error('Error al agregar participante', error);
    }
  };

  const eliminar = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/participantes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setParticipantes((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar participante', error);
    }
  };

  const resetear = async () => {
    // Si bien no hay un endpoint de eliminar todos, resetearemos de a uno 
    // o simplemente limpiaríamos la base de datos si existiera un DELETE /. 
    // Por simplicidad en este TP, lo removeremos del estado global por ahora:
    try {
      for (const p of participantes) {
        await fetch(`http://127.0.0.1:8000/participantes/${p.id}`, { method: 'DELETE' });
      }
      setParticipantes([]);
    } catch (error) {
      console.error('Error al resetear', error);
    }
  };

  return (
    <ParticipantesContext.Provider value={{ participantes, agregar, eliminar, resetear }}>
      {children}
    </ParticipantesContext.Provider>
  );
};
