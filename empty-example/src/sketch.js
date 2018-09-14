let points = [];
let index = 0;
let lastAngle = -1;
let laps = 0;

const zoom = 1; //0.5 - 2
const historyTolerance = 3;


function setup() {
  createCanvas(innerWidth, innerHeight);
  loadJSON(`https://api.myjson.com/bins/l15a0`, gotJSON);
  // loadJSON(`https://api.myjson.com/bins/q3qkw`, gotJSON);
}

function gotJSON(data) {
  setInterval(() => {

    if (data[index] && lastAngle !== -1 && data[index].angle < lastAngle) {
      console.log(++laps);

      if (laps === historyTolerance) {
        index = 0;
        points = [];
        lastAngle = -1;
        laps = 0;
      }
    }

    if (data[index] && data[index].distance !== 8190) {
      points.push(
        new Point(
          data[index].angle,
          data[index].speed,
          data[index].distance,
          15
        )
      )

      lastAngle = data[index].angle;
    }
    index++;
  }, 100);
}

function showInfo(point) {
  let scaling = map(zoom, 0.2, 2, 0.15, 0.05);

  let x = (innerWidth / 2) + (point.distance * scaling) * zoom * (cos(point.getAngle() * Math.PI / 180) * 2);
  let y = (innerHeight / 2) + (point.distance * scaling) * zoom * (sin(point.getAngle() * Math.PI / 180) * 2);

  textSize(20);
  text((point.distance * 0.001).toFixed(2) + " m", x, y);
  stroke(0, 20);
  strokeWeight(0.5);
  line(point.getX(), point.getY(), x, y);

  let rad = (point.angle * PI) / 180;
  fill(200, 7);
  noStroke()
  arc(innerWidth / 2, innerHeight / 2, 35, 35, 0, rad);

}

function draw() {
  background(245);

  fill(0, 25);
  rect(innerWidth * 0.01, innerHeight * 0.9, map(lastAngle, -1, 360, 0, 50), 50);

  for (let i = 0; i < points.length - 1; i++) {
    if (i != 0) {
      points[i].connectPoints(points[i - 1]);
    }
    points[i].drawPoint(zoom);
    showInfo(points[i]);
  }
}