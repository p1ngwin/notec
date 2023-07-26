import { useState, useEffect } from "react";

/**
 * Custom store hook for avoiding issues below
 * This is needed in order to avoid Nextjs SSR rendering errors such as
 * Text content does not match server-rendered HTML
 * Hydration failed because the initial UI does not match what was rendered on the server
 * There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering
 *
 * When modifying data before first SSR render, the usage for store hooks is like
 * `const user = useStore(useCustomStore, (state) => state.property);`
 */

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;
