let handpose;
let detections = [];

let canvas;
let video;

function modelReady() {
    console.log("Model ready!");
    handpose.on("predict", (results) => {
        detections = results;

        // console.log(detections);
    });
}

function setup_hands() {
    video = createCapture(VIDEO);
    video.id("video");
    video.size(width, height);

    const options = {
        flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
        maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
        detectionConfidence: 0.4, // Threshold for discarding a prediction. Defaults to 0.8.
        scoreThreshold: 0.9, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
        iouThreshold: 0.1, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
    };
    video.hide();
    handpose = ml5.handpose(video, options, modelReady);
}

function draw_hands() {
    //In webgl mode, origin of the coordinate setted to centre.
    //So I re-positioned it to top-left.

    if (detections.length > 0) {
        drawLines([0, 5, 9, 13, 17, 0]); //palm
        drawLines([0, 1, 2, 3, 4]); //thumb
        drawLines([5, 6, 7, 8]); //index finger
        drawLines([9, 10, 11, 12]); //middle finger
        drawLines([13, 14, 15, 16]); //ring finger
        drawLines([17, 18, 19, 20]); //pinky

        drawLandmarks([0, 1], 0); //palm base
        drawLandmarks([1, 5], 60); //thumb
        drawLandmarks([5, 9], 120); //index finger
        drawLandmarks([9, 13], 180); //middle finger
        drawLandmarks([13, 17], 240); //ring finger
        drawLandmarks([17, 21], 300); //pinky
    }
}

function drawLandmarks(indexArray, hue) {
    noFill();
    strokeWeight(10);
    stroke(255, 0, 69);
    for (let i = 0; i < detections.length; i++) {
        for (let j = indexArray[0]; j < indexArray[1]; j++) {
            let x = detections[i].landmarks[j][0];
            let y = detections[i].landmarks[j][1];
            if (j == 9) {
                p.x = lerp(p.x, map(x, 0, video.elt.videoWidth, 0, width), 0.1);
                p.y = lerp(p.y, map(y, 0, video.elt.videoHeight, 0, height), 0.1);
            }
            if (!displayhands) return;
            point(
                map(x, 0, video.elt.videoWidth, 0, width),
                map(y, 0, video.elt.videoHeight, 0, height)
            );
        }
    }
}

function drawLines(index) {
    if (!displayhands) return;
    stroke(255);
    strokeWeight(3);
    for (let i = 0; i < detections.length; i++) {
        for (let j = 0; j < index.length - 1; j++) {
            let x = detections[i].landmarks[index[j]][0];
            let y = detections[i].landmarks[index[j]][1];
            let _x = detections[i].landmarks[index[j + 1]][0];
            let _y = detections[i].landmarks[index[j + 1]][1];
            line(
                map(x, 0, video.elt.videoWidth, 0, width),
                map(y, 0, video.elt.videoHeight, 0, height),
                map(_x, 0, video.elt.videoWidth, 0, width),
                map(_y, 0, video.elt.videoHeight, 0, height)
            );
        }
    }
}
