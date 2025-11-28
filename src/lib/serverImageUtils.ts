import sharp from 'sharp';
import { ImageVector } from './imageMath';

const IMAGE_SIZE = 100;

// Convierte un buffer de imagen a vector numérico
// Redimensiona a 100x100, convierte a escala de grises y extrae píxeles
export async function bufferToImageVector(buffer: Buffer): Promise<ImageVector> {
    const { data } = await sharp(buffer)
        .resize(IMAGE_SIZE, IMAGE_SIZE, { fit: 'fill' })
        .grayscale()
        .raw()
        .toBuffer({ resolveWithObject: true });

    return new Float32Array(data);
}

// Convierte un objeto File a vector de imagen
export async function fileToImageVector(file: File): Promise<ImageVector> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return bufferToImageVector(buffer);
}
