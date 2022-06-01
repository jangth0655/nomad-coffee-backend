export const processSlug = (categoryName: string, name: string) => {
  const category = categoryName.trim().toLowerCase();
  const shopName = name.trim().toLowerCase();
  const newSlug = `${category}-${shopName}`;
  return newSlug;
};
