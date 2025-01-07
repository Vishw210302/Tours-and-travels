import $ from "jquery";
import "jquery.ripples";
import React, { useEffect } from "react";

const RippleEffect = ({ BannerImage, BannerTitle }) => {

    useEffect(() => {
        $("#ripple").ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
        });
    }, []);

    return (
        <section
            style={{
                maxHeight: "100%",
                margin: "auto",
                position: "relative",
                width: "100%",
            }}
        >
            <div
                id="ripple"
                className="w-full h-[500px] flex flex-col justify-center items-center bg-cover bg-center relative sm:h-[400px] md:h-[500px] lg:h-[600px]"
                style={{
                    background: `url(${BannerImage}) left top / cover no-repeat`,
                }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <h1 className="text-white text-xl sm:text-3xl font-extrabold mb-6 drop-shadow-md z-10 text-center px-4">
                    {BannerTitle}
                </h1>
            </div>
        </section>
    );
};

export default RippleEffect;