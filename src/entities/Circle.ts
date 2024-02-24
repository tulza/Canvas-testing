export class Circle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  radius: number;
  MouseIn: number;
  color: { r: number; g: number; b: number };

  constructor(x: number, y: number, dx: number, dy: number, radius: number) {
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
    this.MouseIn = 200;
  }

  draw(c: CanvasRenderingContext2D) {
    this.drawOutline(c);
    this.drawInteractOutline(c);
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = `rgb(${this.color.r},${this.color.r},${this.color.r})`;
    c.stroke();
    c.fillStyle = `rgba(${this.color.r},${this.color.r},${this.color.r},0.4)`;
    c.fill();
  }

  interactivity(mouse: { x: undefined | number; y: undefined | number }) {
    if (!mouse.x || !mouse.y) return;
    if (
      this.x - mouse.x < this.MouseIn &&
      this.x - mouse.x > -this.MouseIn &&
      this.y - mouse.y < this.MouseIn &&
      this.y - mouse.y > -this.MouseIn
    ) {
      this.radius += 1;
    }
  }

  update(
    c: CanvasRenderingContext2D,
    mouse: { x: undefined | number; y: undefined | number },
  ) {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.interactivity(mouse);
    this.draw(c);
  }

  drawOutline(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.fillRect(
      this.x - this.radius,
      this.y - this.radius,
      this.radius * 2,
      this.radius * 2,
    );
  }

  drawInteractOutline(c: CanvasRenderingContext2D) {
    c.beginPath();
    c.strokeStyle = "#fff0";
    c.lineWidth = 1;
    c.fillRect(
      this.x - this.MouseIn,
      this.y - this.MouseIn,
      this.MouseIn * 2,
      this.MouseIn * 2,
    );
  }
}
