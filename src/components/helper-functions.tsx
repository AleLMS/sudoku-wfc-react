/* export function removeValueFromArray(array: any[], value: any) {
    const index = array.indexOf(value);
    if (index > -1) array.splice(index, 1);
    return array;
} */

export function removeValueFromArray(array: number[], value: number) {
    const index = array.indexOf(value);
    if (index > -1) array.splice(index, 1);
    return array;
}

export const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
