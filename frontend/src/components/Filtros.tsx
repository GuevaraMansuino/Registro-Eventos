import React from "react";

interface FiltrosProps {
  filtros: {
    nombre: string;
    modalidad: string;
    nivel: string;
  };
  setFiltros: React.Dispatch<
    React.SetStateAction<{
      nombre: string;
      modalidad: string;
      nivel: string;
    }>
  >;
  onLimpiarFiltros: () => void;
}

const Filtros: React.FC<FiltrosProps> = ({
  filtros,
  setFiltros,
  onLimpiarFiltros,
}) => {
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 mb-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-purple-500">🔍</span> Filtros de búsqueda
        </h2>
        <button
          onClick={onLimpiarFiltros}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all font-semibold shadow-sm text-sm"
        >
          🧹 Limpiar filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Buscar por nombre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Buscar por nombre
          </label>
          <input
            type="text"
            value={filtros.nombre}
            onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value })}
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
            value={filtros.modalidad}
            onChange={(e) =>
              setFiltros({ ...filtros, modalidad: e.target.value })
            }
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
            value={filtros.nivel}
            onChange={(e) => setFiltros({ ...filtros, nivel: e.target.value })}
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
  );
};

export default Filtros;
