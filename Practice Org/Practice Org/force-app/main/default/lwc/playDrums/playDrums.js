import { LightningElement } from 'lwc';
const SOUNDS = [
    { key: "74", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/snare.wav"},
    { key: "66", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav" },
    { key: "86", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/kick.wav" },
    { key: "72", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-high.wav" },
    { key: "71", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-mid.wav" },
    { key: "70", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/tom-low.wav" },
    { key: "69", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/crash.wav" },
    { key: "82", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/ride.wav" },
    { key: "73", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-open.wav" },
    { key: "75", url:"https://raw.githubusercontent.com/ArunMichaelDsouza/javascript-30-course/master/src/01-javascript-drum-kit/sounds/hihat-close.wav" }
  ]
const SOUND_KEYS = [{ "code": "E", "sound": "Crash" }, { "code": "R", "sound": "Ride" }, { "code": "F", "sound": "Floor tom" }, { "code": "G", "sound": "Mid tom" }, { "code": "H", "sound": "High tom" }, { "code": "V", "sound": "B" }, { "code": "J", "sound": "Snare" }, { "code": "I", "sound": "Hi-Hat Open" }, { "code": "K", "sound": "Hi-Hat Closed" }]
const DRUM_KEYS =
  [{ "key": "74", "class": "key snare", "kbd": "J" }, { "key": "66", "class": "key kick", "kbd": "B" }, { "key": "86", "class": "key kick2", "kbd": "V" }, { "key": "72", "class": "key tom-high", "kbd": "H" }, { "key": "71", "class": "key tom-mid", "kbd": "G" }, { "key": "70", "class": "key tom-low", "kbd": "F" }, { "key": "69", "class": "key crash", "kbd": "E" }, { "key": "82", "class": "key ride", "kbd": "R" }, { "key": "73", "class": "key hihat-open", "kbd": "I" }, { "key": "75", "class": "key hihat-close", "kbd": "K" }]

export default class PlayDrums extends LightningElement {
    playingClass = 'playing';
        SOUND_KEYS= SOUND_KEYS
        DRUM_KEYS = DRUM_KEYS
        SOUNDS = SOUNDS
    connectedCallback(){
         window.addEventListener('keydown', this.playSound);
    }


 playSound = e => {
  const keyCode = e.keyCode;
   console.log('keycode',keyCode);
  var keyElement = this.template.querySelector(`div[data-key="${keyCode}"]`);
  console.log('keyElement',keyElement);
  const audioElement = this.template.querySelector(`audio[data-key="${keyCode}"]`);

   audioElement.currentTime = 0;
  audioElement.play();

  switch(keyCode) {
    case 69:
    case 82:
      this.animateCrashOrRide();
      break;
    case 73:
    case 75:
      this.animateHiHatClosed();
      break;
  }

  keyElement.classList.add(this.playingClass);
};
animateCrashOrRide()  {
  console.log('inside animatedcrash ride');  
   this.template.querySelector('.crash-ride').style.transform = "rotate(0deg) scale(1.5)";

};

animateHiHatClosed() {
 console.log('inside animateHiHatClosed');
 this.template.querySelector('.hihat-top').style.top = "171px";
 //hiHatTop.style.top = '171px';
};

 removeCrashRideTransition = e =>  {
  console.log('inside removeCrashRideTransition');

  if(e.propertyName !== 'transform') return;

  e.target.style.transform = 'rotate(-7.2deg) scale(1.5)';
};

 removeHiHatTopTransition = e => {
  console.log('inside removeHiHatTopTransition');
  if(e.propertyName !== 'top') return;

  e.target.style.top = '166px';
};  

 removeKeyTransition = e => {
  console.log('inside removeKeyTransition');

  if(e.propertyName !== 'transform') return;

e.target.classList.remove(this.playingClass);
};


}