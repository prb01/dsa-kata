function walk(node: BinaryNode<number> | null, path: number[]): void {
  if (!node) return;

  walk(node.left, path);
  path.push(node.value);
  walk(node.right, path);
}

export default function in_order_search(head: BinaryNode<number>): number[] {
  const path: number[] = [];
  walk(head, path);
  return path;
}
