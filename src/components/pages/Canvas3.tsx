import { useEffect, useRef } from "react";

const Canvas3 = () => {
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

    // rest of the items here

    const DrawSine = (pointInterval: number, y: number) => {
      c.moveTo(0, y);
      c.beginPath();
      for (let i = 0; i < innerWidth; i += pointInterval) {
        c.lineTo(i, y + Math.sin(i / 50) * 50);
      }
      c.strokeStyle = "#fff";
      c.stroke();
    };
    const DrawCos = (pointInterval: number, y: number) => {
      c.moveTo(0, y);
      c.beginPath();
      for (let i = 0; i < innerWidth; i += pointInterval) {
        c.lineTo(i, y + Math.cos(i / 50) * 50);
      }
      c.strokeStyle = "#fff";
      c.stroke();
    };

    const DrawSineLODSet = (initY: number, LodDecr: number) => {
      for (let i = 5; i < 150; i += LodDecr) {
        DrawSine(i, initY + 20 * i);
        DrawCos(i, initY + 20 * i);
      }
    };

    DrawSineLODSet(0, 5);

    const animate = () => {
      requestAnimationFrame(animate);
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

export default Canvas3;
