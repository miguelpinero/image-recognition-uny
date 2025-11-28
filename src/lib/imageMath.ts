export type ImageVector = Float32Array;

// Calcula la distancia euclidiana entre dos vectores de imagen
// d = sqrt(sum((x_i - y_i)^2))
export function euclideanDistance(a: ImageVector, b: ImageVector): number {
  if (a.length !== b.length) {
    throw new Error(`Vector lengths do not match: ${a.length} vs ${b.length}`);
  }

  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    const diff = a[i] - b[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
}
