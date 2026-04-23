import React, { useState, useContext } from 'react';
import { Participante } from '../models/Participante';
import { ParticipantesContext } from '../context/ParticipantesContext';

const Formulario: React.FC = () => {
  const ctx = useContext(ParticipantesContext);
  if (!ctx) throw new Error('Formulario debe estar dentro de ParticipantesProvider');
  const { agregar } = ctx;

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [pais, setPais] = useState('');
  const [modalidad, setModalidad] = useState('Presencial');
  const [tecnologias, setTecnologias] = useState<string[]>([]);
  const [nivel, setNivel] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  // Manejar cambio en checkboxes de tecnologías
  const handleTecnologiaChange = (tech: string) => {
    if (tecnologias.includes(tech)) {
      setTecnologias(tecnologias.filter((t) => t !== tech));
    } else {
      setTecnologias([...tecnologias, tech]);
    }
  };

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault();

    if (!aceptaTerminos) {
      alert('Debe aceptar los términos y condiciones');
      return;
    }

    const nuevoParticipante = new Participante(
      nombre,
      email,
      Number(edad),
      pais,
      modalidad,
      tecnologias,
      nivel,
      aceptaTerminos
    );

    agregar(nuevoParticipante);

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

  return (
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

          {/* Campo País */}
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

          {/* Campo Modalidad */}
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

          {/* Campo Tecnologías */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Tecnologías
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['React', 'Angular', 'Vue', 'Node', 'Python', 'Java'].map((tech) => (
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

          {/* Campo Nivel */}
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

          {/* Campo Acepta términos */}
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

        {/* Botón de envío */}
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
  );
};

export default Formulario;
