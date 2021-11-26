Song = "";
leftWristx = "";
leftWristy = "";
rightWristx = "";
rightWristy = "";
ScoreLeftWrist = 0;
ScoreRightWrist = 0;

function setup()
{
    canvas = createCanvas(750,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video , modelLoaded);
    posenet.on("pose",gotPoses);
}

function gotPoses(result)
{
    if(result.length > 0)
    {
        ScoreLeftWrist = result[0].pose.keypoints[9].score;
        ScoreRightWrist = result[0].pose.keypoints[10].score;
        console.log(ScoreLeftWrist+"  "+ScoreRightWrist);

        console.log(result);
        leftWristx = result[0].pose.leftWrist.x;
        leftWristy = result[0].pose.leftWrist.y;
        console.log(leftWristx+"  "+leftWristy);

        rightWristx = result[0].pose.rightWrist.x;
        rightWristy = result[0].pose.rightWrist.y;
        console.log(rightWristx+"  "+rightWristy);
    }
}

function modelLoaded()
{
    console.log("Pose Initialized");
}

function preload()
{
   Song = loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,750,600);

    if(ScoreLeftWrist > 0.2)
    {
        circle(leftWristy,rightWristy,30);
        leftWristyinNumber = Number (leftWristy);
        removeDecimal = floor(leftWristyinNumber);
        Volume = removedecimal/600;
        Song.setVolume(Volume);
        document.getElementById("Thebest").innerHTML = "Volume:" + Volume;
    }

}

function play()
{
    Song.play();
    Song.setVolume(1);
    Song.rate(1);
}