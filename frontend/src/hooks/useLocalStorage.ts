import { useState } from 'react';
import type { SetStateAction } from 'react';

/**
 * Custom Hook — useLocalStorage
 * Funciona igual que useState pero persiste el valor en localStorage.
 * Útil para mantener preferencias del usuario entre sesiones.
 * Ejemplo: const [filtros, setFiltros] = useLocalStorage('mis-filtros', { nombre: '' })
 */
function useLocalStorage<T>(clave: string, valorInicial: T): [T, (valor: SetStateAction<T>) => void] {
  const [valor, setValorState] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(clave);
      return item ? (JSON.parse(item) as T) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  const setValor = (nuevoValor: SetStateAction<T>) => {
    try {
      setValorState((valorActual) => {
        const valorResuelto =
          typeof nuevoValor === 'function'
            ? (nuevoValor as (prevState: T) => T)(valorActual)
            : nuevoValor;
        window.localStorage.setItem(clave, JSON.stringify(valorResuelto));
        return valorResuelto;
      });
    } catch {
      // Si localStorage no está disponible, solo actualiza el estado en memoria
      setValorState(nuevoValor);
    }
  };

  return [valor, setValor];
}

export default useLocalStorage;
