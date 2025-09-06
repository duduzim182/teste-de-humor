let prediction1 = "";
let prediction2 = "";
let classifier;

Webcam.set({
width: 350,
height: 275,
imageFormat: "png"
});

 Webcam.attach("#camera")

 function takeSnapshot(){
    Webcan.snap(function (datauri){
        document.getElementById("result").innerHTML = `<img id="capturedImage" src="${datauri}">`;
    })
 }
 console.log('ml5 version:', ml5.version);
 ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/hROEnpJCB/model.json")
 .then(model => {
    classifier = model;
    console.log('Model Loaded')
 })
 .catch(err => console.error('erro ao carregar o modelo:' , err));

 function speak (){
    let synth = window.speechSynthesis;
    let speakData1 = "A primeira previsao e " + prediction1;
    let speakData2 = "A segunda previsao e " + prediction2;
    let utterThis = new SpeechSynthesisUtterance( speakData1 + speakData2)
    synth.speak(utterThis);
 }
 function check (){
   let img = document.getElementById('capturedImage')
   if(!classifier){
      console.error("o modelo aina nao foi carregado")
      return
   }
   classifier.classify(img)
   .then(results => {
      console.log(results)
      document.getElementById("resultEmotionName").innerHTML = results[0].label
      document.getElementById("resultEmotionName2").innerHTML = results[1].label
      prediction1 = results[0].label
      prediction2 = results[1].label
      speak();
      if (results[0].label === "feliz"){
         document.getElementById('updateEmoji').innerHTML = "&#128522;"
      }
      if (results[0].label === "triste"){
         document.getElementById('updateEmoji').innerHTML = "&#128532;"
      }
      if (results[0].label === "irritado"){
         document.getElementById('updateEmoji').innerHTML = "&#128548;"
      }
       if (results[1].label === "feliz"){
         document.getElementById('updateEmoji2').innerHTML = "&#128522;"
      }
      if (results[1].label === "triste"){
         document.getElementById('updateEmoji2').innerHTML = "&#128532;"
      }
      if (results[1].label === "irritado"){
         document.getElementById('updateEmoji2').innerHTML = "&#128548;"
      }
   })
    .catch(err => console.error(err));
 }

