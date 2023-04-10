const form = document.querySelector('#input-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // this is where we'll add logic
  let initMoney = parseInt(document.querySelector('#initialMoney').value);
  const betForBlack = parseInt(document.querySelector('#betForBlack').value);
  const betForGreen = parseInt(document.querySelector('#betForGreen').value);
  const minPerRound = parseInt(document.querySelector('#minPerRound').value);

  const results = document.querySelector('#results');
  const resultsTable = document.querySelector('#resultsTable');

  let roundCounter = 1;

  while (initMoney > 0) {
    const random = Math.floor(Math.random() * 37);
    const color = spinWheel(random);

    let outcome;
    let betBlackWinLoss = '';
    let betGreenWinLoss = '';

    switch (color) {
      case 'black':
        outcome = betForGreen * -1 + betForBlack;
        betBlackWinLoss = 'WIN';
        betGreenWinLoss = 'LOSE';
        break;
      case 'red':
        outcome = betForBlack * -1 + betForGreen * -1;
        betBlackWinLoss = 'LOSE';
        betGreenWinLoss = 'LOSE';
        break;
      case 'green':
        outcome = betForBlack * -1 + betForGreen;
        betBlackWinLoss = 'LOSE';
        betGreenWinLoss = 'WIN';
        break;
    }

    final = initMoney + outcome;

    const tableRowTemplate = `
    <tr>
    <td>${roundCounter}</td>
    <td>${random}</td>
    <td>${betBlackWinLoss}</td>
    <td>${betGreenWinLoss}</td>
    <td>${outcome}</td>
    <td>${initMoney}</td>
    <td>${final}</td>
    </tr>
    `;

    resultsTable.insertAdjacentHTML('beforeend', tableRowTemplate);

    initMoney += outcome;
    roundCounter++;
  }

  roundCounter--;
  const totalTime = minPerRound * roundCounter;
  let totalTimeTemplate = getTotalTimeInHoursAndMinutes(totalTime);

  results.insertAdjacentHTML('afterbegin', totalTimeTemplate);
});

function spinWheel(randomVal) {
  if (randomVal === 0) {
    return 'green';
  }

  if (randomVal % 2 === 0) {
    if ((randomVal <= 18 && randomVal >= 12) || randomVal >= 30) {
      return 'red';
    }

    return 'black';
  }

  if (randomVal % 2 !== 0) {
    if (randomVal <= 9 || (randomVal >= 19 && randomVal <= 27)) {
      return 'red';
    }

    return 'black';
  }
}

function getTotalTimeInHoursAndMinutes(timeInMinutes) {
  if (timeInMinutes >= 60) {
    const totalTimeHours = Math.floor(timeInMinutes / 60);
    const totalTimeMinutes = timeInMinutes % 60;

    return `
        <h1>Total time: ${totalTimeHours} hours and ${totalTimeMinutes} minutes</h1>
    `;
  }

  return `
        <h1>Total time: ${timeInMinutes} minutes</h1>
    `;
}

// Get the modal element
const modal = document.getElementById('modal');

// Get the button that opens the modal
const openModalBtn = document.getElementById('open-modal-btn');

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
openModalBtn.onclick = function () {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
  modal.style.display = 'none';
  location.reload();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    location.reload();
  }
};
