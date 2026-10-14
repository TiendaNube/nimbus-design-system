/* global globalThis */
const globalScope = globalThis as typeof globalThis & {
  nimbusToastIdCounter?: number;
};

export const uniqueId = () => {
  globalScope.nimbusToastIdCounter =
    (globalScope.nimbusToastIdCounter ?? 0) + 1;
  return `nimbus-toast-${globalScope.nimbusToastIdCounter}`;
};
