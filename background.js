// Handle keyboard shortcuts from manifest commands
chrome.commands.onCommand.addListener((command) => {
  if (command === 'toggle-playlist') {
    // Send message to active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url.includes('youtube.com')) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'toggle-playlist' })
      }
    })
  }
})
