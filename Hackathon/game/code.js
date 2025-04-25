 // Define questions array
 const questions = [
    {
        question: "What should you do with an old smartphone?",
        choices: [
            { text: "Recycle it through a certified e-waste program", impact: 1, explanation: "Recycling through certified e-waste programs ensures that harmful materials are safely disposed of and valuable parts are reused." },
            { text: "Throw it in the trash", impact: -1, explanation: "Throwing electronics in the trash leads to harmful chemicals being released into the environment." },
            { text: "Keep it as a backup device", impact: 0, explanation: "Keeping it as a backup device is neutral but doesn't address the environmental issues of old devices." }
        ]
    },
    {
        question: "How can you reduce energy usage when gaming?",
        choices: [
            { text: "Enable power-saving mode", impact: 1, explanation: "Power-saving modes help reduce energy consumption by adjusting performance settings while gaming." },
            { text: "Leave the game running when not in use", impact: -1, explanation: "Leaving the game running consumes unnecessary power and increases energy usage." },
            { text: "Mute the sound", impact: 0, explanation: "Muting sound does not significantly affect energy usage." }
        ]
    },
    {
        question: "Which internet search engine is more eco-friendly?",
        choices: [
            { text: "An engine that offsets its carbon emissions", impact: 1, explanation: "Choosing a search engine that offsets its carbon emissions helps reduce the environmental impact of online activities." },
            { text: "The most popular engine, regardless of carbon impact", impact: -1, explanation: "Choosing based solely on popularity without considering environmental impact leads to greater carbon emissions." }
        ]
    },
    {
        question: "How can you reduce the environmental impact of data storage?",
        choices: [
            { text: "Use cloud services with renewable energy sources", impact: 1, explanation: "Cloud services powered by renewable energy significantly reduce the carbon footprint of data storage." },
            { text: "Store data on personal hard drives", impact: 0, explanation: "Personal hard drives are neutral but may use more energy if left running constantly." },
            { text: "Keep unused data indefinitely", impact: -1, explanation: "Keeping unnecessary data wastes storage resources and energy." }
        ]
    },
    {
        question: "What’s the best way to handle an old laptop?",
        choices: [
            { text: "Donate or recycle it", impact: 1, explanation: "Donating or recycling laptops ensures they are either reused or properly disposed of, reducing e-waste." },
            { text: "Store it in your closet forever", impact: -1, explanation: "Storing old devices indefinitely adds to e-waste and prevents the reuse of valuable components." },
            { text: "Take it apart for fun", impact: 0, explanation: "While disassembling may be educational, it does not contribute to sustainability efforts." }
        ]
    },
    {
        question: "What can you do to lower your PC's energy consumption?",
        choices: [
            { text: "Activate sleep mode when not in use", impact: 1, explanation: "Sleep mode significantly reduces energy usage by lowering the power draw during inactivity." },
            { text: "Leave it running all day", impact: -1, explanation: "Leaving your PC on all day wastes energy and increases electricity costs." },
            { text: "Turn off the monitor only", impact: 0, explanation: "Turning off the monitor saves some energy, but not as much as putting the entire PC in sleep mode." }
        ]
    },
    {
        question: "What is the best way to charge your devices?",
        choices: [
            { text: "Unplug once fully charged", impact: 1, explanation: "Unplugging your devices when fully charged prevents overcharging and reduces energy waste." },
            { text: "Keep them plugged in overnight", impact: -1, explanation: "Overcharging wastes energy and may shorten the lifespan of your devices' batteries." }
        ]
    },
    // Add more questions in this format
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let lastAnswerImpact = 0;
let smileySrc = './assets/neutral_smiley.svg';

// Function to shuffle and select random questions
function selectRandomQuestions() {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10); // Select 10 random questions
}

// Function to display a question
function displayQuestion() {
    const questionData = selectedQuestions[currentQuestionIndex];
    document.getElementById('question-container').textContent = questionData.question;

    // Display choices
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = ''; // Clear previous choices
    questionData.choices.forEach((choice) => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        // button.onclick = () => handleAnswer(choice);
        button.onclick = () => handleAnswer(choice, button);
        choicesContainer.appendChild(button);
    });

    // Hide next button until an answer is selected
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('explanation').textContent = ''; // Clear the explanation from previous question
}

// Function to update score display
function updateScoreDisplay() {
    document.getElementById('score-display').textContent = "Score: " + score;
    clearAllSmileys();
    chooseSmileySrc();
    moveSmiley();
}

function clearAllSmileys() {
// Loop through all divs with IDs from -10 to 10 to replace with empty bubble image
    for (let i = -10; i <= 10; i++) {
        let div = document.getElementById(i.toString());
        if (div) {
            div.innerHTML = ''; // Clear any existing content
            
            // Create and insert the empty bubble image
            let emptyBubble = document.createElement('img');
            emptyBubble.src = './assets/neutral_rond.svg'; // Add the path to the empty bubble image
            emptyBubble.alt = 'Empty Bubble';

            div.appendChild(emptyBubble);
        }
    }
}   

function chooseSmileySrc() {
    if (lastAnswerImpact == 0) {
        smileySrc = './assets/neutral_smiley.svg';
    } else if (lastAnswerImpact == -1) {
        smileySrc = './assets/bad_smiley.svg';
    } else if (lastAnswerImpact == 1) {
        smileySrc = './assets/good_smiley.svg';
    }
}

function moveSmiley() {
    // Convert score to string to use it in selecting the corresponding div
    let divId = score.toString();
    let targetDiv = document.getElementById(divId);
    
    if (targetDiv) {
    // Remove the empty Bubble at the target div in order to place the smiley
    targetDiv.innerHTML = '';
    
    // Insert the smiley image in the target div
    let smiley = document.createElement('img');
    //***will have to build a function to determine WHICH smiley image to place
    //and call it here, incrusting the image path in the code underneath
    //for now though we'll use the same smiley to test at first.
    smiley.src = smileySrc; // Add the path to the smiley image
    smiley.alt = 'Smiley';

    targetDiv.appendChild(smiley);
    } else {
    console.error("No div found with id:", divId);
    }

}

// Function to handle the selected answer
// function handleAnswer(selectedChoice) {
function handleAnswer(selectedChoice, clickedButton){
    lastAnswerImpact = selectedChoice.impact;
    score += selectedChoice.impact;  // Update score based on answer impact
    updateScoreDisplay();  // Show updated score

    //disable all choice buttons after selecting an answer
    const buttons = document.querySelectorAll('#choices-container button');
    buttons.forEach(button => {
        button.disabled = true;  // Disable all buttons
    });


    // Show the correct answer's explanation
    document.getElementById('explanation').textContent = selectedChoice.explanation;

    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        document.getElementById('next-btn').style.display = 'block';
    } else {
        // After the 10th question, show the "See your final score" button
        document.getElementById('final-score-btn').style.display = 'block';
    }
}

// Function to show the final score
function showFinalScore() {
    document.getElementById('result').style.display = 'block';
    document.getElementById('final-score').textContent = score;
}

// Event listener for "Next" button
document.getElementById('next-btn').addEventListener('click', () => {
    displayQuestion();
});

// Event listener for "See your final score" button
document.getElementById('final-score-btn').addEventListener('click', () => {
    showFinalScore();
});

// Start the game
selectedQuestions = selectRandomQuestions();
displayQuestion();
updateScoreDisplay();
