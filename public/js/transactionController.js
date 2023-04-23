const sortByCategoryBtn = document.querySelector('#sortByCategoryBtn');
sortByCategoryBtn.addEventListener('click', () => {
  window.location.href = '/transaction?sortBy=category';
});

const sortByAmountBtn = document.querySelector('#sortByAmountBtn');
sortByAmountBtn.addEventListener('click', () => {
  window.location.href = '/transaction?sortBy=amount';
});

const sortByDateBtn = document.querySelector('#sortByDateBtn');
sortByDateBtn.addEventListener('click', () => {
  window.location.href = '/transaction?sortBy=date';
});
