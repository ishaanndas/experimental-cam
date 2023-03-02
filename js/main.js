// Global Variables
let width = 500;
let height = 0;
filter = 'none';
streaming = false;

//DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('snap');
const clearButton = document.getElementById('clear');
const photoFilter = document.getElementById('filter');

//Get Media Stream from webcam and put into the video element
navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(function(stream) {
        //Link to video source
        video.srcObject = stream;
        //Play Video
        video.play();
    })
    .catch(function(err) {
        console.log(`Error: ${err}`);
    });

//Play when ready
video.addEventListener('canplay', function(e) {
    if(!streaming) {
        //Video Canvas Height
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;

    }
}, false);

photoButton.addEventListener('click', function(e) {
    takePhoto();

    e.preventDefault();
}, false);

//filter
photoFilter.addEventListener('change', function(e) {

    // set filter to selected option
    filter = e.target.value;

    //apply filter to video
    video.style.filter = filter;
    e.preventDefault();
})

function takePhoto() {
    // console.log('pic');
    const context = canvas.getContext('2d');
    if(width && height) {
        canvas.width = width;
        canvas.height = height;
    // Put photo on the canvas when button is clicked
    context.drawImage(video, 0, 0, width, height);
    //creat image from the canvas
    const imgUrl = canvas.toDataURL('image/png');
    // console.log(imgUrl);
    const img = document.createElement('img');

    //set image source
    img.setAttribute('src', imgUrl);

    //set the image filter
    img.style.filter = filter;

    //add image 
    photos.appendChild(img)


    }
}