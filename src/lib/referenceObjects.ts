import path from 'path';
import fs from 'fs/promises';
import { ImageVector } from './imageMath';
import { bufferToImageVector } from './serverImageUtils';

export interface ReferenceObject {
    name: string;
    vector: ImageVector;
}

const REFERENCES = [
    // Taza (5 images)
    { name: 'taza', filename: 'taza_1.jpg' },
    { name: 'taza', filename: 'taza_2.jpg' },
    { name: 'taza', filename: 'taza_3.jpg' },
    { name: 'taza', filename: 'taza_4.jpg' },
    { name: 'taza', filename: 'taza_5.jpg' },

    // Lapiz (5 images)
    { name: 'lapiz', filename: 'lapiz_1.jpg' },
    { name: 'lapiz', filename: 'lapiz_2.jpg' },
    { name: 'lapiz', filename: 'lapiz_3.jpg' },
    { name: 'lapiz', filename: 'lapiz_4.jpg' },
    { name: 'lapiz', filename: 'lapiz_5.jpg' },

    // Mouse (5 images)
    { name: 'mouse', filename: 'mouse_1.jpg' },
    { name: 'mouse', filename: 'mouse_2.jpg' },
    { name: 'mouse', filename: 'mouse_3.jpg' },
    { name: 'mouse', filename: 'mouse_4.jpg' },
    { name: 'mouse', filename: 'mouse_5.jpg' },
];

// Carga las imágenes de referencia desde /public/refs y las convierte a vectores
// Usa caché en memoria para evitar recargar en cada petición
let cachedReferences: ReferenceObject[] | null = null;

export async function loadReferenceVectors(): Promise<ReferenceObject[]> {
    if (cachedReferences) {
        return cachedReferences;
    }

    const refsDir = path.join(process.cwd(), 'public', 'refs');
    const loadedRefs: ReferenceObject[] = [];

    for (const ref of REFERENCES) {
        try {
            const filePath = path.join(refsDir, ref.filename);
            const buffer = await fs.readFile(filePath);
            const vector = await bufferToImageVector(buffer);
            loadedRefs.push({ name: ref.name, vector });
        } catch (error) {
            console.error(`Error loading reference ${ref.name}:`, error);
        }
    }

    cachedReferences = loadedRefs;
    return loadedRefs;
}
