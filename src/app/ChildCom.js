'use client'
import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'

const ChildCom = ({ children }) => {
    useEffect(() => {
        const canvas = document.getElementById("particleCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const numberOfParticles = 200;

        const mouse = {
            x: null,
            y: null,
            radius: 100,
        };

        window.addEventListener("mousemove", (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        });

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = "rgba(0, 255, 204, 0.3)";
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                        this.x += 2;
                    }
                    if (mouse.x > this.x && this.x > this.size * 10) {
                        this.x -= 2;
                    }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                        this.y += 2;
                    }
                    if (mouse.y > this.y && this.y > this.size * 10) {
                        this.y -= 2;
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;

                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                const size = Math.random() * 5 + 1;
                const x = Math.random() * (canvas.width - size * 2) + size * 2;
                const y = Math.random() * (canvas.height - size * 2) + size * 2;
                const directionX = Math.random() * 1 - 0.5;
                const directionY = Math.random() * 1 - 0.5;
                const color = "rgba(0, 255, 204, 0.3)";

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dx = particlesArray[a].x - particlesArray[b].x;
                    const dy = particlesArray[a].y - particlesArray[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        opacityValue = 1 - distance / 100;
                        ctx.strokeStyle = `rgba(0, 255, 204, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }, []);

    return (
        <div className='w-full h-screen scroll-smooth'>
            <Header />
            <canvas id="particleCanvas" className="bg-gray-900 w-full h-screen fixed top-0 left-0 block -z-50"></canvas>
            {children}
            <Footer />
        </div>
    )
}

export default ChildCom