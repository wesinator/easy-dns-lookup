chrome.contextMenus.create({
  id: 'open-dns-page',
  title: 'Open DNS lookup page in a separate tab',
  contexts: ['browser_action']
})

function contextClick(info, tab) {
  const { menuItemId } = info

  if (menuItemId === 'open-dns-page') {
    browser.tabs.create({url: "popup.html"});
  }
}

chrome.contextMenus.onClicked.addListener(contextClick);
