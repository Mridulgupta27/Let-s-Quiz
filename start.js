document.addEventListener("DOMContentLoaded", function () {
  var name = localStorage.getItem("name");
  if (name) {
    document.getElementById("displayName").innerText = "Hello, " + name + "!";
    console.log(name);
  } else {
    document.getElementById("displayName").innerText = "No name provided.";
  }
});
// script.js
// script.js

// API endpoint URL
const apiUrl =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

// Fetch data from the API
let questions; // Define questions variable in global scope
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    questions = data.results; // Assign value to questions variable
    displayQuestion(questions[0]);
  })
  .catch((error) => console.error("Error fetching data:", error));

console.log(questions);

let currentQuestionIndex = 0;
let timer;

let timeLeft = 30;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval); // Clear any existing timer interval
  timeLeft = 30; // Reset the time left to 30 seconds
  timerInterval = setInterval(() => {
    timeLeft--;
    const timeElement = document.querySelector(".time h3");
    timeElement.textContent = `00:${timeLeft.toString().padStart(2, "0")}`;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      // Time's up! You can add additional logic here, such as submitting the answer or moving to the next question
    }
  }, 1000);
}
// Function to display a question
function displayQuestion(question) {
  const questionText = document.getElementById("question");
  const optionsList = document.getElementById("options");
  const progressElement = document.getElementById("progress");
  const nextButton = document.getElementById("next-btn");
  const submitButton = document.getElementById("submit-btn");

  questionText.textContent = question.question;

  // Display options
  const options = question.incorrect_answers.concat(question.correct_answer);
  optionsList.innerHTML = ""; // Clear the options list
  for (let i = 0; i < options.length; i++) {
    const optionElement = document.createElement("li");
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "option";
    radioInput.id = `option-${i}`;
    optionElement.appendChild(radioInput);
    optionElement.appendChild(document.createTextNode(options[i]));
    optionsList.appendChild(optionElement);
  }

  startTimer();

  progressElement.textContent = `${currentQuestionIndex + 1} / ${
    questions.length
  }`;
  // Show/hide next and submit buttons
  if (currentQuestionIndex === 9) {
    nextButton.style.display = "none";
    submitButton.style.display = "block";
  } else {
    nextButton.style.display = "block";
    submitButton.style.display = "none";
  }

  // Start timer
  timer = setTimeout(nextQuestion, 30000);
}

// Function to go to the next question
function nextQuestion() {
  clearTimeout(timer);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    // Use questions.length here
    displayQuestion(questions[currentQuestionIndex]);
  } else {
    // Display final score or end of quiz message
    document.getElementById("result").textContent = "Quiz completed!";
  }
}

// Add event listeners
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
  document.getElementById("submit-btn").addEventListener("click", () => {
    // Calculate final score and display result
    const score = calculateScore();
    document.getElementById(
      "result"
    ).textContent = `Final Score: ${score} / 10`;
  });
});

function calculateScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const userAnswer = getSelectedOption(i);
    if (userAnswer === questions[i].correct_answer) {
      score++;
    }
  }
  return score;
}

function getSelectedOption(questionIndex) {
  const options = document.getElementsByName("option");
  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      return options[i].nextSibling.textContent;
    }
  }
  return null;
}
