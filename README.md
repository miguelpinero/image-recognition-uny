# Image Recognition

Educational project for Numerical Calculus course. Implements object recognition using Euclidean distance between image vectors.

## Description

This application identifies objects (cup, pencil, mouse) in uploaded images using a purely numerical approach:

1. **Image Vectorization**: Each image is resized to 100×100 pixels, converted to grayscale, and represented as a vector of 10,000 numbers.
2. **Euclidean Distance**: Compares the input image vector against reference vectors using the formula:
   ```
   d = √(Σ(xi - yi)²)
   ```
3. **Classification**: Selects the reference with minimum distance. If distance > 5000, returns "unidentified".

### Method

- **No AI/ML**: Pure mathematical approach using linear algebra
- **Technology**: Next.js, TypeScript, Sharp (image processing)
- **References**: 5 images per object (15 total)

## Installation

```bash
npm install
```

## Usage

### Development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── actions/
│   │   └── identifyObject.ts    # Server Action
│   └── page.tsx                 # UI
└── lib/
    ├── imageMath.ts             # Euclidean distance
    ├── serverImageUtils.ts      # Image processing (Sharp)
    ├── referenceObjects.ts      # Reference loading
    └── imageClassifier.ts       # Classification logic
```

## Author

Miguel Pinero
