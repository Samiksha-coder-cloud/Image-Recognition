Webcam.set ({
    height:350,
    width:400,
    image_format:"png",
    png_quality:90
});

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_Image' src='" + data_uri + "'>";
    });
}

console.log("ml5 Version- ",ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RaX9ZNzol/model.json",modelLoaded);

function modelLoaded() {
    console.log("model loaded");
}

function identify_snap() {
    image = document.getElementById("captured_Image");
    classifier.classify(image,gotResult);
}

function gotResult(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("object").innerHTML = results[0].label;
        document.getElementById("accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}