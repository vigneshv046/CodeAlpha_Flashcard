 let data = {
      React: [
        { question: "What is JSX?", options: ["HTML", "JS", "HTML + JS", "Python"], correct: 2 },
        { question: "What does useState do?", options: ["State", "Effect", "Render", "Fetch"], correct: 0 },
      ],
      HTML: [
        { question: "What is <a> tag?", options: ["Image", "Link", "Style", "Table"], correct: 1 },
        { question: "What does <img> do?", options: ["Text", "Audio", "Image", "List"], correct: 2 },
      ],
      CSS: [
        { question: "What is display: flex?", options: ["Grid", "Block", "Flex", "Table"], correct: 2 },
        { question: "CSS stands for?", options: ["Style", "Sheet", "Style Sheet", "Cascading Style Sheets"], correct: 3 },
      ],
    };

    let currentCategory = "React";
    let currentIndex = 0;
    let editingIndex = null;

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");

    function renderCard() {
      const card = data[currentCategory][currentIndex];
      questionEl.textContent = `Q${currentIndex + 1}: ${card.question}`;
      optionsEl.innerHTML = "";

      card.options.forEach((opt, i) => {
        const btn = document.createElement("div");
        btn.textContent = opt;
        btn.className = "option";
        btn.onclick = () => showAnswer(i, card.correct, btn);
        optionsEl.appendChild(btn);
      });
    }

    function showAnswer(selected, correct, el) {
      const all = document.querySelectorAll(".option");
      all.forEach((opt, idx) => {
        opt.classList.remove("correct", "incorrect");
        if (idx === correct) opt.classList.add("correct");
        if (idx === selected && selected !== correct) opt.classList.add("incorrect");
      });
    }

    function changeCategory(cat) {
      currentCategory = cat;
      currentIndex = 0;
      renderCard();
    }

    function nextCard() {
      currentIndex = (currentIndex + 1) % data[currentCategory].length;
      renderCard();
    }

    function prevCard() {
      currentIndex = (currentIndex - 1 + data[currentCategory].length) % data[currentCategory].length;
      renderCard();
    }

    function loadEdit() {
      const card = data[currentCategory][currentIndex];
      document.getElementById("form-title").textContent = "Edit Flashcard";
      document.getElementById("form-category").value = currentCategory;
      document.getElementById("form-question").value = card.question;
      card.options.forEach((opt, i) => document.getElementById("form-opt" + i).value = opt);
      document.getElementById("form-correct").value = card.correct;
      editingIndex = currentIndex;
    }

    function saveCard() {
      const cat = document.getElementById("form-category").value;
      const question = document.getElementById("form-question").value;
      const options = [
        document.getElementById("form-opt0").value,
        document.getElementById("form-opt1").value,
        document.getElementById("form-opt2").value,
        document.getElementById("form-opt3").value,
      ];
      const correct = parseInt(document.getElementById("form-correct").value);

      if (!question || options.some(opt => !opt) || isNaN(correct) || correct < 0 || correct > 3) {
        return alert("Fill all fields correctly.");
      }

      const newCard = { question, options, correct };

      if (editingIndex !== null && currentCategory === cat) {
        data[cat][editingIndex] = newCard;
        editingIndex = null;
      } else {
        data[cat].push(newCard);
        currentCategory = cat;
        currentIndex = data[cat].length - 1;
      }

      renderCard();

      // Clear form
      document.getElementById("form-title").textContent = "Add New Flashcard";
      document.querySelectorAll("input").forEach(i => i.value = "");
    }

    function deleteCard() {
      if (data[currentCategory].length <= 1) {
        alert("At least one card is required.");
        return;
      }
      data[currentCategory].splice(currentIndex, 1);
      currentIndex = 0;
      renderCard();
    }

    renderCard();