/* global chrome */

const style = {
  container: {
    position: 'fixed',
    top: '2%',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    width: '512px',
    padding: '8px',
    margin: '0px',
    boxSizing: 'border-box',
    borderRadius: '12px',
    fontFamily: 'system-ui',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    zIndex: '11010',
  },
  input: {
    width: '100%',
    height: 'auto',
    padding: '8px',
    margin: '0px',
    boxSizing: 'border-box',
    color: '#fafafa',
    fontSize: '18px',
    fontFamily: 'system-ui',
    lineHeight: '1',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    border: 'none',
    borderRadius: '3px',
    outline: 'none',
    boxShadow: 'none',
  },
  suggestionItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    gap: '6px',
    color: '#fafafa',
    cursor: 'pointer',
    borderRadius: '6px',
  },
  notification: {
    position: 'fixed',
    top: '2%',
    left: '50%',
    transform: 'translateX(-50%) translateY(0)',
    maxWidth: '256px',
    color: '#fafafa',
    padding: '8px',
    margin: '0px',
    boxSizing: 'border-box',
    borderRadius: '6px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    opacity: '0',
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    zIndex: '1000',
  },
};
const backgroundColor = {
  default: 'transparent',
  hover: 'rgba(255, 255, 255, 0.2)',
  selected: 'rgba(255, 255, 255, 0.1)',
};

const htmlElementCreator = {
  container(id) {
    const container = document.createElement('div');
    container.id = id;
    container.tabIndex = 0;
    Object.assign(container.style, style['container']);
    return container;
  },
  input(className, initialContent = '') {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search...';
    input.value = initialContent;
    input.className = className;
    Object.assign(input.style, style['input']);
    return input;
  },
  suggestions(id) {
    const suggestions = document.createElement('div');
    suggestions.id = id;
    return suggestions;
  },
  suggestionItem(content) {
    const suggestionItem = document.createElement('div');
    Object.assign(suggestionItem.style, style['suggestionItem']);
    suggestionItem.appendChild(document.createTextNode(content));
    return suggestionItem;
  },
  style() {
    const style = document.createElement('style');
    style.textContent =
      '.custom-search-input::placeholder { color: rgba(255, 255, 255, 0.3); }';
    return style;
  },
  notification() {
    let notification = document.getElementById('window-notification');

    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'window-notification';
      document.body.appendChild(notification);
      Object.assign(notification.style, style['notification']);
    }
    return notification;
  },
};

const gemini = async (system, user) => {
  let session = null;
  try {
    session = await chrome.aiOriginTrial.languageModel.create({
      systemPrompt: system,
    });
    console.log(system, user);
    const output = await session.prompt(user);
    console.log(output);

    session.destroy();
    return output;
  } catch (error) {
    console.error('Error during API call:', error);
    if (session) session.destroy();
    return 'It seems that the AI assistant is not configured correctly';
  }
};

const showNotification = (message) => {
  const notification = htmlElementCreator.notification();
  notification.textContent = message;

  notification.style.opacity = '1';
  notification.style.transform = 'translateX(-50%)  translateY(0)';
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(-50%)  translateY(-20px)';
  }, 300);
};

const getAll = async (storageKey) => {
  const result = await chrome.storage.local.get(storageKey);
  return result[storageKey] || [];
};

const ActiveInputManager = () => ({
  element: document.activeElement,
  initial: {
    content: null,
    selectedContent: null,
    selectionStart: null,
    selectionEnd: null,
  },
  isSupportedElement() {
    return (
      this.element &&
      (this.element.isContentEditable ||
        this.element.tagName === 'TEXTAREA' ||
        this.element.tagName === 'INPUT')
    );
  },
  get content() {
    return this._getContent();
  },
  get selectedContent() {
    if (!this.isSupportedElement()) return null;

    if (this.element.isContentEditable) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        return selection.toString();
      }
    } else if (
      this.element.tagName === 'TEXTAREA' ||
      this.element.tagName === 'INPUT'
    ) {
      const start = this.element.selectionStart;
      const end = this.element.selectionEnd;
      return this.element.value.slice(start, end);
    }

    return null;
  },
  updateContent(content, mode = 'replace_all') {
    if (!this.isSupportedElement()) return false;

    switch (mode) {
      case 'replace_all':
        this._replaceAll(content);
        break;
      case 'replace_selection':
        this._replaceSelection(content);
        break;
      case 'insert_at_end':
        this._insertAtEnd(content);
        break;
      default:
        console.error(`Mode non supporté : ${mode}`);
    }

    return true;
  },
  useLoader(mode) {
    let loaderCharacters = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

    let index = 0;
    let loaderInterval;
    const interval = 100;
    let isCancelled = false;

    this.element.selectionStart;

    this.initial.content = this.content;
    this.initial.selectedContent = this.selectedContent;
    this.initial.selectionStart = this.element.selectionStart;
    this.initial.selectionEnd = this.element.selectionEnd;

    const start = () => {
      this.element.focus();
      if (
        this.element.tagName === 'TEXTAREA' ||
        this.element.tagName === 'INPUT'
      ) {
        if (mode === 'replace_all') {
          this.element.readOnly = true;
          loaderInterval = setInterval(() => {
            this.updateContent(loaderCharacters[index], 'replace_all');
            index = (index + 1) % loaderCharacters.length;
            this.element.dispatchEvent(
              new Event('input', { bubbles: true, cancelable: true })
            );
          }, interval);
        }
      }
    };

    const cancelHandler = (event) => {
      if (event.ctrlKey && event.key === 'c') {
        isCancelled = true;
        stop(this.inital.content);
        // todo: it would be nice to cancel the fetch here
      }
    };

    window.addEventListener('keydown', cancelHandler);

    const stop = (value) => {
      clearInterval(loaderInterval);
      window.removeEventListener('keydown', cancelHandler);
      this.element.readOnly = false;
      this.updateContent(value, mode);
      this.element.dispatchEvent(
        new Event('input', { bubbles: true, cancelable: true })
      );
    };

    return {
      start,
      stop,
      isCancelled: () => isCancelled,
    };
  },
  _getContent() {
    if (!this.isSupportedElement()) return null;

    if (this.element.isContentEditable) {
      return this._getCleanTextFromContentEditable();
    } else {
      return this.element.value || '';
    }
  },
  _getCleanTextFromContentEditable() {
    const clone = this.element.cloneNode(true);
    return clone.textContent || '';
  },
  _replaceAll(content) {
    if (this.element.isContentEditable) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(this.element);
      selection.removeAllRanges();
      selection.addRange(range);

      setTimeout(() => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/plain', content);

        const pasteEvent = new ClipboardEvent('paste', {
          bubbles: true,
          cancelable: true,
          clipboardData: clipboardData,
        });

        this.element.dispatchEvent(pasteEvent);
      }, 50);
    } else {
      this.element.value = content;
    }
  },
  _replaceSelection(content) {
    if (this.element.isContentEditable) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(this.element);
      selection.removeAllRanges();
      selection.addRange(range);

      setTimeout(() => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/plain', content);

        const pasteEvent = new ClipboardEvent('paste', {
          bubbles: true,
          cancelable: true,
          clipboardData: clipboardData,
        });

        this.element.dispatchEvent(pasteEvent);
      }, 50);
    } else {
      const start = this.initial.selectionStart;
      const end = this.initial.selectionEnd;
      const value = this.initial.content;

      this.element.value = value.slice(0, start) + content + value.slice(end);
      this.element.selectionStart = this.element.selectionEnd =
        start + content.length;
    }
  },
  _insertAtEnd(content) {
    if (this.element.isContentEditable) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(this.element);
      selection.removeAllRanges();
      selection.addRange(range);

      setTimeout(() => {
        const clipboardData = new DataTransfer();
        clipboardData.setData('text/plain', this.initial.content + content);

        const pasteEvent = new ClipboardEvent('paste', {
          bubbles: true,
          cancelable: true,
          clipboardData: clipboardData,
        });

        this.element.dispatchEvent(pasteEvent);
      }, 50);
    } else {
      const value = this.initial.content;
      this.element.value = value + '\n\n' + content;
      this.element.selectionStart = this.element.selectionEnd =
        this.element.value.length;
    }
  },
});

const loadOptions = async () => {
  const prompts = await getAll('opale-prompt');

  const options = [
    ...prompts.map(({ icon, title, prompt: system, mode }) => ({
      icon,
      value: title.toLowerCase(),
      fn: (user) => gemini(system, user),
      mode,
    })),
    {
      icon: '🇬🇧',
      value: 'english',
      fn: (user) => gemini('Translate to English', user),
      mode: 'replace_all',
    },
    {
      icon: '🇨🇳',
      value: 'mandarin',
      fn: (user) => gemini('Translate to Mandarin', user),
      mode: 'replace_all',
    },
    {
      icon: '🇮🇳',
      value: 'hindi',
      fn: (user) => gemini('Translate to Hindi', user),
      mode: 'replace_all',
    },
    {
      icon: '🇪🇸',
      value: 'spanish',
      fn: (user) => gemini('Translate to Spanish', user),
      mode: 'replace_all',
    },
    {
      icon: '🇸🇦',
      value: 'arabic',
      fn: (user) => gemini('Translate to Arabic', user),
      mode: 'replace_all',
    },
    {
      icon: '🇫🇷',
      value: 'french',
      fn: (user) => gemini('Translate to French', user),
      mode: 'replace_all',
    },
    {
      icon: '🇧🇩',
      value: 'bengali',
      fn: (user) => gemini('Translate to Bengali', user),
      mode: 'replace_all',
    },
    {
      icon: '🇵🇹',
      value: 'portuguese',
      fn: (user) => gemini('Translate to Portuguese', user),
      mode: 'replace_all',
    },
    {
      icon: '🇩🇪',
      value: 'german',
      fn: (user) => gemini('Translate to German', user),
      mode: 'replace_all',
    },
    {
      icon: '🇮🇹',
      value: 'italian',
      fn: (user) => gemini('Translate to Italian', user),
      mode: 'replace_all',
    },
    {
      icon: '🇷🇺',
      value: 'russian',
      fn: (user) => gemini('Translate to Russian', user),
      mode: 'replace_all',
    },
    {
      icon: '🇳🇱',
      value: 'dutch',
      fn: (user) => gemini('Translate to Dutch', user),
      mode: 'replace_all',
    },
    {
      icon: '🇵🇱',
      value: 'polish',
      fn: (user) => gemini('Translate to Polish', user),
    },
  ];
  return options;
};

const keyboard = (event, available, action) => ({
  ['Tab']: () => {
    if (available) {
      event.preventDefault();
      action._next();
    }
  },
  ['ArrowUp']: () => {
    if (available) {
      event.preventDefault();
      action._previous();
    }
  },
  ['ArrowDown']: () => {
    if (available) {
      event.preventDefault();
      action._next();
    }
  },
  ['Enter']: () => {
    if (available) {
      event.preventDefault();
      action._run();
    }
  },
});
const createSuggestionItem = (
  option,
  currentIndex,
  getSelectedIndex,
  action
) => {
  const isHover = {
    status: false,
    setStatus(status) {
      this.status = status;
    },
  };
  const suggestionItem = htmlElementCreator.suggestionItem(
    `${option.icon} ${option.value}`
  );
  const select = () => {
    suggestionItem.style.backgroundColor = isHover.status
      ? backgroundColor.hover
      : backgroundColor.selected;
  };
  const deselect = () => {
    suggestionItem.style.backgroundColor = isHover.status
      ? backgroundColor.hover
      : backgroundColor.default;
  };
  const hover = () => {
    suggestionItem.style.backgroundColor = backgroundColor.hover;
    isHover.setStatus(true);
  };
  const unhover = () => {
    suggestionItem.style.backgroundColor =
      getSelectedIndex() === currentIndex
        ? backgroundColor.selected
        : backgroundColor.default;
    isHover.setStatus(false);
  };
  const click = action._click;
  suggestionItem.addEventListener('click', click);
  suggestionItem.addEventListener('mouseover', hover);
  suggestionItem.addEventListener('mouseout', unhover);
  return {
    option: option,
    element: suggestionItem,
    deselect,
    select,
    hover,
    unhover,
  };
};
const suggestionsHandler = (inputElement, suggestionsContainer, run, state) => {
  let index = -1;
  let items = [];
  const available = () => index >= 0;
  const _select = (newIndex) => {
    if (available()) {
      items[index].deselect();
    }
    items[newIndex].select();
    index = newIndex;
  };
  const _previous = () => {
    const previousIndex = (index - 1 + items.length) % items.length;
    _select(previousIndex);
  };
  const _next = () => {
    const nextIndex = (index + 1) % items.length;
    _select(nextIndex);
  };
  const _run = async () => {
    if (available()) {
      const selectedItem = items[index];
      run(selectedItem.option);
    }
  };
  return {
    input() {
      const query = inputElement.value.toLowerCase();
      suggestionsContainer.innerHTML = '';
      items = state.options
        .filter((option) => option.value.toLowerCase().startsWith(query))
        .slice(0, 3)
        .map((option, currentIndex) =>
          createSuggestionItem(option, currentIndex, () => index, {
            _click: () => {
              _select(currentIndex);
              _run();
            },
          })
        );
      items.forEach((item) => suggestionsContainer.appendChild(item.element));
      if (items.length) items[0].select();
      index = items.length > 0 ? 0 : -1;
    },
    keydown(event) {
      const actions = keyboard(event, available(), {
        _next: _next,
        _previous: _previous,
        _run: _run,
      });
      const action = actions[event.key];
      if (action) {
        action();
      }
    },
    reset() {
      inputElement.value = '';
      items = [];
      index = -1;
      suggestionsContainer.innerHTML = '';
    },
  };
};

const dynamicSearchBar = async () => {
  const style = htmlElementCreator.style();
  const inputElement = htmlElementCreator.input('custom-search-input');
  const suggestionsContainer = htmlElementCreator.suggestions(
    'suggestions-container'
  );
  const container = htmlElementCreator.container('dynamic-search-bar');
  container.appendChild(inputElement);
  container.appendChild(suggestionsContainer);
  container.appendChild(style);

  const optionValues = await loadOptions();
  const state = {
    _options: optionValues,
    _input: null,
    get input() {
      return this._input;
    },
    setInput(input) {
      this._input = input;
    },
    get options() {
      return this._options;
    },
    update(state) {
      this._state = state;
    },
  };

  window.addEventListener('focus', async () => {
    const updatedOptions = await loadOptions();
    state.update(updatedOptions);
  });

  const isOpen = () => {
    return document.contains(container);
  };
  const _close = () => {
    if (isOpen()) {
      document.removeEventListener('keydown', _escape);
      container.removeEventListener('focusout', _focusout);
      container.remove();
      suggestions.reset();
      if (state.input && state.input.element) state.input.element.focus();
      state.setInput(null);
    }
  };

  const _open = () => {
    if (!isOpen()) {
      const input = ActiveInputManager();
      if (input.isSupportedElement()) {
        state.setInput(input);
        document.body.appendChild(container);
        inputElement.focus();
        document.addEventListener('keydown', _escape);
        container.addEventListener('focusout', _focusout);
      } else {
        showNotification('Oops! Click something editable!');
      }
    }
  };

  const _run = async (item) => {
    const input = state.input;
    _close();
    if (input && input.element && item && item.fn) {
      const initialContent = input.content;
      const loader = input.useLoader(item.mode);

      try {
        loader.start();
        const prompt =
          item.mode === 'replace_selection'
            ? input.selectedContent
            : input.content;
        const result = await item.fn(prompt);
        if (!loader.isCancelled()) {
          loader.stop(result);
        }
      } catch (error) {
        console.error(`An error occured: ${error}`);
        loader.stop(initialContent);
      }
    }
  };

  const _escape = (event) => {
    if (event.key === 'Escape') {
      _close();
    }
  };
  const _focusout = (event) => {
    const relatedTarget = event.relatedTarget;
    if (!container.contains(relatedTarget)) {
    }
  };
  const suggestions = suggestionsHandler(
    inputElement,
    suggestionsContainer,
    _run,
    state
  );
  inputElement.addEventListener('input', suggestions.input);
  inputElement.addEventListener('keydown', suggestions.keydown);
  return {
    get isOpen() {
      return isOpen();
    },
    toggle() {
      if (this.isOpen) {
        _close();
      } else {
        _open();
      }
    },
    _open,
    _close,
  };
};

/* stop common */

export const useSearchBar = async () => {
  const searchBar = await dynamicSearchBar();

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggle-in-settings') {
      searchBar.toggle();
    }
  });

  return searchBar;
};
