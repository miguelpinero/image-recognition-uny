import { ImageVector, euclideanDistance } from './imageMath';
import { ReferenceObject } from './referenceObjects';

export interface ClassificationResult {
    objectName: string | null;
    distance: number | null;
    isConfident: boolean;
}


// Umbral de confianza: si la distancia es mayor, se considera "no identificado"
const CONFIDENCE_THRESHOLD = 5000;

export function classifyImage(inputVector: ImageVector, references: ReferenceObject[]): ClassificationResult {
    if (references.length === 0) {
        return { objectName: null, distance: null, isConfident: false };
    }

    let minDistance = Infinity;
    let bestMatch: ReferenceObject | null = null;

    for (const ref of references) {
        const dist = euclideanDistance(inputVector, ref.vector);
        if (dist < minDistance) {
            minDistance = dist;
            bestMatch = ref;
        }
    }

    if (!bestMatch) {
        return { objectName: null, distance: null, isConfident: false };
    }

    // Verifica si la distancia está dentro del umbral de confianza
    const isConfident = minDistance < CONFIDENCE_THRESHOLD;

    return {
        objectName: bestMatch.name,
        distance: minDistance,
        isConfident: isConfident,
    };
}
