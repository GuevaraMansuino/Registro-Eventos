import { useState } from 'react';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  duracion: string;
  nivel: string;
}

const CURSOS: Curso[] = [
  {
    id: 1,
    titulo: 'Curso React',
    descripcion: 'Aprende React desde cero con hooks, context y las mejores prácticas del ecosistema.',
    precio: 25000,
    duracion: '40 horas',
    nivel: 'Intermedio',
  },
  {
    id: 2,
    titulo: 'Curso DBA',
    descripcion: 'Administración de bases de datos: MySQL, PostgreSQL, optimización y respaldos.',
    precio: 40000,
    duracion: '60 horas',
    nivel: 'Avanzado',
  },
  {
    id: 3,
    titulo: 'Curso Python',
    descripcion: 'Domina Python desde fundamentos hasta automatización y scripting avanzado.',
    precio: 20000,
    duracion: '35 horas',
    nivel: 'Inicial',
  },
  {
    id: 4,
    titulo: 'Curso TypeScript',
    descripcion: 'TypeScript para desarrolladores JavaScript: tipos, interfaces y genéricos.',
    precio: 22000,
    duracion: '30 horas',
    nivel: 'Intermedio',
  },
  {
    id: 5,
    titulo: 'Curso Docker & K8s',
    descripcion: 'Containerización con Docker y orquestación con Kubernetes en producción.',
    precio: 45000,
    duracion: '50 horas',
    nivel: 'Avanzado',
  },
  {
    id: 6,
    titulo: 'Curso Node.js',
    descripcion: 'Backend con Node.js, Express, APIs REST y arquitectura de microservicios.',
    precio: 28000,
    duracion: '45 horas',
    nivel: 'Intermedio',
  },
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function CursosPage() {
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleComprar = async (curso: Curso) => {
    setLoading(curso.id);
    setError(null);

    try {
      const response = await fetch(`${BACKEND_URL}/crear-preferencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: curso.titulo,
          unit_price: curso.precio,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear la preferencia de pago');
      }

      const data = await response.json();

      // Redirigir a Mercado Pago Checkout Pro
      window.location.href = data.init_point;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setLoading(null);
    }
  };

  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Nuestros Cursos
        </h1>
        <p className="text-gray-600 text-lg">
          Elegí el curso que mejor se adapte a tus objetivos profesionales
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURSOS.map((curso) => (
          <div
            key={curso.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden flex flex-col"
          >
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-gray-800">{curso.titulo}</h2>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                  {curso.nivel}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 flex-1">{curso.descripcion}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>⏱ {curso.duracion}</span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">
                  ${curso.precio.toLocaleString('es-AR')}
                </span>
                <button
                  onClick={() => handleComprar(curso)}
                  disabled={loading === curso.id}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:shadow-md hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading === curso.id ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Procesando...
                    </span>
                  ) : (
                    'QUIERO ESTE CURSO'
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
