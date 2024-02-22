import { color } from "framer-motion";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   canvas.width = window.innerWidth - 50;
  //   canvas.height = window.innerHeight - 50;
  //   const c = canvas.getContext("2d");
  //   if (!c) return;

  //   // for (let i = 1; i < 1000; i++) {
  //   //   context.fillRect(1 * i, 1 * i, 1, 1 * i);
  //   //   context.fillRect(2 * i, 1 * i, 1, 1);
  //   //   context.fillRect(3 * i, 1 * 0, 1, 1 * i);
  //   //   context.fillRect((1 / 2) * i, 1 * i, 1, 1);
  //   //   context.fillRect((1 / 3) * i, 1 * i, 1, 1);
  //   // }
  //   // c.fillStyle = "blue";
  //   // c.fillRect(100, 100, 100, 100);
  //   // c.fillStyle = "red";
  //   // c.fillRect(500, 700, 100, 100);
  //   // c.fillStyle = "yellow";
  //   // c.fillRect(900, 300, 100, 100);

  //   // // line
  //   // c.beginPath();
  //   // c.moveTo(500, 100);
  //   // c.lineTo(900, 300);
  //   // c.lineTo(300, 300);
  //   // c.lineTo(500, 100);
  //   // c.strokeStyle = "#fff";
  //   // c.stroke();
  //   // //line
  //   // c.beginPath();
  //   // c.arc(500, 400, 50, 0, Math.PI * 2);
  //   // c.strokeStyle = "pink";
  //   // c.stroke();

  //   // for (let i = 0; i < 100000; i++) {
  //   //   const axis = {
  //   //     x: Math.random() * window.innerWidth,
  //   //     y: Math.random() * window.innerHeight,
  //   //   };
  //   //   // const color = {
  //   //   // r: Math.floor(Math.random() * 256),
  //   //   // g: Math.floor(Math.random() * 256),
  //   //   // b: Math.floor(Math.random() * 256),
  //   //   // };
  //   //   // mono
  //   //   const monoshade = Math.floor(Math.random() * 256);
  //   //   const color = {
  //   //     r: monoshade,
  //   //     g: monoshade,
  //   //     b: monoshade,
  //   //   };
  //   //   // console.log(axis);
  //   //   c.beginPath();
  //   //   c.arc(axis.x, axis.y, 50, 0, Math.PI * 2);
  //   //   c.strokeStyle = `rgb(${color.r},${color.g},${color.b})`;
  //   //   c.stroke();
  //   // }

  //   return () => {
  //     // clearInterval(interval);
  //   };
  // }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d");
    if (!c) return;

    class Circle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      color: { r: number; g: number; b: number };

      constructor(
        x: number,
        y: number,
        dx: number,
        dy: number,
        radius: number,
      ) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = {
          r: Math.floor(Math.random() * 256),
          g: Math.floor(Math.random() * 256),
          b: Math.floor(Math.random() * 256),
        };
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = `rgb(${this.color.r},${this.color.g},${this.color.b})`;
        c.stroke();
      }

      update(c: CanvasRenderingContext2D) {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw(c);
      }
    }

    const circleArray: Circle[] = [];

    for (let i = 0; i < 100; i++) {
      const radius = 50;
      const x = Math.random() * (innerWidth - 2 * radius) + radius;
      const y = Math.random() * (innerHeight - 2 * radius) + radius;
      const dx = (Math.random() - 0.5) * 500;
      const dy = (Math.random() - 0.5) * 500;
      circleArray.push(new Circle(x, y, dx, dy, radius));
    }

    const animate = () => {
      c.clearRect(0, 0, innerWidth, innerHeight);
      requestAnimationFrame(animate);

      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update(c);
      }
    };
    animate();

    return () => {};
  }, []);
  return (
    <div className="grid h-full w-full place-content-center p-2">
      <canvas className="border" ref={canvasRef} />
    </div>
  );
};

export default Canvas;
