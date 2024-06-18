"use client"
import { useEffect } from "react";
import gsap from "gsap";

export default function AnimationText({ text, other }: { text: string; other: boolean }) {
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1 });
        tl.to("h1", 30, { backgroundPosition: "-960px 0" });
    }, []);

    return (
        <h1 className="max-w-3/4 text-6xl md:text-8xl font-bold"
            style={{
                backgroundImage: other ? "url(https://i.pinimg.com/736x/e3/e6/0e/e3e60e574c710b06cc2108bd79338994.jpg)" : "url(https://cdn.pixabay.com/photo/2017/07/03/20/17/abstract-2468874_960_720.jpg)",
                backgroundAttachment: "fixed",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text"
            }}
        >
            {text}
        </h1>
    );
};