import { Download, RotateCw, X, ZoomIn, ZoomOut } from 'lucide-react';
import React, { useState } from 'react';

const ImageModal = ({ isOpen, onClose, imageUrl }) => {

    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);

    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.2, 3));
    };

    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - 0.2, 0.5));
    };

    const handleRotate = () => {
        setRotation(prev => prev + 90);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            <div className="relative h-full w-full flex items-center justify-center p-4">
                <div className="absolute top-4 right-4 left-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleZoomIn}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                        >
                            <ZoomIn className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={handleZoomOut}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                        >
                            <ZoomOut className="w-5 h-5 text-white" />
                        </button>
                        <button
                            onClick={handleRotate}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                        >
                            <RotateCw className="w-5 h-5 text-white" />
                        </button>
                        <button
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                        >
                            <Download className="w-5 h-5 text-white" />
                        </button>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
                    <img
                        src={imageUrl}
                        alt="Modal content"
                        className="max-w-full max-h-[85vh] object-contain transition-transform duration-200 rounded-lg"
                        style={{
                            transform: `scale(${scale}) rotate(${rotation}deg)`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageModal