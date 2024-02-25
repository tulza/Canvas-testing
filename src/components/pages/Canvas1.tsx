import { Circle } from "@/entities/Circle";
import { GravityBall } from "@/entities/GravityBall";
import { useEffect, useRef } from "react";

const Canvas1 = () => {
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
      circleArr = [];
      init();
    };

    const OnMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };

    addEventListener("mousemove", OnMouseMove);
    addEventListener("resize", OnResize);

    // rest of the items here
    let circleArr: Circle[] = [];
    let gravityBallArr: GravityBall[] = [];
    const init = () => {
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * innerWidth;
        const y = Math.random() * innerHeight;
        const dir = Math.floor(Math.random() * 2) * -2 + 1;
        const dir2 = Math.floor(Math.random() * 2) * -2 + 1;
        circleArr.push(new Circle(x, y, 3 * dir, 3 * dir2, 10));
        gravityBallArr.push(
          new GravityBall({
            x,
            y,
            dx: 3 * dir,
            radius: 10,
            gravity: 0,
          }),
        );
      }
    };

    const animate = () => {
      c.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < circleArr.length; i++) {
        // circleArr[i].update(c, mouse);
        gravityBallArr[i].update(c);
      }
      requestAnimationFrame(animate);
    };
    animate();
    init();
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

export default Canvas1;
