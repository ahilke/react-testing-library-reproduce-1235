import { useCallback, useRef, useEffect } from 'react';

export const useAsyncState = <
  C extends (...args: any) => any,
  State extends any,
>([state, callback]: [State, C]) => {
  const resolveRef = useRef<() => void>();

  const asyncCallback = useCallback(
    (...args: Parameters<C>) =>
      new Promise<void>((resolve) => {
        callback(...(args as any[]));
        resolveRef.current = () => resolve();
      }),
    [callback],
  );

  useEffect(() => {
    if (resolveRef.current) {
      resolveRef.current();
    }
  }, [state]);

  return [state, asyncCallback] as [State, typeof asyncCallback];
};
