import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import Filtros from '../components/Filtros';
import ParticipanteCard from '../components/ParticipanteCard';
import { ParticipantesContext } from '../context/ParticipantesContext';
import { useAuth } from '../context/AuthProvider';
import useKeyboardShortcut from '../hooks/useKeyboardShortcut';
import useLocalStorage from '../hooks/useLocalStorage';

function Home() {
  const ctx = useContext(ParticipantesContext);
  if (!ctx) throw new Error('Home debe estar dentro de ParticipantesProvider');

  const { user } = useAuth();
  const { participantes, resetearParticipantes } = ctx;

  // PARTE 3 — Custom Hook: useLocalStorage persiste los filtros entre sesiones
  const [filtros, setFiltros] = useLocalStorage('registro-filtros', {
    nombre: '',
    modalidad: 'Todas',
    nivel: 'Todos',
  });

  // PARTE 1 — useRef: referencia al input de búsqueda dentro de Filtros
  const filtroRef = useRef<HTMLInputElement>(null);

  // PARTE 3 — Custom Hook + PARTE 1 — useRef: Ctrl+B mueve el foco a los filtros
  useKeyboardShortcut('b', () => filtroRef.current?.focus(), { ctrl: true });

  const handleLimpiarFiltros = () => {
    setFiltros({
      nombre: '',
      modalidad: 'Todas',
      nivel: 'Todos',
    });
  };

  const participantesFiltrados = participantes.filter((p) => {
    const cumpleNombre = p.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());
    const cumpleModalidad = filtros.modalidad === 'Todas' || p.modalidad === filtros.modalidad;
    const cumpleNivel = filtros.nivel === 'Todos' || p.nivel === filtros.nivel;
    return cumpleNombre && cumpleModalidad && cumpleNivel;
  });

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Participantes</h1>
        <div className="flex flex-wrap justify-center gap-3">
          {user?.rol === 'ADMIN' ? (
            <>
              <Link
                to="/nuevo"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow"
              >
                Nuevo participante
              </Link>
              <button
                onClick={resetearParticipantes}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-all font-semibold border border-red-300 shadow-sm"
              >
                ⚠️ Resetear datos
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* Filtros recibe la ref para soportar el foco con Ctrl+B */}
      <Filtros
        filtros={filtros}
        setFiltros={setFiltros}
        onLimpiarFiltros={handleLimpiarFiltros}
        inputRef={filtroRef}
      />

      <div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-500">👥</span> Lista de participantes
          </h2>
          <p className="text-sm font-semibold text-gray-800 bg-white inline-block px-4 py-1.5 rounded-full shadow border border-gray-200">
            Mostrando {participantesFiltrados.length} de {participantes.length} participantes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {participantesFiltrados.map((participante) => (
            <ParticipanteCard key={participante.id} participante={participante} />
          ))}
        </div>

        {participantes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow mt-4">
            <p className="text-gray-500 text-lg">No hay participantes</p>
          </div>
        ) : participantesFiltrados.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow mt-4">
            <p className="text-gray-500 text-lg">
              No hay participantes que coincidan con los filtros.
            </p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Home;
