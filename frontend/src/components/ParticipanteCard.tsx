import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Participante } from '../models/Participante';
import { ParticipantesContext } from '../context/ParticipantesContext';
import { useAuth } from '../context/AuthProvider';

interface ParticipanteCardProps {
  participante: Participante;
}

const ParticipanteCard: React.FC<ParticipanteCardProps> = ({ participante }) => {
  const navigate = useNavigate();
  const ctx = useContext(ParticipantesContext);
  if (!ctx) throw new Error('ParticipanteCard debe estar dentro de ParticipantesProvider');
  const { eliminarParticipante, editarParticipante } = ctx;
  const { user } = useAuth();

  const getColorNivel = (nivel: string) => {
    switch (nivel) {
      case 'Principiante':
        return 'bg-green-50 border-green-300';
      case 'Intermedio':
        return 'bg-yellow-50 border-yellow-300';
      case 'Avanzado':
        return 'bg-red-50 border-red-300';
      default:
        return 'bg-white';
    }
  };

  const getColorTextoNivel = (nivel: string) => {
    switch (nivel) {
      case 'Principiante':
        return 'text-green-700';
      case 'Intermedio':
        return 'text-yellow-700';
      case 'Avanzado':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div
      className={`shadow-lg rounded-lg p-5 hover:shadow-2xl transition-all border-l-4 ${getColorNivel(
        participante.nivel
      )} transform hover:-translate-y-1`}
    >
      <h3 className="font-bold text-xl mb-1 text-gray-800">{participante.nombre}</h3>
      <p className="text-gray-600 text-sm mb-3">📧 {participante.email}</p>
      <div className="space-y-2">
        <p className="text-gray-700 flex items-center gap-2">
          <span className="font-semibold">🌎</span> {participante.pais}
        </p>
        <p className="text-gray-700 flex items-center gap-2">
          <span className="font-semibold">📍</span> {participante.modalidad}
        </p>
        <p className={`font-bold flex items-center gap-2 ${getColorTextoNivel(participante.nivel)}`}>
          <span>🎯</span> {participante.nivel}
        </p>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="font-semibold text-gray-700 mb-2">💻 Tecnologías:</p>
          <div className="flex flex-wrap gap-1">
            {participante.tecnologias.map((tech) => (
              <span
                key={`${participante.id}-${tech}`}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {user?.rol === 'ADMIN' ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              editarParticipante(participante);
              navigate(`/editar/${participante.id}`);
            }}
            className="w-full bg-amber-500 text-white px-3 py-2 rounded-lg hover:bg-amber-600 transition-all font-semibold shadow hover:shadow-lg"
          >
            Editar
          </button>
          <button
            onClick={() => eliminarParticipante(participante.id)}
            className="w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all font-semibold shadow hover:shadow-lg"
          >
            Eliminar
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ParticipanteCard;
