var link = 'https://prototab.me';
chrome.tabs.onCreated.addListener(function(newtab) {
  var isNewTab = newtab.url == 'chrome://newtab/';
  if (isNewTab)
    chrome.tabs.update(newtab.id, {url: link});
});
