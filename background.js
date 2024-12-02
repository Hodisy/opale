chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-opale') {
    toggleSearchBar();
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('home.html') });
});

const toggleSearchBar = () => {
  console.log('toggle');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      const tabId = tabs[0].id;
      const tabUrl = tabs[0].url;

      console.log('toggle2');

      if (tabUrl.startsWith('chrome-extension://')) {
        console.log('toggle3');

        chrome.tabs.sendMessage(tabId, { action: 'toggle-in-settings' });
        return;
      }

      if (tabUrl.startsWith('chrome://') || tabUrl.startsWith('about://')) {
        console.warn(
          'Attempted to toggle search bar on a protected page:',
          tabUrl
        );
        chrome.tabs.create({ url: chrome.runtime.getURL('home.html') });
        return;
      }

      chrome.tabs.sendMessage(tabId, { action: 'toggle' });
    } else {
      console.error('No active tabs found.');
    }
  });
};
