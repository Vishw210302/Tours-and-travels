import { Plane } from 'lucide-react'
import React from 'react'

const PlaneLoader = () => {
    return (
        <div className="relative w-24 h-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center">
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className="absolute top-1/2 h-2 w-2 rounded-full bg-white/20 animate-float-cloud"
                    style={{
                        left: `${i * 30}%`,
                        animationDelay: `${i * 0.1}s`,
                        opacity: 0.5
                    }}
                />
            ))}

            <div className="absolute inset-0 flex items-center">
                <div className="plane-container animate-fly-across">
                    <Plane
                        size={30}
                        className="text-white transform rotate-45  drop-shadow-md"
                    />
                </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-sm animate-pulse">Processing</span>
            </div>
        </div>
    )
}

export default PlaneLoader