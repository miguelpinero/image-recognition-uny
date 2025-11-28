'use server';

import { bufferToImageVector } from '@/lib/serverImageUtils';
import { loadReferenceVectors } from '@/lib/referenceObjects';
import { classifyImage, ClassificationResult } from '@/lib/imageClassifier';

export async function identifyObjectAction(formData: FormData): Promise<ClassificationResult> {
    const file = formData.get('file') as File | null;

    if (!file) {
        throw new Error('No file uploaded');
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const inputVector = await bufferToImageVector(buffer);
        const references = await loadReferenceVectors();
        const result = classifyImage(inputVector, references);

        return result;
    } catch (error) {
        console.error('Error identifying object:', error);
        return {
            objectName: null,
            distance: null,
            isConfident: false,
        };
    }
}
