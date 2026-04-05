import { useState, useEffect } from 'react'

// Interfaz según estructura del PDF (página 3)
interface Participante {
  id: number;
  nombre: string;
  email: string;
  edad: number;
  pais: string;
  modalidad: string;
  tecnologias: string[];
  nivel: string;
  aceptaTerminos: boolean;
}

function App() {
  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [pais, setPais] = useState('');
  const [modalidad, setModalidad] = useState('Presencial');
  const [tecnologias, setTecnologias] = useState<string[]>([]);
  const [nivel, setNivel] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

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

  // Manejar cambio en checkboxes de tecnologías
  const handleTecnologiaChange = (tech: string) => {
    if (tecnologias.includes(tech)) {
      setTecnologias(tecnologias.filter(t => t !== tech));
    } else {
      setTecnologias([...tecnologias, tech]);
    }
  };

  // Registrar participante
  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aceptaTerminos) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    const nuevoParticipante: Participante = {
      id: Date.now(),
      nombre,
      email,
      edad: Number(edad),
      pais,
      modalidad,
      tecnologias,
      nivel,
      aceptaTerminos
    };

    setParticipantes([...participantes, nuevoParticipante]);

    // Limpiar formulario
    setNombre('');
    setEmail('');
    setEdad('');
    setPais('');
    setModalidad('Presencial');
    setTecnologias([]);
    setNivel('');
    setAceptaTerminos(false);
  };

  // Eliminar participante
  const handleEliminar = (id: number) => {
    setParticipantes(participantes.filter(p => p.id !== id));
  };

  // Filtrar participantes
  const participantesFiltrados = participantes.filter(p => {
    const cumpleNombre = p.nombre.toLowerCase().includes(buscarNombre.toLowerCase());
    const cumpleModalidad = filtroModalidad === 'Todas' || p.modalidad === filtroModalidad;
    const cumpleNivel = filtroNivel === 'Todos' || p.nivel === filtroNivel;
    return cumpleNombre && cumpleModalidad && cumpleNivel;
  });

  // Función para obtener color según nivel (Punto Extra 2 del PDF)
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Contenedor principal según página 7 del PDF */}
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Título principal según página 7 del PDF */}
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Registro de Participantes
        </h1>

        {/* Contador de participantes (Punto Extra 1 del PDF) */}
        <div className="text-center mb-6">
          <p className="text-lg font-semibold text-gray-800 bg-white inline-block px-6 py-2 rounded-full shadow-md">
            Participantes registrados: <span className="text-blue-600">{participantes.length}</span>
          </p>
        </div>

        {/* SECCIÓN 1: FORMULARIO DE INSCRIPCIÓN */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <span className="text-green-500">📝</span> Formulario de inscripción
          </h2>
          
          <form onSubmit={handleRegistrar}>
            {/* Grid del formulario según página 4 del PDF */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Campo Nombre */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>

              {/* Campo Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="ejemplo@mail.com"
                  required
                />
              </div>

              {/* Campo Edad */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Edad
                </label>
                <input
                  type="number"
                  value={edad}
                  onChange={(e) => setEdad(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="25"
                  required
                />
              </div>

              {/* Campo País - Select según página 4-5 del PDF */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  País
                </label>
                <select
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Seleccione un país</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="México">México</option>
                  <option value="España">España</option>
                </select>
              </div>

              {/* Campo Modalidad - Radio buttons según página 5 del PDF */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Modalidad
                </label>
                <div className="flex gap-4 flex-wrap">
                  <label className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-all">
                    <input
                      type="radio"
                      value="Presencial"
                      checked={modalidad === 'Presencial'}
                      onChange={(e) => setModalidad(e.target.value)}
                      className="mr-2 w-4 h-4 text-blue-600"
                    />
                    <span className="font-medium">Presencial</span>
                  </label>
                  <label className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-all">
                    <input
                      type="radio"
                      value="Virtual"
                      checked={modalidad === 'Virtual'}
                      onChange={(e) => setModalidad(e.target.value)}
                      className="mr-2 w-4 h-4 text-blue-600"
                    />
                    <span className="font-medium">Virtual</span>
                  </label>
                  <label className="flex items-center bg-gray-50 px-4 py-2 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-all">
                    <input
                      type="radio"
                      value="Híbrido"
                      checked={modalidad === 'Híbrido'}
                      onChange={(e) => setModalidad(e.target.value)}
                      className="mr-2 w-4 h-4 text-blue-600"
                    />
                    <span className="font-medium">Híbrido</span>
                  </label>
                </div>
              </div>

              {/* Campo Tecnologías - Checkboxes según página 5 del PDF */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tecnologías
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['React', 'Angular', 'Vue', 'Node', 'Python', 'Java'].map(tech => (
                    <label key={tech} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg border-2 border-gray-200 cursor-pointer hover:border-blue-400 transition-all">
                      <input
                        type="checkbox"
                        checked={tecnologias.includes(tech)}
                        onChange={() => handleTecnologiaChange(tech)}
                        className="mr-2 w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="font-medium text-sm">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Campo Nivel - Select según página 5 del PDF */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nivel
                </label>
                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  required
                >
                  <option value="">Seleccione un nivel</option>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>

              {/* Campo Acepta términos - Checkbox según página 5 del PDF */}
              <div className="md:col-span-2">
                <label className="flex items-center bg-blue-50 px-4 py-3 rounded-lg border-2 border-blue-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aceptaTerminos}
                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                    className="mr-3 w-5 h-5 text-blue-600 rounded"
                  />
                  <span className="font-medium text-gray-700">Acepto los términos y condiciones del evento</span>
                </label>
              </div>

            </div>

            {/* Botón de envío según página 6 del PDF */}
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎯 Registrar Participante
              </button>
            </div>
          </form>
        </div>

        {/* SECCIÓN 2: FILTROS DE BÚSQUEDA según página 6-7 del PDF */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <span className="text-purple-500">🔍</span> Filtros de búsqueda
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Buscar por nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar por nombre
              </label>
              <input
                type="text"
                value={buscarNombre}
                onChange={(e) => setBuscarNombre(e.target.value)}
                placeholder="Buscar..."
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filtrar por modalidad */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filtrar por modalidad
              </label>
              <select
                value={filtroModalidad}
                onChange={(e) => setFiltroModalidad(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
              >
                <option value="Todas">Todas</option>
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>

            {/* Filtrar por nivel */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filtrar por nivel
              </label>
              <select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value)}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white"
              >
                <option value="Todos">Todos</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: LISTA DE PARTICIPANTES según página 6 del PDF */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
            <span className="text-blue-500">👥</span> Lista de participantes
          </h2>
          
          {/* Grid responsive según página 6 del PDF: grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {participantesFiltrados.map(participante => (
              <div
                key={participante.id}
                className={`shadow-lg rounded-lg p-5 hover:shadow-2xl transition-all border-l-4 ${getColorNivel(participante.nivel)} transform hover:-translate-y-1`}
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
                      {participante.tecnologias.map((tech, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Botón eliminar (Punto Extra 3 del PDF) */}
                <button
                  onClick={() => handleEliminar(participante.id)}
                  className="mt-4 w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-all font-semibold shadow hover:shadow-lg"
                >
                  🗑️ Eliminar
                </button>
              </div>
            ))}
          </div>

          {participantesFiltrados.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500 text-lg">😔 No hay participantes registrados que coincidan con los filtros.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default App