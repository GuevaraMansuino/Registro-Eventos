import { useEffect, useRef } from 'react';

interface ShortcutOptions {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
}

/**
 * Custom Hook — useKeyboardShortcut
 * Registra una combinación de teclas global y ejecuta un callback al detectarla.
 * Ejemplo: useKeyboardShortcut('b', () => ref.current?.focus(), { ctrl: true })
 */
function useKeyboardShortcut(
  key: string,
  callback: () => void,
  options: ShortcutOptions = {}
) {
  const { ctrl = false, shift = false, alt = false } = options;

  // Usamos una ref para el callback para evitar closures desactualizadas
  // sin necesidad de incluirlo en las dependencias del efecto
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === key.toLowerCase() &&
        e.ctrlKey === ctrl &&
        e.shiftKey === shift &&
        e.altKey === alt
      ) {
        e.preventDefault();
        callbackRef.current();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [key, ctrl, shift, alt]);
}

export default useKeyboardShortcut;
