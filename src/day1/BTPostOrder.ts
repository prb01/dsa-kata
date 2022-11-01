function walk(node: BinaryNode<number> | null, path: number[]): void {
  if (!node) return;

  walk(node.left, path);
  walk(node.right, path);
  path.push(node.value);
}

export default function post_order_search(head: BinaryNode<number>): number[] {
  const path: number[] = [];
  walk(head, path);
  return path;
}
