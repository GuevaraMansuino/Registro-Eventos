import type { Participante } from '../models/Participante';
import type { ParticipantesState } from '../context/ParticipantesContext';

export type Action =
  | { type: 'GET_PARTICIPANTES'; payload: Participante[] }
  | { type: 'AGREGAR'; payload: Participante }
  | { type: 'ELIMINAR'; payload: number }
  | { type: 'RESET'; payload: Participante[] }
  | { type: 'EDITAR'; payload: Participante | null }
  | { type: 'SET'; payload: Participante[] };

export const initialParticipantesState: ParticipantesState = {
  participantes: [],
  participanteEditando: null,
};

export function participantesReducer(
  state: ParticipantesState,
  action: Action
): ParticipantesState {
  switch (action.type) {
    case 'GET_PARTICIPANTES':
    case 'SET':
      return { ...state, participantes: action.payload };
    case 'AGREGAR':
      return {
        ...state,
        participantes: [...state.participantes, action.payload],
      };
    case 'ELIMINAR':
      return {
        ...state,
        participantes: state.participantes.filter((p) => p.id !== action.payload),
        participanteEditando:
          state.participanteEditando?.id === action.payload ? null : state.participanteEditando,
      };
    case 'RESET':
      return { ...state, participantes: action.payload, participanteEditando: null };
    case 'EDITAR':
      return { ...state, participanteEditando: action.payload };
    default:
      return state;
  }
}
