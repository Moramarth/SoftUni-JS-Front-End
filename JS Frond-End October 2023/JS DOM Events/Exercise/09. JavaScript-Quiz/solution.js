function solve() {
  let [sectionOne, sectionTwo, sectionThree] = Array.from(document.querySelectorAll("section"));
  let quizzAnswers = Array.from(document.querySelectorAll("li.quiz-answer"));

  let rightAnswers = {
    firstQuestion: "onclick",
    secondQuestion: "JSON.stringify()",
    thirdQuestion: "A programming API for HTML and XML documents",
  }

  let rightAnswersCount = 0;

  for (let answer of quizzAnswers) {
    answer.addEventListener("click", handleClick)
  }

  function handleClick(event) {
    let currentAnswerContainer = event.currentTarget;
    let currentSection = currentAnswerContainer.parentElement.parentElement;

    let answerText = event.target.textContent;

    Object.keys(rightAnswers).forEach(answer => {
      if (rightAnswers[answer] === answerText) rightAnswersCount++;
    })

    if (currentSection === sectionOne) {
      sectionOne.style.display = "none";
      sectionTwo.style.display = "block";

    } else if (currentSection === sectionTwo) {
      sectionTwo.style.display = "none";
      sectionThree.style.display = "block";

    } else if (currentSection === sectionThree) {
      sectionThree.style.display = "none";
      generateResult();
    }

  }

  function generateResult() {
    let outputField = document.querySelector("#results h1")
    let output = ""
    if (rightAnswersCount === 3) output = "You are recognized as top JavaScript fan!";
    else output = `You have ${rightAnswersCount} right answers`;

    outputField.textContent = output;
    document.querySelector("#results").style.display = "block";
  }

}