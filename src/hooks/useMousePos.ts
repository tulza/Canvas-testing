import { useEffect, useState } from "react";

export const useMousePos = () => {
  const [Mouse, setMouse] = useState<{
    x: number | undefined;
    y: number | undefined;
  }>({
    x: undefined,
    y: undefined,
  });
  useEffect(() => {
    const OnMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.x, y: e.y });
    };
    addEventListener("mousemove", OnMouseMove);

    return () => {
      removeEventListener("mousemove", OnMouseMove);
    };
  }, []);
  return { Mouse };
};
