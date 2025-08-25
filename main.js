let prediction1 = "";
let prediction2 = "";
let classifier;

Webcan.set({
width: 350,
height: 275,
imageFormat: "png"
});

 Webcan.attach("#camera")

 function takeSnapshot(){
    Webcan.sanp(function (datauri){
        document.getElementById("result").innerHTML = `<img id="capturedImage" src="${datauri}">`;
    })
 }
 console.log('ml5 version:', ml5.version);