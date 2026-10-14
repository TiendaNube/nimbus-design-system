let nextToastId = 0;

export const uniqueId = () => {
  nextToastId += 1;
  return `nimbus-toast-${nextToastId}`;
};
