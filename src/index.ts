// Generates superpermutations using Greg Egan's method adapted from
// "Hamiltonicity of the Cayley Digraph ..." by Aaron Williams, documented at
// http://www.gregegan.net/SCIENCE/Superpermutations/Superpermutations.html,
// which uses local rules to discover a Hamiltonian traversal of the graph of
// the permutation group using only edges with weights 1 and 2.


// Hard-coded superpermutations for small n
const small = [
  [],
  [1],
  [1,2,1],
  [1,2,3,1,2,1,3,2,1],
  [1,2,3,4,1,2,3,1,4,2,3,1,2,4,3,1,2,1,3,4,2,1,3,2,4,1,3,2,1,4,3,2,1],
  [
    1,2,3,4,5,1,2,3,4,1,5,2,3,4,1,2,5,3,4,1,2,3,5,4,1,2,3,1,4,5,2,
    3,1,4,2,5,3,1,4,2,3,5,1,4,2,3,1,5,4,2,3,1,2,4,5,3,1,2,4,3,5,1,
    2,4,3,1,5,2,4,3,1,2,5,4,3,1,2,1,3,4,5,2,1,3,4,2,5,1,3,4,2,1,5,
    3,4,2,1,3,5,4,2,1,3,2,4,5,1,3,2,4,1,5,3,2,4,1,3,5,2,4,1,3,2,5,
    4,1,3,2,1,4,5,3,2,1,4,3,5,2,1,4,3,2,5,1,4,3,2,1,5,4,3,2,1,
  ],
  [
    1,2,3,4,5,6,1,2,3,4,5,1,6,2,3,4,5,1,2,6,3,4,5,1,2,3,6,4,5,1,2,
    3,4,6,5,1,2,3,4,1,5,6,2,3,4,1,5,2,6,3,4,1,5,2,3,6,4,1,5,2,3,4,
    6,1,5,2,3,4,1,6,5,2,3,4,1,2,5,6,3,4,1,2,5,3,6,4,1,2,5,3,4,6,1,
    2,5,3,4,1,6,2,5,3,4,1,2,6,5,3,4,1,2,3,5,6,4,2,1,3,5,4,6,2,1,3,
    5,4,2,6,1,3,4,5,2,1,6,3,4,5,2,1,3,6,4,5,2,1,3,4,6,5,2,1,3,4,5,
    6,2,1,3,4,5,2,6,1,3,4,2,5,6,1,3,4,2,6,5,1,3,2,4,6,1,5,3,2,4,1,
    6,5,3,2,1,4,6,5,3,2,1,6,4,5,3,2,1,6,5,4,3,1,2,6,5,4,3,1,6,2,5,
    4,3,1,6,5,2,4,3,1,6,5,4,2,3,1,6,5,4,3,2,1,6,5,3,4,2,1,6,5,3,2,
    4,1,5,6,3,2,1,4,5,6,3,2,1,5,4,6,3,1,2,5,4,6,3,1,5,2,4,6,3,1,5,
    4,2,6,3,1,5,4,6,2,3,1,5,4,6,3,2,1,5,6,4,3,2,5,1,6,3,4,2,5,1,6,
    3,2,4,5,1,6,3,2,5,4,1,6,3,2,5,1,4,6,3,5,2,1,4,6,3,5,1,2,4,6,3,
    5,1,4,2,6,3,5,1,4,6,2,3,5,1,4,6,3,2,5,1,6,4,3,2,5,6,1,4,3,2,5,
    6,4,1,3,2,5,6,4,3,1,2,5,6,4,3,2,1,5,6,3,4,2,1,5,6,3,2,4,1,5,3,
    6,2,1,4,5,3,6,1,2,4,5,3,1,6,2,4,5,3,1,2,6,4,5,3,1,2,4,6,5,3,1,
    2,4,5,6,3,1,2,4,5,3,6,1,4,2,5,3,1,6,4,2,5,3,1,4,6,2,5,3,1,4,2,
    6,5,3,1,4,2,5,6,3,1,4,2,5,3,6,1,4,5,2,3,1,6,4,5,2,3,1,4,6,5,2,
    3,1,4,5,6,2,3,1,4,5,2,6,3,1,4,5,2,3,6,1,4,5,3,2,6,1,4,5,3,6,2,
    1,5,4,3,6,1,2,5,4,3,6,1,5,2,4,3,6,1,5,4,2,3,6,1,5,4,3,2,6,1,5,
    4,3,6,2,1,5,3,4,6,2,1,5,3,6,4,2,1,5,3,6,2,4,1,5,3,2,6,4,1,5,3,
    2,4,6,1,3,5,2,4,1,6,3,5,2,4,1,3,6,5,2,4,1,3,5,6,2,4,3,1,5,6,2,
    4,3,5,1,6,2,4,3,5,6,1,2,4,3,5,6,2,1,4,3,5,6,2,4,1,3,5,2,6,4,3,
    1,5,2,6,4,3,5,1,2,6,4,3,5,2,1,6,4,3,5,2,6,1,4,3,5,2,6,4,1,3,5,
    2,4,6,1,3,2,5,4,6,1,3,2,4,5,6,1,3,2,4,6,5,1,3,2,6,4,5,1,3,2,6,
    5,4,1,3,2,6,5,1,4,3,6,2,5,1,3,4,6,2,5,1,3,6,4,2,5,1,3,6,2,4,5,
    1,3,6,2,5,4,1,3,6,2,5,1,4,3,6,5,2,1,4,3,6,5,1,2,4,3,6,5,1,4,2,
    3,6,5,1,4,3,2,6,5,1,3,4,2,6,1,5,3,4,2,6,1,3,5,4,2,1,6,3,5,4,2,
    1,3,6,5,4,2,1,3,5,6,4,2,3,1,5,6,4,2,3,5,1,6,4,2,3,5,6,1,4,2,3,
    5,6,4,1,2,3,5,4,6,1,2,3,5,4,1,6,2,3,5,4,1,2,6,3,5,4,1,2,3,6,5,
    4,1,2,3,
  ]
] 

function factorial(n: bigint): bigint {
  if (n <= 1) return 1n;
  let f = n;
  while (--n > 1) f *= n;
  return f;
}

export function superperm_length(n: number) {
  if (n < small.length)
    return BigInt(small[n].length);

  const bn = BigInt(n);

  // L2(n) = n! + (n–1)! + (n–2)! + (n–3)! + n – 3
  
  const fn3 = factorial(bn - 3n);
  const fn2 = fn3 * (bn - 2n);
  const fn1 = fn2 * (bn - 1n);
  const fn = fn1 * bn;
  return fn + fn1 + fn2 + fn3 + bn - 3n;
}

// Multiply two permutations
// Used to traverse graph edges
function pmul(p: number[], q: number[], n: number, m: number[]) {
  for (let i = 0; i < n; i++) m[i] = p[q[i]];
}

// Compare array elements
// Used to determine when to splice the small cycle
// into the large cycle, by taking a weight-1 edge
// where we would otherwise take a weight-2 edge.
function arrayNEq(a: number[], b: number[], n: number) {
  for (let i = 0; i < n; i++)
    if (a[i] !== b[i]) return true;
  return false;
}

/*
  Determine whether a permutation is followed by a weight-2 edge.
  If the first digit, f, in the permutation is not equal to n, and the
  digit 1 + ((f–2) mod (n–1)) is cyclically the first entry to the right
  of n in the block that excludes the first digit, choose weight 2.
  Otherwise choose weight 1.
*/
function chooseWeight2(p: number[], n: number, n1: number, ninv: number) {
  if (p[0] === n) return false; // Never weight-2 if n comes first
  
  // Slot cyclically to the right of n, omitting the first slot
  let rpos!: number;
  for (let i = 1; i < n; i++) {
    if (p[i] !== n) continue;
    // i holds the location of n in the permutation
    rpos = 1 + i - n1 * Math.floor(i * ninv);
    break;
  }
  
  // Weight-2 edge if right slot is one less than
  // first slot, modulo n-1 with a start of 1.
  const s = p[0] + n - 3;
  return p[rpos] === 1 + s - n1 * Math.floor(s * ninv);
}

export function superpermute(n: number, cycle?: boolean): Generator<number>;
export function superpermute<T>(symbols: T[], cycle?: boolean): Generator<T>;
export function * superpermute<T>(symbols: number | T[], cycle = false) {
  let n: number;

  /*
    Normalize inputs and bail out to hard-coded
    sequences for small values of n
  */
  if (typeof symbols === 'number') {
    if (symbols === 0) return;
    if (symbols < small.length) {
      const p = small[symbols];
      if (p.length === 0) return;
      do { yield * p; } while (cycle);
      return;
    }

    n = symbols;
    symbols = Array.from({ length: n }, (_, i) => 1 + i) as unknown as T[];
  } else {
    n = symbols.length;
    if (n === 0) return;
    if (n < small.length) {
      const p = small[n];
      do for (const i of p) {
        yield symbols[i - 1];
      } while (cycle);
      return;
    }
  }

  /*
    Set up for the Williams algorithm
    Everything before the loop only runs once,
    so it can be idiomatic rather then efficient.
  */ 

  // Left rotation, used for weight-1 edges
  const sigma = Array.from({ length: n }, (_, i) => (i + 1) % n);
  
  // Left-rotation by two, then a swap of the last two entries.
  // Used for weight-2 edges.
  const delta = Array.from({ length: n }, (_, i) => (i + 2) % n);
  [delta[n - 2], delta[n - 1]] = [delta[n - 1], delta[n - 2]];

  // Permutation 1 n n-1 ... 3 2
  // Serves as a sentinel value to
  // determine where to splice cycles.
  const q = Array.from({ length: n }, (_, i) => 1 + (n - i) % n);
  
  // Permutation n-1 n-2 ... 3 2 n 1
  let cur: number[] = [];
  pmul(q, delta, n, cur);

  // Temp used to hold the results of group multiplication.
  let m: number[] = [];

  // Map digits of initial permutation to 1 2 3 ... n
  const remap = new Array<T>(n + 1);
  for (let i = 0; i < n; i++) remap[cur[i]] = symbols[i]; 

  let init!: number[]; // Save starting permutation for cycling
  if (cycle) init = cur.slice();

  // How many permutations do we need?
  const fn = factorial(BigInt(n));

  // How many permutations are left?
  let remaining = fn;

  // How many digits of the current permutation
  // do not overlap with previous digits?
  // This is how many digits we will yield.
  let tail = n;       

  // pre-computed values used in edge selection
  const n1 = n - 1;
  const ninv = 1 / n1;

  // Traverse the graph, emitting digits as we go.
  for(;;) {
    // Yield the new digits,
    // mapped so that we start at 1 2 3 ... n
    for (let i = n - tail; i < n; i++)
      yield remap[cur[i]];

    if (--remaining !== 0n) {
      // To build our superpermutation, apply the
      // edge rules to move around the small cycle
      // until we reach q, then take a weight-1 edge.
      if (chooseWeight2(cur, n, n1, ninv) && arrayNEq(cur, q, n)) {
        pmul(cur, delta, n, m);
        tail = 2;
      } else {
        pmul(cur, sigma, n, m);
        tail = 1;
      }

      // Make the result of traversing an
      // edge our current permutation.
      let t = cur;
      cur = m;
      m = t;

    } else {
      // We have produced all permutations.
      if (!cycle) return;
      // else, Restart
      for (let i = 0; i < n; i++) cur[i] = init[i];
      remaining = fn;
      tail = n;
    }
  }
}