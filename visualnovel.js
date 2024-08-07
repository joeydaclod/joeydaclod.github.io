document.addEventListener("DOMContentLoaded", () => {
    const pageContent = {
        hakken: {
            steps: [
                {
                    text: "We've finally arrived at Hakken! Surely there MUST be a figurine that Nezuko likes!",
                    img: "tanjironpc.png",
                    name: "Kamado Tanjiro"
                },
                {
                    text: "I hope we can find something special for Nezuko.",
                    name: "Kamado Tanjiro"
                },
                {
                    text: "Let's go in!",
                    name: "Kamado Tanjiro"
                },
            ],
            nextPage: "page2.html"
        },
        anotherPage: {
            steps: [
                {
                    text: "Woah! This place is huge!",
                    img: "tanjironpc.png",
                    name: "Kamado Tanjiro"
                },
                {
                    text: "Did you know that this store at Plaza Singapura is the first Hakken store in Singapore?",
                    name: "Kamado Tanjiro"
                },
                {
                    text: "Cool right?",
                    name: "Kamado Tanjiro"
                },
                {
                    text: "Anyhow, we should split up and meet at the counter once we find anything for Nezuko.",
                    name: "Kamado Tanjiro"
                },
                {
                    text: "Remember, we need to find a figurine that Nezuko likes!",
                    name: "Kamado Tanjiro"
                },
                {
                    text: "All right, see ya!",
                    name: "Kamado Tanjiro"
                }
            ],
            nextPage: "page3.html"
        },
        page4a: {
            steps: [
                {
                    text: "Hmm, I wonder what Lumine would want...",
                    img: "aether-removebg-preview.png",
                    name: "Aether"
                },
                {
                    text: "Oh hey, are you looking for files too?",
                    name: "Aether"
                },
                {
                    text: "Hm? You're looking for figurines?",
                    name: "Aether"
                },
                {
                    text: "I think you should check out another section of the store.",
                    name: "Aether"
                },
                {
                    text: "But aren't the files here nice? My sister wants me to pick one she likes.",
                    name: "Aether"
                },
                {
                    text: "Eh? You're helping someone find their sister a gift?",
                    name: "Aether"
                },
                {
                    text: "We must have a lot of similarities to be having a similar problem.",
                    name: "Aether"
                },
                {
                    text: "I hope you find what you're looking for eventually.",
                    name: "Aether"
                }
            ],
            nextPage: "page4aactivity.html"
        },
        page4b: {
            steps: [
                {
                    text: "These plushies are so cute!",
                    img: "yorforger.png",
                    name: "Yor"
                },
                {
                    text: "Ms Anya would love these!",
                    img: "yorforger.png",
                    name: "Yor"
                },
                {
                    text: "Oh, hi! Are you looking through these plushies too?",
                    img: "yorforger.png",
                    name: "Yor"
                },
                {
                    text: "Figurines? I think they're located at somewhere else...",
                    img: "yorforger.png",
                    name: "Yor"
                },
                {
                    text: "Are you trying to buy a gift for someone?",
                    img: "yorforger.png",
                    name: "Yor"
                },
                {
                    text: "In that case, you should take note of their favourite colour!",
                    img: "yorforger.png",
                    name: "Yor"
                },
                {
                    text: "Ms Anya- I mean, my daughter loves the colour pink.",
                    img: "yorforger.png",
                    name: "Yor"
                },
                {
                    text: "I hope this helps you!",
                    img: "yorforger.png",
                    name: "Yor"
                }
            ],
            nextPage: "page4bactivity.html"
        },
    };

    const bodyId = document.body.id;
    const pageData = pageContent[bodyId];
    const steps = pageData ? pageData.steps : [];
    const nextPage = pageData ? pageData.nextPage : null;
    const dialogue = document.getElementById('dialogue');
    const nextButton = document.getElementById('nextButton');
    const image = document.getElementById('tanjironpc');
    const name = document.getElementById('tanjironame');

    const originalImgSrc = image ? image.src : null;
    const originalNameText = name ? name.textContent : null;

    // Memory Card Game Logic
    if (bodyId === 'page4aactivity') {
        const cardsArray = [
            { name: 'A', img: 'muichirotokito.jpg' },
            { name: 'B', img: 'lumine.webp' },
            { name: 'C', img: 'anyaforger.jpg' },
            { name: 'D', img: 'erenyeager.jpg' },
            { name: 'E', img: 'itadori.jpg' },
            { name: 'F', img: 'mai.jpg' },
            { name: 'G', img: 'maki.jpg' },
            { name: 'H', img: 'mikey.jpg' },
            { name: 'I', img: 'xielian.jpg' }, // New Card 1
        ];
    
        const gameBoard = document.getElementById('game-board');
        let gameGrid = cardsArray.concat(cardsArray).sort(() => 0.5 - Math.random());
        let firstCard = null;
        let secondCard = null;
        let lockBoard = false;
        let matchesFound = 0;
        let timeLeft = 60;
        let timerInterval;
    
        function startTimer() {
            timerInterval = setInterval(() => {
                timeLeft--;
                const timerDisplay = document.getElementById('timer');
                timerDisplay.textContent = `Time left: ${timeLeft}s`;
    
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert("Time's up!");
                    window.location.href = 'failed.html'; // Redirect to timeout page
                }
            }, 1000);
        }
    
        function createBoard() {
            gameGrid.forEach((item) => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.dataset.name = item.name;
    
                const cardInner = document.createElement('div');
                cardInner.classList.add('card-inner');
    
                const cardFront = document.createElement('div');
                cardFront.classList.add('card-front');
                cardFront.textContent = '?'; // Or any custom text/symbol for the front
    
                const cardBack = document.createElement('div');
                cardBack.classList.add('card-back');
                cardBack.style.backgroundImage = `url(${item.img})`;
    
                cardInner.appendChild(cardFront);
                cardInner.appendChild(cardBack);
                cardElement.appendChild(cardInner);
                gameBoard.appendChild(cardElement);
    
                cardElement.addEventListener('click', flipCard);
            });
        }
    
        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;
    
            this.classList.add('flip');
    
            if (!firstCard) {
                firstCard = this;
                return;
            }
    
            secondCard = this;
            checkForMatch();
        }
    
        function checkForMatch() {
            const isMatch = firstCard.dataset.name === secondCard.dataset.name;
    
            if (isMatch) {
                matchesFound += 2;
                disableCards();
    
                if (matchesFound === gameGrid.length) {
                    clearInterval(timerInterval);
                    setTimeout(() => {
                        alert("Congratulations! You've won!");
                        window.location.href = 'page5a.html'; // Redirect to the next page
                    }, 500); // Adding a short delay to ensure user sees the win message
                }
            } else {
                unflipCards();
            }
        }
    
        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
    
            resetBoard();
        }
    
        function unflipCards() {
            lockBoard = true;
    
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
    
                resetBoard();
            }, 1500);
        }
    
        function resetBoard() {
            [firstCard, secondCard, lockBoard] = [null, null, false];
        }
    
        startTimer();
        createBoard();
    }

    // Anime Quiz Logic for page4bactivity
    if (bodyId === 'page4bactivity') {
        const quizData = [
            {
                question: "Who is the main protagonist of 'Naruto'?",
                choices: ["Sasuke Uchiha", "Sakura Haruno", "Naruto Uzumaki", "Kakashi Hatake"],
                answer: "Naruto Uzumaki"
            },
            {
                question: "In 'One Piece', who is the captain of the Straw Hat Pirates?",
                choices: ["Roronoa Zoro", "Sanji", "Monkey D. Luffy", "Nami"],
                answer: "Monkey D. Luffy"
            },
            {
                question: "Which anime features the character 'Goku'?",
                choices: ["Dragon Ball", "Bleach", "Fairy Tail", "Attack on Titan"],
                answer: "Dragon Ball"
            },
            {
                question: "What is the name of the wizarding school in 'Harry Potter'?",
                choices: ["Durmstrang", "Hogwarts", "Beauxbatons", "Ilvermorny"],
                answer: "Hogwarts"
            },
            {
                question: "Who is the author of 'My Hero Academia'?",
                choices: ["Eiichiro Oda", "Masashi Kishimoto", "Kohei Horikoshi", "Yuki Tabata"],
                answer: "Kohei Horikoshi"
            },
            {
                question: "What is the name of the titan that Eren Yeager can transform into in 'Attack on Titan'?",
                choices: ["Colossal Titan", "Armored Titan", "Attack Titan", "Beast Titan"],
                answer: "Attack Titan"
            },
            {
                question: "In 'Fullmetal Alchemist', what is the principle of equivalent exchange?",
                choices: ["To gain something, something of equal value must be lost", "Magic must be countered with magic", "Alchemy can create anything", "Humans can become gods"],
                answer: "To gain something, something of equal value must be lost"
            },
            {
                question: "Who is the main character in 'Death Note'?",
                choices: ["L", "Light Yagami", "Ryuk", "Misa Amane"],
                answer: "Light Yagami"
            },
            {
                question: "In 'Demon Slayer', what is the name of Tanjiro's sister?",
                choices: ["Shinobu", "Kanao", "Nezuko", "Mitsuri"],
                answer: "Nezuko"
            },
            {
                question: "Which anime features the survey corps fighting titans?",
                choices: ["Tokyo Ghoul", "Attack on Titan", "Sword Art Online", "Hunter x Hunter"],
                answer: "Attack on Titan"
            }
        ];

        let currentQuestionIndex = 0;
        let lives = 3;

        const questionContainer = document.getElementById('question-container');
        const choicesContainer = document.getElementById('choices-container');
        const livesContainer = document.getElementById('lives-container');

        function showQuestion() {
            const currentQuestion = quizData[currentQuestionIndex];
            questionContainer.textContent = currentQuestion.question;
            choicesContainer.innerHTML = '';

            currentQuestion.choices.forEach(choice => {
                const li = document.createElement('li');
                li.textContent = choice;
                li.addEventListener('click', () => checkAnswer(choice));
                choicesContainer.appendChild(li);
            });

            livesContainer.textContent = `Lives: ${lives}`;
        }

        function checkAnswer(selectedChoice) {
            const currentQuestion = quizData[currentQuestionIndex];

            if (selectedChoice === currentQuestion.answer) {
                currentQuestionIndex++;
                if (currentQuestionIndex < quizData.length) {
                    showQuestion();
                } else {
                    alert("Congratulations! You've completed the quiz!");
                    window.location.href = 'page5b.html'; // Redirect to the next page
                }
            } else {
                lives--;
                if (lives <= 0) {
                    alert("You've lost all your lives!");
                    window.location.href = 'failed.html'; // Redirect to the "you're a loser" page
                } else {
                    livesContainer.textContent = `Lives: ${lives}`;
                }
            }
        }

        showQuestion();
    }

    // Next Button Logic
    if (bodyId !== 'page4aactivity' && bodyId !== 'page4bactivity') {
        let stepIndex = 0;

        function updateDialogue() {
            if (stepIndex < steps.length) {
                const step = steps[stepIndex];
                if (dialogue) {
                    dialogue.textContent = step.text;
                }
                if (image && step.img) {
                    image.src = step.img;
                }
                if (name) {
                    name.textContent = step.name || '';
                }
                stepIndex++;
            } else if (nextPage) {
                window.location.href = nextPage;
            }
        }

        if (nextButton) {
            nextButton.addEventListener('click', updateDialogue);
        }

        updateDialogue(); // Initialize dialogue
    }
});
