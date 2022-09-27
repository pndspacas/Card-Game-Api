let deckId = "";

fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

document.querySelector(".reset").addEventListener("click", reset);

function reset() {
  fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
      resetP1();
      resetP2();
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

document.querySelector(".deal").addEventListener("click", drawTwo);

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#player1").src = data.cards[0].image;
      document.querySelector("#player2").src = data.cards[1].image;
      document.querySelector(
        "h5"
      ).innerText = `Remaining Cards: ${data.remaining}`;
      let player1Val = convertToNum(data.cards[0].value);
      let player2Val = convertToNum(data.cards[1].value);
      if (player1Val > player2Val) {
        document.querySelector("h4").innerText = "Player 1 Wins";
        countWinsP1();
        if (data.remaining === 0) {
          if (countWinsP1 > countWinsP2) {
            document.querySelector("h6").innerText = "GAME WINNER IS PLAYER 1";
          }
        }
      } else if (player1Val < player2Val) {
        document.querySelector("h4").innerText = "Player 2 Wins";
        countWinsP2();
        if (data.remaining === 0) {
          if (countWinsP1 < countWinsP2) {
            document.querySelector("h6").innerText = "GAME WINNER IS PLAYER 2";
          }
        }
      } else {
        document.querySelector("h4").innerText = "Draw";
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return Number(val);
  }
}

function countWinsP1() {
  let countEl = document.querySelector(".sp1");
  let count = parseInt(countEl.textContent) || 0;
  countEl.textContent = count + 1;
}

function countWinsP2() {
  let countEl = document.querySelector(".sp2");
  let count = parseInt(countEl.textContent) || 0;
  countEl.textContent = count + 1;
}

function resetP1() {
  let countEl = document.querySelector(".sp1");
  let count = parseInt(countEl.textContent) || 0;
  countEl.textContent = 0;
  document.querySelector("#player1").src = "question.png";
  document.querySelector("h5").innerText = "Remaining Cards: 52";
  document.querySelector("h4").innerText = "";
  document.querySelector("h6").innerText = "";
}

function resetP2() {
  let countEl = document.querySelector(".sp2");
  let count = parseInt(countEl.textContent) || 0;
  countEl.textContent = 0;
  document.querySelector("#player2").src = "question.png";
  document.querySelector("h5").innerText = "Remaining Cards: 52";
  document.querySelector("h4").innerText = "";
  document.querySelector("h6").innerText = "";
}

function total() {
  if (data.remaining === 0) {
    if (countWinsP1 > countWinsP2) {
      document.querySelector("h6").innerText = "GAME WINNER PLAYER 1";
    } else if (countWinsP1 < countWinsP2) {
      document.querySelector("h6").innerText = "GAME WINNER PLAYER 2";
    } else {
      document.querySelector("h6").innerText = "GAME DRAW";
    }
  }
}
