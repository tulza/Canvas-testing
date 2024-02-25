interface GravityBallProps {
  x: number;
  y: number;
  dx: number;
  radius: number;
  gravity: number;
}

export class GravityBall {
  x: number;
  y: number;
  dx: number;
  radius: number;
  gravity: number;
  fallSpeed: number;

  static ACCEL = 1;
  static FRICTION = 0.9;

  constructor(props: GravityBallProps) {
    this.x = props.x;
    this.y = props.y;
    this.radius = props.radius;
    this.gravity = props.gravity;
    this.dx = props.dx;
    this.fallSpeed = 0;
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
    this.simulateGravity();
  }

  simulateGravity() {
    if (this.bounce()) return;
    this.y += this.fallSpeed;
    this.fallSpeed += GravityBall.ACCEL;
  }

  bounce() {
    if (this.y + this.radius >= window.innerHeight && this.fallSpeed > 0) {
      this.fallSpeed = -this.fallSpeed * GravityBall.FRICTION;
      return true;
      //   console.log(this.fallSpeed);
    }
    return false;
  }

  move() {
    this.x += this.dx;
    if (
      (this.x + this.radius >= innerWidth && this.dx > 0) ||
      (this.x - this.radius <= 0 && this.dx < 0)
    ) {
      this.dx = -this.dx;
    }
  }
}
