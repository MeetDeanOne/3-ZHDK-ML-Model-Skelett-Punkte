let video;
let poseNet;
let pose;
let skeleton;
//neu Augen
/*let eyelX = 0;
let eyelY = 0;
let eyerX = 0;
let eyerY = 0;*/

let eye1X, eye1Y, eye2X, eye2Y;

let label = "Machine Learning";



function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);

  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded); 
  poseNet.on("pose", gotPoses);

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
}

function gotPoses(poses) {
	console.log(poses);
	if (poses.length > 0) {
		/*//Augen
		let elX = poses[0].pose.keypoints[0].position.x;
		let elY = poses[0].pose.keypoints[0].position.y;

		eyelX = lerp(eyelX, elX, 0.5);
		eyelY = lerp(eyelY, elY, 0.5);

		let erX = poses[0].pose.keypoints[1].position.x;
		let erY = poses[0].pose.keypoints[1].position.y;

		eyerX = lerp(eyelX, erX, 0.5);
		eyerX = lerp(eyelX, erY, 0.5);*/

		noseX = poses[0].pose.keypoints[0].position.x;
		noseY = poses[0].pose.keypoints[0].position.y;

		eye1X = poses[0].pose.keypoints[1].position.x;
		eye1Y = poses[0].pose.keypoints[1].position.y;
		
		eye2X = poses[0].pose.keypoints[2].position.x;
		eye2Y = poses[0].pose.keypoints[2].position.y;

		
		pose = poses[0].pose;
		skeleton = poses[0].skeleton;
	}
}

function modelLoaded() {
	console.log("poseNet ready");
}

function draw() {
	image(video, 0, 0);
	filter(GRAY);

	eye(eye1X, eye1Y, 50, 1);
	eye(eye2X, eye2Y, 50, -1);

	//Augen zeichnen
	fill(208, 141, 50)
	ellipse(eye1X, eye1Y, 40);
	ellipse(eye2X, eye2Y, 40);
	let d = dist(eye2X, eye2Y, eye2X, eye2Y)

	if (pose) {
		//hier sind die Augen geparkt und mit Distanz lass' ich das, 
		//dass Programm machen, dann kann ich d für die anderen Parameter wie die Nase nehmen.
		//let augeR = pose.rightEye;
		//let augeL = pose.leftEye;
		//let d = dist(augeR.x, augeR.y, augeL.x, augeL.y)

		//Nase
		fill(213, 75, 69);
		ellipse(noseX, noseY, 30);

		//Handgelenke
		fill(116, 179, 224);
		ellipse(pose.rightWrist.x, pose.rightWrist.y, 30);
		ellipse(pose.leftWrist.x, pose.leftWrist.y, 30)

		//Skelett: alle 17 Punkte erkennen lassen 
		for (let i = 0; i < pose.keypoints.length; i++) {
		//von allen Punkten die x und y Achse bekommen
			let x = pose.keypoints[i].position.x;
			let y = pose.keypoints[i].position.y;
			fill(192, 162, 204);
			ellipse(x, y, 10, 10);
		}

		//einen Loop über das Skelett machen und mit Strichen verbinden
		for (let i = 0; i < skeleton.length; i++) {
			let a = skeleton[i][0];
			let b = skeleton[i][1];

			strokeWeight(1);
			stroke(0);
			line(a.position.x, a.position.y, b.position.x, b.position.y);
			
		}	
	}
	//Text
	fill(192, 162, 204);
	noStroke();
	text(label, width/2, height - 450);
}

function eye(x, y, size, n) {
	let angle = frameCount * 0.5;
	
	noFill();
	strokeWeight(2);
	stroke(255);
	ellipse(x, y, size/2, size/2);
	
	noFill();
	strokeWeight(2);
	stroke(255);
	ellipse(x + cos(angle * n) * size/3, y + sin(angle * n) * size/3, size/2, size/2);
}

