const quotes = [
  "The quick brown fox jumps over the lazy dog",
  "Typing speed tests are fun to play",
  "JavaScript makes web pages interactive",
  "Practice makes you faster at typing",
  "Frontend and backend make a full stack"
];

let timeLeft = 30;
let timer;
let currentQuote = "";
let typedChars = 0;
let correctChars = 0;

function startGame() {
  // Reset values
  timeLeft = 30;
  typedChars = 0;
  correctChars = 0;
  document.getElementById("wpm").textContent = 0;
  document.getElementById("accuracy").textContent = 100;

  // Pick random quote
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote").textContent = currentQuote;

  // Enable input
  let inputArea = document.getElementById("inputArea");
  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();

  // Start timer
  clearInterval(timer);
  document.getElementById("time").textContent = timeLeft;
  timer = setInterval(updateTimer, 1000);

  // Typing listener
  inputArea.addEventListener("input", checkInput);
}

function checkInput() {
  let input = document.getElementById("inputArea").value;
  typedChars = input.length;

  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentQuote[i]) {
      correct++;
    }
  }
  correctChars = correct;

  // Accuracy
  let accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;
  document.getElementById("accuracy").textContent = accuracy;

  // WPM calculation
  let timeSpent = 30 - timeLeft;
  let wordsTyped = input.trim().split(/\s+/).length;
  let wpm = timeSpent > 0 ? Math.round((wordsTyped / timeSpent) * 60) : 0;
  document.getElementById("wpm").textContent = wpm;
}

function updateTimer() {
  timeLeft--;
  document.getElementById("time").textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    document.getElementById("inputArea").disabled = true;
    document.getElementById("quote").textContent = "⏳ Time's up!";
  }
}
