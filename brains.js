document.addEventListener('DOMContentLoaded', () => {
  const itemInput = document.getElementById('itemInput');
  const addItemButton = document.getElementById('addItemButton');
  const itemsList = document.getElementById('itemsList');
  const chooseButton = document.getElementById('chooseButton');
  const resetButton = document.getElementById('resetButton');

  let items = [];

  addItemButton.addEventListener('click', () => {
      const item = itemInput.value.trim();
      if (item) {
          items.push(item);
          updateItemsList();
          itemInput.value = '';
      }
  });

  chooseButton.addEventListener('click', () => {
      if (items.length > 1) {
          removeRandomItems();
      } else if (items.length === 1) {
          alert(`The chosen item is: ${items[0]}`);
      } else {
          alert('No items to choose from');
      }
  });

  resetButton.addEventListener('click', () => {
      items = [];
      updateItemsList();
  });

  function updateItemsList() {
      itemsList.innerHTML = '';
      if (items.length > 0) {
          itemsList.classList.add('with-border');
          items.forEach((item, index) => {
              const li = document.createElement('li');
              li.textContent = item;
              li.setAttribute('data-index', index);
              itemsList.appendChild(li);
          });
      } else {
          itemsList.classList.remove('with-border');
      }
  }

  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  function removeRandomItems() {
      shuffleArray(items);

      const removeItem = () => {
          if (items.length > 1) {
              const itemToRemove = itemsList.querySelector(`li[data-index='${items.length - 1}']`);
              itemToRemove.style.opacity = '0';
              setTimeout(() => {
                  items.pop();
                  updateItemsList();
                  removeItem();
              }, 500);
          } else {
              alert(`The chosen item is: ${items[0]}`);
          }
      };

      removeItem();
  }
});
