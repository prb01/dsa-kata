export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] | null {
  const seen: boolean[] = new Array(graph.length).fill(false);
  const prev: number[] = new Array(graph.length).fill(-1);
  const q: number[] = [source];
  seen[source] = true;

  while (q.length) {
    const curr = q.shift() as number;
    if (curr === needle) break;

    const adjs = graph[curr];
    for (let i = 0; i < adjs.length; ++i) {
      if (adjs[i] === 0) continue;
      if (seen[i]) continue;

      seen[i] = true;
      prev[i] = curr;
      q.push(i);
    }
  }

  let curr = needle;
  const out: number[] = [];

  while (prev[curr] !== -1) {
    out.push(curr);
    curr = prev[curr];
  }

  if (out.length) return [source].concat(out.reverse());

  return null;
}
