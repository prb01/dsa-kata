type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
  return { value };
}

export default class LRU<K, V> {
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;
  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;

  constructor(private capacity: number = 10) {
    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  update(key: K, value: V): void {
    // does it exist?
    // If no, insert
    // - check cap & remove tail if over cap
    // if it does exist, move to front of list & update

    let node = this.lookup.get(key);
    if (!node) {
      node = createNode(value);
      this.lookup.set(key, node)
      this.reverseLookup.set(node, key)
      this.length++;
      this.prepend(node);
      this.trimCache();
    } else {
      node.value = value;
      this.detach(node);
      this.prepend(node);
    }
  }

  get(key: K): V | undefined {
    // check for existence
    // update value found and move to front
    // return out value if found or undefined if !exist
    const node = this.lookup.get(key);
    if (!node) return undefined;

    this.detach(node);
    this.prepend(node);

    return node.value;
  }

  private detach(node: Node<V>): void {
    if (this.length === 0) return;
    if (node === this.head) return;

    if (node.prev) node.prev.next = node.next;
    if (node.next) node.next.prev = node.prev;
    if (node === this.tail) this.tail = this.tail.prev;

    node.next = node.prev = undefined;
  }

  private prepend(node: Node<V>): void {
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }

  private trimCache(): void {
    if (this.length <= 0) return;
    if (this.length <= this.capacity) return;

    const tail = this.tail as Node<V>;
    this.detach(tail);
    tail.next = tail.prev = undefined;

    const key = this.reverseLookup.get(tail) as K;
    this.lookup.delete(key);
    this.reverseLookup.delete(tail);
    this.length--;
  }
}
