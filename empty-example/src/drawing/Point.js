class Point {
    constructor(angle, speed, distance) {
        this.angle = angle;
        this.speed = speed;
        this.distance = distance;
        this.radius = -1;

        this.x = null;
        this.y = null;

        this.r = null;
        this.g = null;
        this.b = null;

        this.scale = 1000;
    }

    setEllipseRadius() {
        let distance = dist(innerWidth / 2, innerHeight / 2, this.x, this.y);
        let diagonal = Math.sqrt(Math.pow(innerWidth, 2) + Math.pow(innerHeight, 2));
        this.radius = map(distance, 0, diagonal, 20, 5);
    }

    setStrokeSettings(alpha) {
        noStroke();

        this.r = map(this.distance, 0, 2000, 1, 16);
        this.g = map(this.distance, 0, 2000, 187, 234);
        this.b = map(this.distance, 0, 2000, 25, 234);

        fill(this.r, this.g, this.b, alpha);
    }

    drawPoint(zoom) {
        this.setStrokeSettings(100);
        let logScale = log(this.distance);
        console.log(logScale);

        let distance = map(this.distance, 1, 8000, 0.01, 0.59);
        this.x = (innerWidth / 2) + this.scale * (cos(this.angle * Math.PI / 180) * (distance * zoom));
        this.y = (innerHeight / 2) + this.scale * (sin(this.angle * Math.PI / 180) * (distance * zoom));


        this.setEllipseRadius();
        ellipse(this.x, this.y, this.radius);
    }

    connectPoints(point) {
        this.setStrokeSettings(255);
        let distance = dist(this.x, this.y, point.getX(), point.getY());
        if (distance < this.distance * 0.1) {
            strokeWeight(2);
            stroke(this.r, this.g, this.b, 200);
            line(this.x, this.y, point.x, point.y);
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getAngle() {
        return this.angle;
    }

    getDistance() {
        return this.distance;
    }

    getAngle() {
        return this.angle;
    }
}