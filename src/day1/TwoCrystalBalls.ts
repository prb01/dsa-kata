export default function two_crystal_balls(breaks: boolean[]): number {
    const jmpAmount = Math.floor(Math.sqrt(breaks.length));

    let i = jmpAmount;
    for (; i < breaks.length; i += jmpAmount) {
        if (breaks[i]) {
            break;
        }
    }

    const fin = i;
    i -= jmpAmount;

    for (; i < fin; i++) {
        if (breaks[i]) {
            return i;
        }
    }

    return -1;
}
