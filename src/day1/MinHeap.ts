/*
    0
  1   2
 3 4 5 6
*/
// left child: 2i + 1
// right child: 2i + 2
// parent: Math.floor((i-1) / 2)
export default class MinHeap {
  public length: number;
  private data: number[];

  constructor() {
    this.data = [];
    this.length = 0;
  }

  insert(value: number): void {
    this.data[this.length] = value;
    this.heapifyUp(this.length);
    this.length++;
  }

  delete(): number {
    if (this.length === 0) return -1;

    const out = this.data[0];
    this.length--;
    if (this.length === 0) {
      this.data = [];
      return out;
    }

    this.data[0] = this.data[this.length];
    this.heapifyDown(0);

    return out;
  }

  // When deleting, replace root with last item, then heapify down: check children, find minimum, compare vs parent, and then swap
  private heapifyDown(idx: number): void {
    const leftIdx = this.leftChild(idx);
    const rightIdx = this.rightChild(idx);
    if (idx >= this.length || leftIdx >= this.length) return;

    const leftValue = this.data[leftIdx];
    const rightValue = this.data[rightIdx];
    const value = this.data[idx];

    if (leftValue > rightValue && value > rightValue) {
      this.data[idx] = rightValue;
      this.data[rightIdx] = value;
      this.heapifyDown(rightIdx);
    } else if (rightValue > leftValue && value > leftValue) {
      this.data[idx] = leftValue;
      this.data[leftIdx] = value;
      this.heapifyDown(leftIdx);
    }
  }

  // When adding new item, keep moving item "up" (switching values) if item.value is smaller than parent
  private heapifyUp(idx: number): void {
    if (idx === 0) return;

    const parent = this.parent(idx);
    const parentValue = this.data[parent];
    const value = this.data[idx];

    if (value > parentValue) {
      return;
    }

    this.data[parent] = value;
    this.data[idx] = parentValue;
    this.heapifyUp(parent);
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  private leftChild(idx: number): number {
    return 2 * idx + 1;
  }

  private rightChild(idx: number): number {
    return 2 * idx + 2;
  }
}
