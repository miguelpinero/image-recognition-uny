'use client';

import { useState } from 'react';
import { identifyObjectAction } from './actions/identifyObject';

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [result, setResult] = useState<{ objectName: string | null; distance: number | null; isConfident: boolean } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setResult(null);
        }
    };

    const handleIdentify = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await identifyObjectAction(formData);
            setResult(res);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al identificar el objeto.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFile(null);
        setPreviewUrl(null);
        setResult(null);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 text-gray-900">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center text-blue-600">
                    Reconocimiento de Objetos
                </h1>
                <p className="text-center text-gray-500 text-sm">
                    Cálculo Numérico - Distancia Euclidiana
                </p>

                {/* Image Upload / Preview Area */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-64 bg-gray-50 relative overflow-hidden">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="object-contain h-full w-full"
                        />
                    ) : (
                        <div className="text-center p-4">
                            <p className="text-gray-400 mb-2">No hay imagen seleccionada</p>
                            <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                                Cargar imagen
                                <input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleIdentify}
                        disabled={!file || loading || !!result}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition shadow-sm"
                    >
                        {loading ? 'Procesando...' : 'Identificar objeto'}
                    </button>

                    {result && (
                        <button
                            onClick={handleReset}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition"
                        >
                            Reiniciar
                        </button>
                    )}
                </div>

                {/* Result Display */}
                <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center min-h-[80px] flex items-center justify-center">
                    {result ? (
                        <div>
                            {result.isConfident && result.objectName ? (
                                <p className="text-lg">
                                    El objeto es un(a) <span className="font-bold text-green-600 uppercase">{result.objectName}</span>
                                </p>
                            ) : (
                                <p className="text-red-500 font-medium">
                                    No se pudo identificar el objeto.
                                </p>
                            )}
                            {result.distance !== null && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Distancia: {result.distance.toFixed(2)}
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-400 italic">
                            El resultado aparecerá aquí...
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}
