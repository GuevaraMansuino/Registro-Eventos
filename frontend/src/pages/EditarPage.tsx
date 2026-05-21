import { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Formulario from '../components/Formulario';
import { ParticipantesContext } from '../context/ParticipantesContext';

function EditarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(ParticipantesContext);
  if (!ctx) throw new Error('EditarPage debe estar dentro de ParticipantesProvider');

  const { participantes, participanteEditando, editarParticipante, cancelarEdicion } = ctx;
  const participanteId = Number(id);

  useEffect(() => {
    const participante = participantes.find((p) => p.id === participanteId);
    if (participante) {
      editarParticipante(participante);
    } else if (participantes.length > 0) {
      cancelarEdicion();
    }
  }, [participantes, participanteId]);

  if (!participanteEditando && participantes.length > 0) {
    return (
      <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-100 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Participante no encontrado</h1>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow"
        >
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Editar Participante</h1>
      <Formulario onSuccess={() => navigate('/')} />
    </div>
  );
}

export default EditarPage;
