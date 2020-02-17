// global variable to store Alarm value in Seconds
let count = 0;

// Init SpeechSynth API
const synth = window.speechSynthesis
const rm = new SpeechSynthesisUtterance();
rm.text = `You have an event schedule for this time`;
rm.lang = 'en-US';
rm.rate = 1;
rm.pitch = 1;
// Speak end
rm.onend = e => {
  console.log('Event reminder is Active...');
}


// Event: to get Start Time
document.addEventListener('DOMContentLoaded', () => {
  const startTimes = document.querySelectorAll('.todo-start');
  startTimes.forEach(startTime => {
    let dt_alarm = new Date();
    let todoTime = startTime.getAttribute('value');
    let hours = todoTime[0] + todoTime[1];
    let minutes = todoTime[3] + todoTime[4];
    let a = 0;
    let seconds = '0' + a;
    s_t = hours + ":" + minutes + ":" + seconds;
    console.log(s_t);
    dt_alarm.setHours(hours);
    dt_alarm.setMinutes(minutes);
    dt_alarm.setSeconds(seconds);
    count = dt_alarm.getTime();   
  });
});

 // Refreshes Display Time every millisecond
  setInterval(() => {
    let dt = new Date();
    let d = dt.getDay();
    let dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    let mt = dt.getMonth();
    let mtName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dayOfMt = dt.getDate();
    let s = dt.getSeconds();
    let m = dt.getMinutes();
    let h = dt.getHours();
    if (h === '00') { h = 24 }
    if (m < '10') { m = '0' + m }
    if (s < '10') { s = '0' + s }
    let currentTime = h + ":" + m + ":" + s + " _ " + dayName[d] + ", " + mtName[mt] + "  " + " " + dayOfMt;
    // let c_t = h + ":" + m + ":" + s;
    document.querySelector('#time-zone').textContent = currentTime;

     // Compare current-time with Set-time
    const times = document.querySelectorAll('.todo-start');
    let c_t = new Date();
    times.forEach(time => {
      if ((c_t.getTime() >= count) && (count > 1000)) {
        synth.speak(rm);
        count = 0;
      }
    })
  }, 1000)


