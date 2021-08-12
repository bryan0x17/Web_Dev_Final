const quizRequest = new XMLHttpRequest();
let quizXML;

// Set start button event listener
document.getElementById('start').addEventListener('click', loadQuiz);

// Displays the quiz and loads the quiz XML
function loadQuiz() {
    document.getElementById('quiz').hidden = false;
    document.getElementById('start').disabled = true;
    document.getElementById('start').className = 'disabledButton';
    quizRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            quizXML = quizRequest.responseXML;
            printQuestions();
        }
    }
    quizRequest.open("GET", 'FinalQuiz.xml', true);
    quizRequest.send();
    document.getElementById('gradeButton').addEventListener('click', gradeQuiz);
}

// Parses the XML and inserts the questions and answer texts on the page
function printQuestions() {
    document.getElementById('question1').textContent = quizXML.getElementsByTagName('qtitle')[0].textContent;
    document.getElementById('q1aText').textContent = quizXML.getElementsByTagName('a')[0].textContent;
    document.getElementById('q1bText').textContent = quizXML.getElementsByTagName('b')[0].textContent;
    document.getElementById('q1cText').textContent = quizXML.getElementsByTagName('c')[0].textContent;
    document.getElementById('q1dText').textContent = quizXML.getElementsByTagName('d')[0].textContent;

    document.getElementById('question2').textContent = quizXML.getElementsByTagName('qtitle')[1].textContent;
    document.getElementById('q2aText').textContent = quizXML.getElementsByTagName('a')[1].textContent;
    document.getElementById('q2bText').textContent = quizXML.getElementsByTagName('b')[1].textContent;
    document.getElementById('q2cText').textContent = quizXML.getElementsByTagName('c')[1].textContent;
    document.getElementById('q2dText').textContent = quizXML.getElementsByTagName('d')[1].textContent;

    document.getElementById('question3').textContent = quizXML.getElementsByTagName('qtitle')[2].textContent;
    document.getElementById('q3aText').textContent = quizXML.getElementsByTagName('a')[2].textContent;
    document.getElementById('q3bText').textContent = quizXML.getElementsByTagName('b')[2].textContent;
    document.getElementById('q3cText').textContent = quizXML.getElementsByTagName('c')[2].textContent;
    document.getElementById('q3dText').textContent = quizXML.getElementsByTagName('d')[2].textContent;

    document.getElementById('question4').textContent = quizXML.getElementsByTagName('qtitle')[3].textContent;
    document.getElementById('q4aText').textContent = quizXML.getElementsByTagName('a')[3].textContent;
    document.getElementById('q4bText').textContent = quizXML.getElementsByTagName('b')[3].textContent;
    document.getElementById('q4cText').textContent = quizXML.getElementsByTagName('c')[3].textContent;
    document.getElementById('q4dText').textContent = quizXML.getElementsByTagName('d')[3].textContent;

    document.getElementById('question5').textContent = quizXML.getElementsByTagName('qtitle')[4].textContent;
    document.getElementById('q5aText').textContent = quizXML.getElementsByTagName('a')[4].textContent;
    document.getElementById('q5bText').textContent = quizXML.getElementsByTagName('b')[4].textContent;
    document.getElementById('q5cText').textContent = quizXML.getElementsByTagName('c')[4].textContent;
    document.getElementById('q5dText').textContent = quizXML.getElementsByTagName('d')[4].textContent;
}

// Grades the quiz and prints the result
function gradeQuiz() {
    let grade = 0;
    let rightAnswers = quizXML.getElementsByTagName('rightanswers')[0].textContent.split(',');
    let numOfQuestions = quizXML.getElementsByTagName('question').length;
    for (let i = 0; i < numOfQuestions; i++) {
        if (document.querySelector(`input[name=q${i+1}]:checked`)) {
            if (document.querySelector(`input[name=q${i+1}]:checked`).id[2] === rightAnswers[i]) {
                grade++;
            }
        }
    }
    document.getElementById('grade').textContent = `Your grade is: ${grade}/${numOfQuestions}`;
}