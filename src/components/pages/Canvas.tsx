import { Circle } from "@/entities/Circle";
import { useEffect, useRef } from "react";

const Canvas = () => {
  const mouse: { x: undefined | number; y: undefined | number } = {
    x: undefined,
    y: undefined,
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const c = canvas.getContext("2d");
    if (!c) return;

    const OnResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const OnMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    addEventListener("mousemove", OnMouseMove);
    addEventListener("resize", OnResize);

    let circleArray: Circle[] = [];
    const init = () => {
      circleArray = [];
      for (let i = 0; i < 200; i++) {
        const radius = 10;
        const x = Math.random() * (innerWidth - 2 * radius) + radius;
        const y = Math.random() * (innerHeight - 2 * radius) + radius;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));
      }
    };

    init();

    const getDistance = (x: number, y: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
    };

    const connectLine = (x: number, y: number, x2: number, y2: number) => {
      const lineDistance = 250;
      if (getDistance(x, y, x2, y2) < lineDistance) {
        const opacity =
          255 - Math.floor((getDistance(x, y, x2, y2) / lineDistance) * 256);
        let hex = opacity.toString(16);
        if (hex.length == 1) {
          hex = "0" + hex;
        }
        c.beginPath();
        c.moveTo(x, y);
        c.lineTo(x2, y2);
        c.lineWidth = 2;
        c.strokeStyle = `#ffffff${hex}`;
        c.stroke();
      }
    };

    const animate = () => {
      c.clearRect(0, 0, innerWidth, innerHeight);
      requestAnimationFrame(animate);

      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update(c, mouse);
        for (let j = i + 1; j < circleArray.length; j++) {
          connectLine(
            circleArray[i].x,
            circleArray[i].y,
            circleArray[j].x,
            circleArray[j].y,
          );
        }
      }
    };
    animate();

    return () => {
      circleArray = [];
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
