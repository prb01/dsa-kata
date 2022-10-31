type Node<T> = {
  value: T;
  prev?: Node<T>;
  next?: Node<T>;
};

export default class DoublyLinkedList<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  prepend(item: T): void {
    const node = { value: item } as Node<T>;

    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  insertAt(item: T, idx: number): void {
    if (idx > this.length) {
      throw new Error("Trying to insert past length of list");
    }

    if (idx === this.length) {
      this.append(item);
      return;
    } else if (idx === 0) {
      this.prepend(item);
      return;
    }

    this.length++;
    const currNode = this.getAt(idx) as Node<T>;
    const newNode = { value: item } as Node<T>;

    newNode.next = currNode;
    newNode.prev = currNode.prev;
    currNode.prev = newNode;

    if (newNode.prev) {
      newNode.prev.next = newNode;
    }
  }

  append(item: T): void {
    this.length++;

    const node = { value: item } as Node<T>;
    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  remove(item: T): T | undefined {
    let currNode = this.head;
    for (let i = 0; currNode && i < this.length; ++i) {
      if (currNode.value === item) {
        break;
      }
      currNode = currNode.next;
    }

    if (!currNode) return;

    return this.removeNode(currNode);
  }

  get(idx: number): T | undefined {
    return this.getAt(idx)?.value;
  }

  removeAt(idx: number): T | undefined {
    const node = this.getAt(idx) as Node<T>;
    if (!node) return undefined;
    return this.removeNode(node);
  }

  private getAt(idx: number): Node<T> | undefined {
    let curr = this.head;
    for (let i = 0; curr && i < idx; ++i) {
      curr = curr.next;
    }
    return curr;
  }

  private removeNode(node: Node<T>): T | undefined {
    this.length--;
    if (this.length === 0) {
      this.head = this.tail = undefined;
      return node.value;
    }

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    if (node === this.head) this.head = node.next;
    if (node === this.tail) this.tail = node.prev;
    node.prev = node.next = undefined;

    return node.value;
  }
}
