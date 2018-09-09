'use strict';


function drawLine(ctx, line) {
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
}

function drawSensor(ctx, sensor) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(sensor.position.x, sensor.position.y, 3, 0, 2 * Math.PI, 0);
    ctx.closePath();
    if (sensor.hit) {
        ctx.fillStyle = "red";
    }
    ctx.fill();

    if (sensor.direction) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(sensor.position.x, sensor.position.y);
        let scaledDir;
        scaledDir = sensor.direction.multiply(sensor.length);
        if (sensor.hit) {
            scaledDir = sensor.direction.multiply(sensor.hitDistance);
        }
        let lineTo = new Vector(sensor.position.x, sensor.position.y).add(scaledDir);
        ctx.lineTo(lineTo.x, lineTo.y);
        ctx.stroke();
    }
}

function showGrid(ctx) {
  var checkBox = document.getElementById("checkbox");
  if (checkBox.checked == true) {
    for(var i=10; i<980; i+=97) {
        for(var j=10; j<667; j+=67) {
            ctx.strokeRect(i, j, 97, 67);
        }
    }
  }
}

function draw(ctx) {
    ctx.clearRect(0, 0, 1000, 1000);

    for (let i = 0; i < world.geneticModel.populationSize; i++) {
        let tank = world.tanks[i];
        ctx.save();

        ctx.translate(tank.position.x + tank.width/2, tank.position.y +tank.height / 2);
        ctx.rotate(tank.rotation);
        ctx.translate(-tank.position.x - tank.width/2, -tank.position.y - tank.height / 2);

        ctx.beginPath();
        ctx.fillStyle = "black";

        if (tank.stopped) {
            ctx.fillStyle = "red";
        }

        ctx.fillRect(tank.position.x, tank.position.y, tank.width, tank.height);

        ctx.restore();

        if (!tank.stopped) {
            drawSensor(ctx, tank.sensors.frontLeft);
            drawSensor(ctx, tank.sensors.frontRight);
            drawSensor(ctx, tank.sensors.leftSide);
            drawSensor(ctx, tank.sensors.rightSide);
        }
    }

    ctx.beginPath();
    ctx.strokeStyle = "gray";
    showGrid(ctx);


    ctx.beginPath();
    ctx.strokeStyle="blue";
    if (world.points.length > 0) {
        ctx.moveTo(world.points[0].x, world.points[0].y);
        for (var i = 1; i < world.points.length; i++) {
            ctx.lineTo(world.points[i].x, world.points[i].y);
        }
        // ctx.closePath();
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle="black";
    for (let k = 0; k < world.polygons.length; k++) {
        let polygon = world.polygons[k];
        ctx.moveTo(polygon[0].x, polygon[0].y);
        for (var i = 1; i < polygon.length; i++) {
            ctx.lineTo(polygon[i].x, polygon[i].y);
        }
        // ctx.closePath();
        ctx.stroke();
    }
}
