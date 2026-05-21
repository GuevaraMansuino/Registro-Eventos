import { useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Participante, ParticipantePayload } from '../models/Participante';
import { ParticipantesContext } from './ParticipantesContext';
import {
  initialParticipantesState,
  participantesReducer,
} from '../reducers/participantesReducer';
import { getToken } from '../utils/auth';

const API_URL = 'http://127.0.0.1:8000/participantes';

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export function ParticipantesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(participantesReducer, initialParticipantesState);

  const cargarParticipantes = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: authHeaders(),
      });
      if (!response.ok) return;
      const data: Participante[] = await response.json();
      dispatch({ type: 'GET_PARTICIPANTES', payload: data });
    } catch (error) {
      console.error('Error al obtener participantes', error);
    }
  };

  useEffect(() => {
    void cargarParticipantes();
  }, []);

  const guardarParticipante = async (payload: ParticipantePayload) => {
    try {
      const participanteEditando = state.participanteEditando;
      const url = participanteEditando ? `${API_URL}/${participanteEditando.id}` : API_URL;
      const method = participanteEditando ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) return;
      const participanteGuardado: Participante = await response.json();

      if (participanteEditando) {
        const actualizados = state.participantes.map((p) =>
          p.id === participanteGuardado.id ? participanteGuardado : p
        );
        dispatch({ type: 'SET', payload: actualizados });
        dispatch({ type: 'EDITAR', payload: null });
        return;
      }

      dispatch({ type: 'AGREGAR', payload: participanteGuardado });
    } catch (error) {
      console.error('Error al guardar participante', error);
    }
  };

  const eliminarParticipante = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      if (!response.ok) return;
      dispatch({ type: 'ELIMINAR', payload: id });
    } catch (error) {
      console.error('Error al eliminar participante', error);
    }
  };

  const resetearParticipantes = async () => {
    try {
      await Promise.all(
        state.participantes.map((p) =>
          fetch(`${API_URL}/${p.id}`, { method: 'DELETE', headers: authHeaders() }).catch(() => null)
        )
      );
      dispatch({ type: 'RESET', payload: [] });
    } catch (error) {
      console.error('Error al resetear', error);
    }
  };

  const editarParticipante = (participante: Participante) => {
    dispatch({ type: 'EDITAR', payload: participante });
  };

  const cancelarEdicion = () => {
    dispatch({ type: 'EDITAR', payload: null });
  };

  return (
    <ParticipantesContext.Provider
      value={{
        participantes: state.participantes,
        participanteEditando: state.participanteEditando,
        cargarParticipantes,
        guardarParticipante,
        eliminarParticipante,
        resetearParticipantes,
        editarParticipante,
        cancelarEdicion,
      }}
    >
      {children}
    </ParticipantesContext.Provider>
  );
}
