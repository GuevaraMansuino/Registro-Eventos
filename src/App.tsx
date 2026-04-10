import { useState, useEffect } from 'react';
import { Participante } from './models/Participante';
import Formulario from './components/Formulario';
import Filtros from './components/Filtros';
import ParticipanteCard from './components/ParticipanteCard';

function App() {
  // Estados para filtros
  const [buscarNombre, setBuscarNombre] = useState('');
  const [filtroModalidad, setFiltroModalidad] = useState('Todas');
  const [filtroNivel, setFiltroNivel] = useState('Todos');

  // Estado para participantes
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [cargado, setCargado] = useState(false);

  // Cargar desde LocalStorage al iniciar
  useEffect(() => {
    const participantesGuardados = localStorage.getItem('participantes');
    if (participantesGuardados) {
      setParticipantes(JSON.parse(participantesGuardados));
    }
    setCargado(true);
  }, []);

  // Guardar en LocalStorage cuando cambian los participantes (excepto en la carga inicial)
  useEffect(() => {
    if (cargado) {
      localStorage.setItem('participantes', JSON.stringify(participantes));
    }
  }, [participantes, cargado]);

  // Agregar nuevo participante
  const handleAgregarParticipante = (nuevoParticipante: Participante) => {
    setParticipantes([...participantes, nuevoParticipante]);
  };

  // Eliminar participante
  const handleEliminar = (id: number) => {
    setParticipantes(participantes.filter((p) => p.id !== id));
  };

  // Limpiar filtros
  const handleLimpiarFiltros = () => {
    setBuscarNombre('');
    setFiltroModalidad('Todas');
    setFiltroNivel('Todos');
  };

  // Resetear datos
  const handleResetearDatos = () => {
    localStorage.removeItem('participantes');
    setParticipantes([]);
  };

  // Filtrar participantes combinados (AND lógico)
  const participantesFiltrados = participantes.filter((p) => {
    const cumpleNombre = p.nombre.toLowerCase().includes(buscarNombre.toLowerCase());
    const cumpleModalidad = filtroModalidad === 'Todas' || p.modalidad === filtroModalidad;
    const cumpleNivel = filtroNivel === 'Todos' || p.nivel === filtroNivel;
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
            onClick={handleResetearDatos}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-all font-semibold border border-red-300 shadow-sm"
          >
            ⚠️ Resetear datos
          </button>
        </div>

        {/* Contador de participantes dinámico */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-800 bg-white inline-block px-6 py-2 rounded-full shadow-md">
            Mostrando <span className="text-blue-600">{participantesFiltrados.length}</span> de <span className="text-purple-600">{participantes.length}</span> participantes
          </p>
        </div>

        {/* SECCIÓN 1: FORMULARIO DE INSCRIPCIÓN */}
        <Formulario onAgregar={handleAgregarParticipante} />

        {/* SECCIÓN 2: FILTROS DE BÚSQUEDA */}
        <Filtros
          buscarNombre={buscarNombre}
          setBuscarNombre={setBuscarNombre}
          filtroModalidad={filtroModalidad}
          setFiltroModalidad={setFiltroModalidad}
          filtroNivel={filtroNivel}
          setFiltroNivel={setFiltroNivel}
          onLimpiarFiltros={handleLimpiarFiltros}
        />

        {/* SECCIÓN 3: LISTA DE PARTICIPANTES */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <span className="text-blue-500">👥</span> Lista de participantes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participantesFiltrados.map((participante) => (
              <ParticipanteCard
                key={participante.id}
                participante={participante}
                onEliminar={handleEliminar}
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