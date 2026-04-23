import { useState, useContext } from 'react';
import { ParticipantesContext } from './context/ParticipantesContext';
import Formulario from './components/Formulario';
import Filtros from './components/Filtros';
import ParticipanteCard from './components/ParticipanteCard';

function App() {
  // Contexto
  const ctx = useContext(ParticipantesContext);
  if (!ctx) throw new Error('App debe estar dentro de ParticipantesProvider');
  
  const { participantes, participanteEditando, resetearParticipantes } = ctx;

  // Estados para filtros
  const [filtros, setFiltros] = useState({
    nombre: '',
    modalidad: 'Todas',
    nivel: 'Todos'
  });

  // Limpiar filtros
  const handleLimpiarFiltros = () => {
    setFiltros({
      nombre: '',
      modalidad: 'Todas',
      nivel: 'Todos'
    });
  };

  // Filtrar participantes combinados (AND lógico)
  const participantesFiltrados = participantes.filter((p) => {
    const cumpleNombre = p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    const cumpleModalidad = filtros.modalidad === 'Todas' || p.modalidad === filtros.modalidad;
    const cumpleNivel = filtros.nivel === 'Todos' || p.nivel === filtros.nivel;
    return cumpleNombre && cumpleModalidad && cumpleNivel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Encabezado Principal */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Registro de Participantes
          </h1>
          <button
            onClick={resetearParticipantes}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-all font-semibold border border-red-300 shadow-sm"
          >
            ⚠️ Resetear datos
          </button>
        </div>



        {/* SECCIÓN 1: FORMULARIO DE INSCRIPCIÓN */}
        <Formulario key={participanteEditando ? `edit-${participanteEditando.id}` : 'nuevo'} />

        {/* SECCIÓN 2: FILTROS DE BÚSQUEDA */}
        <Filtros
          filtros={filtros}
          setFiltros={setFiltros}
          onLimpiarFiltros={handleLimpiarFiltros}
        />

        {/* SECCIÓN 3: LISTA DE PARTICIPANTES */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-blue-500">👥</span> Lista de participantes
            </h2>
            {/* Contador de participantes dinámico */}
            <p className="text-sm font-semibold text-gray-800 bg-white inline-block px-4 py-1.5 rounded-full shadow border border-gray-200">
              Mostrando {participantesFiltrados.length} de {participantes.length} participantes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participantesFiltrados.map((participante) => (
              <ParticipanteCard
                key={participante.id}
                participante={participante}
              />
            ))}
          </div>

          {participantes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow mt-4">
              <p className="text-gray-500 text-lg">No hay participantes</p>
            </div>
          ) : participantesFiltrados.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow mt-4">
              <p className="text-gray-500 text-lg">No hay participantes que coincidan con los filtros.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
