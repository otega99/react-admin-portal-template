export const getActiveLink = (location: string, reference: string) => {
  const isReferenceFound = location.includes(reference.toLowerCase());

  return isReferenceFound;
};
