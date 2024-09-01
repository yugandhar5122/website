import { knowledgeBase } from './knowledgeBase.js'; // Adjust path if necessary

function normalizeText(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
}

function findBestMatch(userQuestion) {
    if (!userQuestion || typeof userQuestion !== 'string') {
        return "reach out as to know more information by calling xxxxxxxx45 thank you";
    }

    const userQuestionNormalized = normalizeText(userQuestion);
    let bestMatch = null;
    let highestScore = 0;

    for (let key in knowledgeBase) {
        const keyNormalized = normalizeText(key);
        const keyWords = keyNormalized.split(' ');
        let matchScore = 0;

        keyWords.forEach(word => {
            if (userQuestionNormalized.includes(word)) {
                matchScore++;
            }
        });

        const matchRatio = matchScore / keyWords.length;

        if (matchRatio > highestScore) {
            highestScore = matchRatio;
            bestMatch = knowledgeBase[key];
        }
    }

    if (highestScore < 1) {
        const generalAnswers = {
            "address": "The school is located at ABS near DEF",
            "location": "The school is located at ABS near DEF",
            "school": "XYZ School"
        };

        for (let keyword in generalAnswers) {
            if (userQuestionNormalized.includes(keyword)) {
                return generalAnswers[keyword];
            }
        }
    }

    return bestMatch || "reach out as to know more information by calling xxxxxxxx45 thank you";
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const chatbox = document.getElementById('chatbox');

    if (userInput.trim() === '') {
        return;
    }

    const userMessage = document.createElement('div');
    userMessage.textContent = "User: " + userInput;
    chatbox.appendChild(userMessage);

    if (normalizeText(userInput) === 'adminpannel') {
        window.location.href = 'subject.html';
        return;
    }

    const botResponse = findBestMatch(userInput);

    const botMessage = document.createElement('div');
    botMessage.textContent = "Bot: " + botResponse;
    chatbox.appendChild(botMessage);

    document.getElementById('userInput').value = '';
}

window.sendMessage = sendMessage;
