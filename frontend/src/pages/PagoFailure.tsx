import { Link } from 'react-router-dom';

export default function PagoFailure() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">Pago no completado</h1>
        <p className="text-gray-600 mb-8">
          El pago no se pudo procesar o fue cancelado. Podés intentar nuevamente.
        </p>

        <Link
          to="/cursos"
          className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Intentar de nuevo
        </Link>
      </div>
    </div>
  );
}
