import { promptRepository } from './prompt-repository.js';
import { useSearchBar } from './search-bar.js';

const backButton = () => {
  const backButtonElement = document.getElementById('back-button');
  if (backButtonElement) {
    backButtonElement.onclick = () => {
      window.location.assign('home.html');
    };
  }
};

const form = {
  id: null,
  values: {
    icon: null,
    title: null,
    version: null,
    prompt: null,
    mode: null /* "replace_all" | "replace_selection" | "insert_at_end" */,
  },
  setIcon(icon) {
    this.values.icon = icon;
  },
  setTitle(title) {
    this.values.title = title;
  },
  setVersion(version) {
    this.values.version = version;
  },
  setPrompt(prompt) {
    this.values.prompt = prompt;
  },
  setMode(mode) {
    this.values.mode = mode;
  },
  isValid() {
    for (const key in this.values) {
      if (!this.values[key]) {
        return false;
      }
    }
    const versionRegex = /^\d\.\d$/;
    if (!versionRegex.test(this.values.version)) {
      return false;
    }

    return true;
  },
  saveForm() {
    if (this.isValid()) {
      const { icon, prompt, title, version, mode } = this.values;

      if (this.id) {
        promptRepository.update(this.id, {
          icon,
          prompt,
          title,
          version,
          mode,
        });
      } else {
        promptRepository.create({
          icon,
          prompt,
          title,
          version,
          mode,
        });
      }
      window.location.assign('home.html');
    }
  },
};

const selectIcon = (icon) => {
  form.setIcon(icon);
  document.querySelectorAll('.icon-selector button').forEach((btn) => {
    btn.classList.toggle('selected', btn.textContent === icon);
  });
};

const updateSelection = (value) => {
  document.querySelectorAll('.toggle-button').forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.value === value);
  });
};

const displayIcons = (currentIcon) => {
  const icons = [
    '🚀',
    '🦄',
    '🌈',
    '🍕',
    '🎉',
    '🔥',
    '💡',
    '🌟',
    '🎨',
    '🎸',
    '🐶',
    '🐱',
    '🐼',
    '🦊',
    '🦁',
    '🐯',
    '🐮',
    '🐷',
    '🐸',
    '🐙',
    '🍎',
    '🍌',
    '🍓',
    '🍑',
    '🥑',
    '🥕',
    '🌽',
    '🍔',
    '🍟',
    '🍩',
    '⚽️',
    '🏀',
    '🎾',
    '🏈',
    '⚾️',
    '🥎',
    '🏐',
    '🏉',
  ];

  const iconSelector = document.querySelector('.icon-selector');

  icons.forEach((icon) => {
    const button = document.createElement('button');
    button.textContent = icon;
    button.onclick = () => selectIcon(icon);
    if (currentIcon === icon) button.classList.add('selected');
    iconSelector.appendChild(button);
  });
};

const saveButtonStatus = (saveButtonElement) => ({
  isDisabled: true,
  status() {
    if (form.isValid() && this.isDisabled === true) {
      saveButtonElement.removeAttribute('disabled');
      this.isDisabled = false;
    } else if (!form.isValid() && this.isDisabled === false) {
      saveButtonElement.setAttribute('disabled', 'true');
      this.isDisabled = true;
    }
  },
});

const edit = async () => {
  const saveButtonElement = document.getElementById('save-button');
  const titleElement = document.getElementById('title');
  const versionElement = document.getElementById('version');
  const promptElement = document.getElementById('prompt');
  const toggleGroup = document.getElementById('toggle-group');

  const urlParams = new URLSearchParams(window.location.search);
  const saveButton = saveButtonStatus(saveButtonElement);

  if (urlParams.has('id')) {
    const id = urlParams.get('id');
    saveButtonElement.textContent = 'Edit';
    form.id = id;
    const item = await promptRepository.getById(id);

    form.setIcon(item.icon);
    form.setTitle(item.title);
    form.setVersion(item.version);
    form.setPrompt(item.prompt);
    form.setMode(item.mode);

    displayIcons(item.icon);
    updateSelection(item.mode);
    titleElement.value = item.title;
    versionElement.value = item.version;
    promptElement.value = item.prompt;
  } else {
    saveButtonElement.textContent = 'Create';
    displayIcons();
    form.setMode('replace_all');
    updateSelection('replace_all');
  }

  titleElement.addEventListener('input', (event) => {
    const { value } = event.target;
    form.setTitle(value);
    saveButton.status();
  });

  versionElement.addEventListener('input', (event) => {
    const { value } = event.target;
    form.setVersion(value);
    saveButton.status();
  });

  promptElement.addEventListener('input', (event) => {
    const { value } = event.target;
    form.setPrompt(value);
    saveButton.status();
  });

  toggleGroup.addEventListener('click', (event) => {
    const button = event.target.closest('.toggle-button');
    if (button) {
      const value = button.dataset.value;
      updateSelection(value);
      form.setMode(value);
      saveButton.status();
    }
  });

  saveButtonElement.onclick = () => form.saveForm();

  document.addEventListener('keydown', function (event) {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      form.saveForm();
    }
  });

  saveButton.status();
  titleElement.removeAttribute('disabled');
  versionElement.removeAttribute('disabled');
  promptElement.removeAttribute('disabled');

  document.querySelectorAll('.toggle-button').forEach((btn) => {
    btn.removeAttribute('disabled');
  });

  useSearchBar();
};

backButton();
edit();
