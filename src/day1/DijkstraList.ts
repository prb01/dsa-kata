function hasUnvisited(seen: boolean[], dists: number[]): boolean {
  return seen.some((s, i) => !s && dists[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dists: number[]): number {
  let idx = -1;
  let lowestDist = Infinity;

  for (let i = 0; i < dists.length; ++i) {
    if (seen[i]) continue;
    if (dists[i] >= lowestDist) continue;

    idx = i;
    lowestDist = dists[i];
  }

  return idx;
}

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList,
): number[] {
  const seen = new Array(arr.length).fill(false);
  const prev = new Array(arr.length).fill(-1);
  const dists = new Array(arr.length).fill(Infinity);

  dists[source] = 0;

  while (hasUnvisited(seen, dists)) {
    const lo = getLowestUnvisited(seen, dists);
    seen[lo] = true;

    for (const edge of arr[lo]) {
      if (seen[edge.to]) continue;

      const dist = dists[lo] + edge.weight;
      if (dist < dists[edge.to]) {
        prev[edge.to] = lo;
        dists[edge.to] = dist;
      }
    }
  }

  let curr = sink;
  const out: number[] = [];
  while (prev[curr] !== -1) {
    out.push(curr);
    curr = prev[curr];
  }
  
  out.push(curr);
  return out.reverse();
}
