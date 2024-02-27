import { CollisionBall } from "@/entities/Collision";
import { useEffect, useRef } from "react";

const Canvas2 = () => {
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
    const getDist = (x: number, y: number, x2: number, y2: number) => {
      return Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
    };

    let ballArr: CollisionBall[] = [];
    for (let i = 0; i < 100; i++) {
      // make sure it's safe Lol
      const radius = 20;
      let x = Math.random() * (innerWidth - 2 * radius + radius);
      let y = Math.random() * (innerHeight - 2 * radius + radius);
      console.log(x, y);
      const dx = Math.random() * 5 * (1 + -2 * Math.floor(Math.random() * 2));
      const dy = Math.random() * 5 * (1 + -2 * Math.floor(Math.random() * 2));
      for (let j = 0; j < ballArr.length; j++) {
        if (getDist(x, y, ballArr[j].x, ballArr[j].y) > radius * 2) {
          x = Math.random() * (innerWidth - 2 * radius) + radius;
          y = Math.random() * (innerHeight - 2 * radius) + radius;
          j = -1;
        }
      }
      console.log(x, y);
      ballArr.push(new CollisionBall({ x: x, y: y, dx, dy, radius }));
    }
    const rotate = (velocity: { x: number; y: number }, angle: number) => {
      return {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
      };
    };

    const animate = () => {
      c.clearRect(0, 0, innerWidth, innerHeight);
      requestAnimationFrame(animate);
      for (let i = 0; i < ballArr.length; i++) {
        ballArr[i].update(c);
      }
    };
    animate();

    return () => {
      ballArr = [];
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

export default Canvas2;
