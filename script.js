const allQuestions = [
    {
      question: "Qual é o símbolo químico do hidrogênio?",
      options: ["H", "He", "O", "N"],
      correctAnswer: "H"
    },
    {
      question: "Quantos elementos químicos existem na tabela periódica?",
      options: ["118", "92", "100", "150"],
      correctAnswer: "118"
    },
    {
      question: "Qual é o elemento químico mais abundante no universo?",
      options: ["Hidrogênio", "Hélio", "Oxigênio", "Carbono"],
      correctAnswer: "Hidrogênio"
    },
    {
      question: "Qual é o elemento químico com símbolo 'C'?",
      options: ["Cobre", "Cálcio", "Carbono", "Cromo"],
      correctAnswer: "Carbono"
    },
    {
      question: "Qual é o símbolo químico do oxigênio?",
      options: ["Ox", "O", "Oi", "Og"],
      correctAnswer: "O"
    },
    {
      question: "Qual é o símbolo químico do enxofre?",
      options: ["Es", "En", "S", "Sr"],
      correctAnswer: "S"
    },
    {
      question: "Quantos elementos químicos são gases à temperatura ambiente?",
      options: ["2", "5", "11", "17"],
      correctAnswer: "11"
    },
    {
      question: "Qual é o símbolo químico do cobre?",
      options: ["C", "Cu", "Co", "Cr"],
      correctAnswer: "Cu"
    },
    {
      question: "Qual é o elemento químico com símbolo 'Ag'?",
      options: ["Álcool", "Prata", "Zinco", "Ouro"],
      correctAnswer: "Prata"
    },
    {
      question: "Quantos elétrons um átomo de hidrogênio tem?",
      options: ["1", "2", "0", "3"],
      correctAnswer: "1"
    },
    // Mais questões...
    {
      question: "Qual é o elemento químico com símbolo 'Mg'?",
      options: ["Manganês", "Magnésio", "Mercúrio", "Molibdênio"],
      correctAnswer: "Magnésio"
    },
    {
      question: "Quantos elétrons um átomo de oxigênio tem?",
      options: ["4", "6", "8", "10"],
      correctAnswer: "8"
    },
    {
      question: "Qual é o símbolo químico do potássio?",
      options: ["P", "Pa", "Po", "K"],
      correctAnswer: "K"
    },
    {
      question: "Quantos elementos químicos naturais existem?",
      options: ["83", "92", "99", "108"],
      correctAnswer: "92"
    },
    {
      question: "Qual é o elemento químico com símbolo 'Ca'?",
      options: ["Carbono", "Cádmio", "Césio", "Cálcio"],
      correctAnswer: "Cálcio"
    }
  ];
  
  // Função para embaralhar as questões e selecionar apenas 10
  function selectRandomQuestions(allQuestions, numQuestions) {
    const shuffledQuestions = allQuestions.slice(); // Copia as questões para não alterar o array original
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
    return shuffledQuestions.slice(0, numQuestions);
  }
  
  const questions = selectRandomQuestions(allQuestions, 10);
  
  let currentQuestion = 0;
  let score = 0;
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
  
    if (currentQuestion >= questions.length) {
      displayScore();
    } else {
      const currentQ = questions[currentQuestion];
      questionElement.textContent = currentQ.question;
  
      optionsElement.innerHTML = "";
  
      const shuffledOptions = shuffleArray([...currentQ.options]);
      shuffledOptions.forEach((option) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.addEventListener("click", () => checkAnswer(option));
        optionsElement.appendChild(btn);
      });
  
      nextBtn.style.display = "none";
    }
  }
  
  function checkAnswer(selectedAnswer) {
    const currentQ = questions[currentQuestion];
    const optionsElement = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
  
    optionsElement.childNodes.forEach((btn) => {
      btn.disabled = true;
      if (btn.textContent === currentQ.correctAnswer) {
        btn.classList.add("correct");
      } else if (btn.textContent === selectedAnswer) {
        btn.classList.add("incorrect");
      }
    });
  
    if (selectedAnswer === currentQ.correctAnswer) {
      score++;
    }
  
    nextBtn.style.display = "block";
  }
  
  function nextQuestion() {
    currentQuestion++;
    displayQuestion();
  }
  
  function displayScore() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextBtn = document.getElementById("nextBtn");
  
    questionElement.textContent = `Fim do jogo! Sua pontuação: ${score}/${questions.length}`;
    optionsElement.innerHTML = "";
    nextBtn.style.display = "none";
  
    // Adiciona botão para reiniciar o jogo
    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Reiniciar Jogo";
    restartBtn.addEventListener("click", restartGame);
    optionsElement.appendChild(restartBtn);
  }
  
  function restartGame() {
    currentQuestion = 0;
    score = 0;
    const newQuestions = selectRandomQuestions(allQuestions, 10);
    questions.splice(0, questions.length, ...newQuestions);
    shuffleArray(questions);
    displayQuestion();
  }
  
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  
  displayQuestion();  