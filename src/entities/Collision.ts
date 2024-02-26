interface CollisionBallProps {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
}

export class CollisionBall {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;

  static ACCEL = 0.2;
  static FRICTION = 1;

  constructor(props: CollisionBallProps) {
    this.x = props.x;
    this.y = props.y;
    this.radius = props.radius;
    this.dx = props.dx;
    this.dy = props.dx;
  }

  draw(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = "#f00";
    c.stroke();
    c.fillStyle = "#0005";
    c.fill();
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    this.move();
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    if (
      (this.x + this.radius >= innerWidth && this.dx > 0) ||
      (this.x - this.radius <= 0 && this.dx < 0)
    ) {
      this.dx = -this.dx;
    }
    if (
      (this.y + this.radius >= innerHeight && this.dy > 0) ||
      (this.y - this.radius <= 0 && this.dy < 0)
    ) {
      this.dy = -this.dy;
    }
  }
}
