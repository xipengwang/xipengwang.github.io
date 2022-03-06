var TOMATO_TIMER_SECONDS = 25 * 60;
var TIMER_COUNT_SECONDS = TOMATO_TIMER_SECONDS;
var myTimer = null;

document.addEventListener('DOMContentLoaded', function () {
  console.log('Document is ready. Ask for notification approval!');
  document.getElementById('show_timer').innerHTML =
    timerStringFromCount(TIMER_COUNT_SECONDS);
  askForApproval();
});

function changeTimer() {
  const timer_list = document.getElementById('timer_list');
  const preset_timers = [25 * 60, 45 * 60, 60, 10 * 60];
  TOMATO_TIMER_SECONDS = preset_timers[timer_list.selectedIndex];
  resetState();
}
function askForApproval() {
  if (Notification.permission === 'granted') {
    console.log('Approval is already granted.');
  } else {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Approval asked and granted');
      } else {
        console.log('Denied');
      }
    });
  }
}

function startTimer() {
  const timer_state = document.getElementById('start_timer').innerText;
  if (timer_state == 'Start') {
    document.getElementById('start_timer').innerText = 'Pause';
  } else {
    document.getElementById('start_timer').innerText = 'Start';
  }
  if (myTimer === null) {
    myTimer = setInterval(() => {
      TIMER_COUNT_SECONDS -= 1;
      if (TIMER_COUNT_SECONDS == 0) {
        resetState();
        if (Notification.permission === 'granted') {
          new Notification('Time is up!');
          console.log('New notification.');
        }
      }
      document.getElementById('show_timer').innerHTML =
        timerStringFromCount(TIMER_COUNT_SECONDS);
    }, 1000);
  } else {
    pauseState();
  }
}

function clearTimer() {
  resetState();
}

function pauseState() {
  clearInterval(myTimer);
  myTimer = null;
  document.getElementById('show_timer').innerHTML =
    timerStringFromCount(TIMER_COUNT_SECONDS);
}

function resetState() {
  document.getElementById('start_timer').innerText = 'Start';
  if (myTimer != null) {
    clearInterval(myTimer);
    myTimer = null;
  }
  TIMER_COUNT_SECONDS = TOMATO_TIMER_SECONDS;
  document.getElementById('show_timer').innerHTML =
    timerStringFromCount(TIMER_COUNT_SECONDS);
}

function timerStringFromCount(count) {
  const minutes = Math.floor(count / 60);
  const seconds = count % 60;
  ret_string = '';
  if (minutes < 10) {
    ret_string += `0${minutes}:`;
  } else {
    ret_string += `${minutes}:`;
  }
  if (seconds < 10) {
    ret_string += `0${seconds}`;
  } else {
    ret_string += `${seconds}`;
  }
  return ret_string;
}
