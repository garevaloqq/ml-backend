/**
 * Get categoría que mas se repite en la búsqueda de productos
 *
 * @param arr - Arreglo de categorías
 * @returns categoríaId - ID de la categoría que más se repite en la búsqueda
 */

export const findMostFrequent = (arr: string[]): string => {
    const category = arr.sort((a, b) => arr.filter((v) => v === a).length - arr?.filter((v) => v === b).length).pop();
    return category?.toString() || arr[0];
};
