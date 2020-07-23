const countDown = 5
let n = 0;
let maxRetry = 5;
let initialTimer = countDown;
let timeInterval = null;
let countDownParaRef = null;
let btnRef = null;

const resetRetryMessage = () => {
  countDownParaRef.innerHTML = "";
};

const resetTimerValues = () => {
  clearInterval(timeInterval);
  n = 0;
  timeInterval = null;
  resetRetryMessage();
};

const pseudoApiStub = () => {
  n = n + 1;
  return Math.random() > 0.5
};

const changeBTNValue = (value) => {
  btnRef.innerHTML = value;
};

const changeBTNState = (value) => {
  btnRef.disabled = value;
};

const startTimer = () => { 
  initialTimer = initialTimer 
    ? initialTimer
    : countDown**n;
  countDownParaRef.innerHTML = `Retrying in: ${initialTimer}`;
  initialTimer--;
  if (initialTimer === 0) {
    clearInterval(timeInterval);
    onClickBTN();
  }
}

const handleNegativeResponse = () => {
  if (maxRetry >= n) {
    timeInterval = setInterval(() => {
      startTimer();
    }, 1000);
  }else {
    resetTimerValues();
    changeBTNValue("Restart");
    changeBTNState(false);
  }
};

const onClickBTN = () => {
  changeBTNValue("Loading...");
  changeBTNState(true);
  const response = pseudoApiStub();
  if(response) {
    changeBTNValue("Finish");
    changeBTNState(false);
    resetTimerValues();
  } else handleNegativeResponse();
};

document.addEventListener('DOMContentLoaded', () => {
  btnRef = document.getElementById("btn");
  countDownParaRef = document.getElementById("count-down");
  btnRef.addEventListener("click", onClickBTN);
});
