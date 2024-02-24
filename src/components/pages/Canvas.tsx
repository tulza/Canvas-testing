import { Circle } from "@/entities/Circle";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d");
    if (!c) return;

    const mouse: { x: undefined | number; y: undefined | number } = {
      x: undefined,
      y: undefined,
    };

    const OnResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const OnMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    addEventListener("mousemove", OnMouseMove);
    addEventListener("resize", OnResize);

    const circleArray: Circle[] = [];

    for (let i = 0; i < 100; i++) {
      const radius = 20;
      const x = Math.random() * (innerWidth - 2 * radius) + radius;
      const y = Math.random() * (innerHeight - 2 * radius) + radius;
      const dx = (Math.random() - 0.5) * 2;
      const dy = (Math.random() - 0.5) * 2;
      circleArray.push(new Circle(x, y, dx, dy, radius));
    }

    const animate = () => {
      c.clearRect(0, 0, innerWidth, innerHeight);
      requestAnimationFrame(animate);

      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update(c, mouse);
      }
    };
    animate();

    return () => {
      removeEventListener("resize", OnResize);
      removeEventListener("mousemove", OnMouseMove);
    };
  }, []);
  return (
    <div className="grid h-full w-full place-content-center p-2">
      <canvas className="border" ref={canvasRef} />
    </div>
  );
};

export default Canvas;
