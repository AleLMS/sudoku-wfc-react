export function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

export function isBetween(min: number, max: number, value: number) {
    if (value >= min && value <= max) return true;
    else return false;
}
