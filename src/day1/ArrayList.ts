export default class ArrayList<T> {
    public length: number;
    private arr: Array<T>;

    constructor(length = 0) {
        this.length = 0;
        this.arr = new Array(length);
    }

    prepend(item: T): void {
        console.log("prepend", { arr: this.arr, length: this.length });
        this.length++;
        for (let i = this.length - 1; i > 0; --i) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[0] = item;
    }

    insertAt(item: T, idx: number): void {
        this.length++;
        for (let i = this.length - 1; i > idx; --i) {
            this.arr[i] = this.arr[i - 1];
        }
        this.arr[idx] = item;
    }

    append(item: T): void {
        console.log("append", { arr: this.arr, length: this.length });
        this.arr[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        console.log("remove", { arr: this.arr, length: this.length });

        for (let i = 0; i < this.length; ++i) {
            if (this.arr[i] === item) {
                const removedItem = this.arr[i];
                for (let j = i; j < this.length - 1; ++j) {
                    this.arr[j] = this.arr[j + 1];
                }

                this.length--;
                return removedItem;
            }
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        console.log("get", { arr: this.arr, length: this.length });
        return this.arr[idx];
    }

    removeAt(idx: number): T | undefined {
        console.log("removeAt", { arr: this.arr, length: this.length });

        if (!this.arr[idx]) {
            return undefined;
        }

        const removedItem = this.arr[idx];
        for (let i = idx; i < this.length - 1; ++i) {
            this.arr[i] = this.arr[i + 1];
        }

        this.length--;
        return removedItem;
    }
}
