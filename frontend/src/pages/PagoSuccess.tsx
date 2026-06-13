import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Definimos la interfaz para la información del pago que nos enviará el backend
interface PagoInfo {
  id_pago: number;
  estado: string;
  monto_total: number;
  moneda: string;
  metodo_pago: string;
  fecha_aprobacion: string;
  items: Array<{
    title: string;
    quantity: number;
    unit_price: number;
  }>;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function PagoSuccess() {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  const [pagoInfo, setPagoInfo] = useState<PagoInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const externalReference = searchParams.get('external_reference');

  console.log("ID del curso comprado:", externalReference);

  useEffect(() => {
    if (status === 'approved' && paymentId) {
      const fetchPagoInfo = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/pago-info/${paymentId}`);
          if (!response.ok) {
            throw new Error('No se pudo cargar el detalle del pago');
          }
          const data = await response.json();
          setPagoInfo(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
          setLoading(false);
        }
      };

      fetchPagoInfo();
    } else {
      setLoading(false);
      if (!paymentId) setError("No se detectó ningún pago en la URL.");
    }
  }, [paymentId, status]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] py-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-10 max-w-lg w-full text-center">
        
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-3">¡Pago exitoso!</h1>
        <p className="text-gray-600 mb-6">
          Tu pago fue procesado correctamente. ¡Gracias por tu compra!
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-100 text-left">
          <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4">
            Resumen de tu compra
          </h2>
          
          {loading ? (
             <div className="flex justify-center items-center py-4 text-gray-500">
               <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
               </svg>
               Cargando detalles...
             </div>
          ) : error ? (
             <div className="text-sm text-red-600 py-2">
               {error}
             </div>
          ) : pagoInfo && pagoInfo.items.length > 0 ? (
            <div className="space-y-4">
              {pagoInfo.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">
                    {item.title} <span className="text-gray-400 text-sm">(x{item.quantity})</span>
                  </span>
                  <span className="text-gray-800 font-semibold">
                    ${item.unit_price.toLocaleString('es-AR')}
                  </span>
                </div>
              ))}
              
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                <span className="text-gray-500 text-sm">Método de pago:</span>
                <span className="text-gray-700 text-sm capitalize">{pagoInfo.metodo_pago}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Nº de Operación:</span>
                <span className="text-gray-700 text-sm">{pagoInfo.id_pago}</span>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-gray-800 font-bold">Total pagado:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${pagoInfo.monto_total.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 py-2">
               No hay detalles adicionales disponibles.
            </div>
          )}
        </div>

        
        <Link
          to="/cursos"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow hover:shadow-md hover:from-blue-700 hover:to-purple-700 transition-all"
        >
          Ver más cursos
        </Link>
      </div>
    </div>
  );
}