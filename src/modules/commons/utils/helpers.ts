export const getInitials = (name: string | undefined): string => {
  if (!name) return "";

  const names = name?.split(" ").slice(0, 2); // Take only the first two names
  const initials = names?.map(word => word.charAt(0)).join("");

  return initials.toUpperCase();
};
