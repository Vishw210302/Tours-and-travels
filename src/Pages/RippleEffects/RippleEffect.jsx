import React, { useEffect } from "react";
import $ from "jquery";
import "jquery.ripples";
import vishw from "../../assets/waterEffect.png"

const RippleEffect = () => {
    useEffect(() => {
        $("#ripple").ripples({
            resolution: 512,
            dropRadius: 20,
            perturbance: 0.04,
        });
    }, []);

    return (
        <section style={{ maxHeight: "100%", margin: "auto" }}>
            <div
                id="ripple"
                style={{
                    height: "500px",
                    background: `url(${vishw}) left top / cover`,
                    objectFit: "cover",
                }}
            ></div>
        </section>
    );
};

export default RippleEffect;
