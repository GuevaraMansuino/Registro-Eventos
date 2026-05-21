import { createContext } from 'react';
import type { Participante, ParticipantePayload } from '../models/Participante';

export interface ParticipantesState {
  participantes: Participante[];
  participanteEditando: Participante | null;
}

export interface ParticipantesContextType extends ParticipantesState {
  cargarParticipantes: () => Promise<void>;
  guardarParticipante: (payload: ParticipantePayload) => Promise<void>;
  eliminarParticipante: (id: number) => Promise<void>;
  resetearParticipantes: () => Promise<void>;
  editarParticipante: (participante: Participante) => void;
  cancelarEdicion: () => void;
}

export const ParticipantesContext = createContext<ParticipantesContextType | undefined>(undefined);
