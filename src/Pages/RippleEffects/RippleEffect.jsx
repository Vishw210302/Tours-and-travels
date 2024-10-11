import React, { useEffect } from "react";
import $ from "jquery";
import "jquery.ripples";

const RippleEffect = ({ BannerImage, BannerTitle }) => {
    useEffect(() => {
        $("#ripple").ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
        });
    }, []);

    return (
        <section style={{ maxHeight: "100%", margin: "auto", position: "relative", width: "100%" }}>
            <div
                className="w-full h-[500px] flex flex-col justify-center items-center  bg-cover bg-center relative"
                id="ripple"
                style={{
                    background: `url(${BannerImage}) left top / cover`,
                }}
            >
                <h1 className="text-white text-4xl font-extrabold mb-6 drop-shadow-md">
                    {BannerTitle}
                </h1>
            </div>
        </section>
    );
};

export default RippleEffect;
