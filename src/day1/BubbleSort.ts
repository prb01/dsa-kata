export default function bubble_sort(arr: number[]): void {
    let unsorted = true;

    while (unsorted) {
        unsorted = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                unsorted = true;
                const temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
}
