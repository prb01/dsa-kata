function walk(node: BinaryNode<number> | null, path: number[]): void {
  if (!node) {
    return;
  }

  path.push(node.value);
  walk(node.left, path);
  walk(node.right, path);
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
  const path: number[] = [];
  walk(head, path);
  return path;
}
