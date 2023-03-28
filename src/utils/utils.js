export function equalArrays(a, b) {
  return a.sort().join() === b.sort().join();
}
