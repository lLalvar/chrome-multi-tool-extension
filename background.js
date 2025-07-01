// Main background script - handles all keyboard shortcuts and routing
chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]) return

    const tab = tabs[0]

    switch (command) {
      case 'toggle-playlist':
        // Only send to YouTube tabs
        if (tab.url.includes('youtube.com')) {
          chrome.tabs.sendMessage(tab.id, {
            action: 'toggle-playlist',
            tool: 'youtube-playlist',
          })
        }
        break

      case 'search-youtube':
        // Send to any tab for text selection
        chrome.tabs.sendMessage(tab.id, {
          action: 'search-youtube',
          tool: 'youtube-search',
        })
        break
    }
  })
})

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'open-youtube-search') {
    // Open YouTube search in new tab
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      request.query
    )}`
    chrome.tabs.create({ url: searchUrl })
    sendResponse({ success: true })
  }
})
