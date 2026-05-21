import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Formulario from '../components/Formulario';
import { ParticipantesContext } from '../context/ParticipantesContext';

function FormularioPage() {
  const navigate = useNavigate();
  const ctx = useContext(ParticipantesContext);
  if (!ctx) throw new Error('FormularioPage debe estar dentro de ParticipantesProvider');

  const { cancelarEdicion } = ctx;

  useEffect(() => {
    cancelarEdicion();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Nuevo Participante</h1>
      <Formulario onSuccess={() => navigate('/')} />
    </div>
  );
}

export default FormularioPage;
