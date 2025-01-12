'use client'
import {React, useState, useEffect } from "react";

const TextAnimate = () => {
    const texts = ["youtuber", "coder", "developer"];
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loop, setLoop] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const typingSpeed = 150;
    const deletingSpeed = 80;
    const pauseBetween = 2000;

    useEffect(() => {
        const handleTyping = () => {
            const fullText = texts[loop % texts.length];

            if (isDeleting) {
                setCurrentText(fullText.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);

                if (charIndex === 0) {
                    setIsDeleting(false);
                    setLoop((prev) => prev + 1);
                }
            } else {
                setCurrentText(fullText.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);

                if (charIndex === fullText.length) {
                    setTimeout(() => setIsDeleting(true), pauseBetween);
                }
            }
        };

        const timer = setTimeout(
            handleTyping,
            isDeleting ? deletingSpeed : typingSpeed
        );

        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, loop, texts]);

    return (
        <div className="text-5xl font-bold bg-transparent">
            <span>{currentText}</span>
            <span style={{
                    borderRight: "2px solid white",
                    animation: "blink 0.7s steps(2) infinite",
                }}
            ></span>
            <style jsx>{`@keyframes blink { 50% { opacity: 0;}}`}</style>
        </div>
    )
}

export default TextAnimate