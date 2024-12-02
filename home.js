import { promptRepository } from './prompt-repository.js';
import { useSearchBar } from './search-bar.js';
import { setup } from './setup.js';

const addButton = () => {
  const addButtonElement = document.getElementById('add-button');
  if (addButtonElement) {
    addButtonElement.onclick = () => {
      window.location.assign('edit.html');
    };
  }
};

const showList = async () => {
  const cardElement = document.getElementById('card');
  if (cardElement) {
    const all = await promptRepository.getAll();

    if (all.length) {
      const itemsElement = document.createElement('div');
      itemsElement.className = 'items';

      let openDropdownMenuElement = null;

      all.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('item');

        const contentElement = document.createElement('div');
        contentElement.classList.add('item-content');

        const iconElement = document.createElement('span');
        iconElement.classList.add('item-icon');
        iconElement.textContent = item.icon;
        contentElement.appendChild(iconElement);

        const detailsElement = document.createElement('div');
        detailsElement.classList.add('item-details');

        const titleElement = document.createElement('h2');
        titleElement.textContent = item.title;
        detailsElement.appendChild(titleElement);

        const metaElement = document.createElement('div');
        metaElement.classList.add('item-meta');

        const versionElement = document.createElement('span');
        versionElement.textContent = item.version;
        metaElement.appendChild(versionElement);

        const separatorElement = document.createElement('span');
        separatorElement.classList.add('separator');
        separatorElement.textContent = '•';
        metaElement.appendChild(separatorElement);

        const lastUpdatedElement = document.createElement('span');
        lastUpdatedElement.textContent = '3 months ago';
        metaElement.appendChild(lastUpdatedElement);

        detailsElement.appendChild(metaElement);
        contentElement.appendChild(detailsElement);
        itemElement.appendChild(contentElement);

        const dropdownElement = document.createElement('div');
        dropdownElement.classList.add('dropdown');

        const moreButtonElement = document.createElement('button');
        moreButtonElement.classList.add('more-button');
        moreButtonElement.setAttribute('aria-label', 'More options');
        moreButtonElement.setAttribute('aria-haspopup', 'true');

        const svgIcon = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg'
        );
        svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgIcon.setAttribute('width', '16');
        svgIcon.setAttribute('height', '16');
        svgIcon.setAttribute('viewBox', '0 0 24 24');
        svgIcon.setAttribute('fill', 'none');
        svgIcon.setAttribute('stroke', 'currentColor');
        svgIcon.setAttribute('stroke-width', '2');
        svgIcon.setAttribute('stroke-linecap', 'round');
        svgIcon.setAttribute('stroke-linejoin', 'round');
        svgIcon.classList.add('icon');

        const circle1 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );
        circle1.setAttribute('cx', '12');
        circle1.setAttribute('cy', '12');
        circle1.setAttribute('r', '1');
        svgIcon.appendChild(circle1);

        const circle2 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );
        circle2.setAttribute('cx', '19');
        circle2.setAttribute('cy', '12');
        circle2.setAttribute('r', '1');
        svgIcon.appendChild(circle2);

        const circle3 = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );
        circle3.setAttribute('cx', '5');
        circle3.setAttribute('cy', '12');
        circle3.setAttribute('r', '1');
        svgIcon.appendChild(circle3);

        moreButtonElement.appendChild(svgIcon);
        dropdownElement.appendChild(moreButtonElement);

        const dropdownMenuElement = document.createElement('div');
        dropdownMenuElement.classList.add('dropdown-menu');
        dropdownMenuElement.setAttribute('role', 'menu');

        const editButtonElement = document.createElement('button');
        editButtonElement.classList.add('dropdown-item');
        editButtonElement.setAttribute('role', 'menuitem');
        editButtonElement.textContent = 'Edit';
        editButtonElement.onclick = () => {
          window.location.assign(`edit.html?id=${item.id}`);
        };

        dropdownMenuElement.appendChild(editButtonElement);

        const deleteButtonElement = document.createElement('button');
        deleteButtonElement.classList.add('dropdown-item');
        deleteButtonElement.setAttribute('role', 'menuitem');
        deleteButtonElement.textContent = 'Delete';
        deleteButtonElement.onclick = async () => {
          await promptRepository.delete(item.id);
          itemElement.remove();
        };

        dropdownMenuElement.appendChild(deleteButtonElement);

        moreButtonElement.onclick = () => {
          if (!openDropdownMenuElement) {
            dropdownElement.appendChild(dropdownMenuElement);
            openDropdownMenuElement = dropdownMenuElement;
          } else {
            if (openDropdownMenuElement === dropdownMenuElement) {
              dropdownMenuElement.remove();
              // load empty state if empty
              openDropdownMenuElement = null;
            } else {
              dropdownElement.appendChild(dropdownMenuElement);
              openDropdownMenuElement.remove();
              openDropdownMenuElement = dropdownMenuElement;
            }
          }
        };

        itemElement.appendChild(dropdownElement);

        itemsElement.appendChild(itemElement);
      });

      cardElement.appendChild(itemsElement);
    } else {
      const emptyStateText = document.createTextNode(
        'Oops! It seems our prompt took a day off!'
      );
      const additionalText = document.createTextNode(
        ' Click Create to call it back to work and get things rolling! 🚀'
      );
      const emptyElement = document.createElement('div');
      emptyElement.classList = 'empty';

      const emptyStateElement = document.createElement('p');
      emptyStateElement.classList = 'title';

      emptyStateElement.appendChild(emptyStateText);

      const additionalElement = document.createElement('p');
      additionalElement.appendChild(additionalText);

      const orElement = document.createElement('p');
      orElement.innerText = 'or';
      orElement.style.color = '#6b7280';

      const setupButton = document.createElement('button');
      setupButton.innerText = 'Try with examples';
      setupButton.classList = 'try-button';

      setupButton.onclick = async () => {
        await setup();
        window.location.assign('home.html');
      };

      emptyElement.appendChild(emptyStateElement);
      emptyElement.appendChild(additionalElement);
      emptyElement.appendChild(orElement);
      emptyElement.appendChild(setupButton);
      cardElement.appendChild(emptyElement);
    }
  }

  useSearchBar();
};

addButton();
showList();

const getAiOriginTrialStatus = async () => {
  try {
    if (!('aiOriginTrial' in chrome)) {
      console.error(
        'Error: chrome.aiOriginTrial not supported in this browser'
      );
      return;
    }
    const defaults = await chrome.aiOriginTrial.languageModel.capabilities();
    console.log('Model default:', defaults);
    if (defaults.available !== 'readily') {
      console.error(
        `Model not yet available (current state: "${defaults.available}")`
      );
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

getAiOriginTrialStatus();
