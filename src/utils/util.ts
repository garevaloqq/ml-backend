export const findMostFrequent = (arr: string[]): string => {
    const category = arr.sort((a, b) => arr.filter((v) => v === a).length - arr?.filter((v) => v === b).length).pop();
    return category?.toString() || arr[0];
};
