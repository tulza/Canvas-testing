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
  velocity: { x: number; y: number };
  mass: number;

  static ACCEL = 0.2;
  static FRICTION = 1;

  constructor(props: CollisionBallProps) {
    this.x = props.x;
    this.y = props.y;
    this.radius = props.radius;
    this.velocity = { x: props.dx, y: props.dy };
    this.mass = 1;
  }

  draw(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = "#f00";
    c.stroke();
    c.fillStyle = "#fff";
    c.fill();
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    this.move();
  }

  move() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (
      (this.x + this.radius >= innerWidth && this.velocity.x > 0) ||
      (this.x - this.radius <= 0 && this.velocity.x < 0)
    ) {
      this.velocity.x = -this.velocity.x;
    }
    if (
      (this.y + this.radius >= innerHeight && this.velocity.y > 0) ||
      (this.y - this.radius <= 0 && this.velocity.y < 0)
    ) {
      this.velocity.y = -this.velocity.y;
    }
  }
}
