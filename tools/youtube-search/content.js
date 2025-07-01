// YouTube Search Tool
// Searches selected text on YouTube when Ctrl+Y is pressed

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (
    request.tool === 'youtube-search' &&
    request.action === 'search-youtube'
  ) {
    searchSelectedTextOnYouTube()
    sendResponse({ success: true })
  }
})

// Alternative: Listen for direct keyboard events (backup method)
document.addEventListener('keydown', (event) => {
  // Ctrl+Y (or Cmd+Y on Mac)
  if ((event.ctrlKey || event.metaKey) && event.key === 'y') {
    // Check if we're not in an input field
    const activeElement = document.activeElement
    const isInputField =
      activeElement &&
      (activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.contentEditable === 'true')

    // Only proceed if we're not in an input field
    if (!isInputField) {
      event.preventDefault()
      searchSelectedTextOnYouTube()
    }
  }
})

function searchSelectedTextOnYouTube() {
  const selectedText = getSelectedText()

  if (selectedText && selectedText.trim().length > 0) {
    const query = selectedText.trim()

    // Show notification
    showNotification(`Searching YouTube for: "${query}"`, 'youtube-search')

    // Send message to background script to open YouTube search
    chrome.runtime.sendMessage(
      {
        action: 'open-youtube-search',
        query: query,
      },
      (response) => {
        if (response && response.success) {
          console.log('YouTube search opened successfully')
        }
      }
    )
  } else {
    showNotification(
      'No text selected. Please select text first.',
      'youtube-search'
    )
  }
}

function getSelectedText() {
  let selectedText = ''

  // Get selected text from window selection
  if (window.getSelection) {
    selectedText = window.getSelection().toString()
  }
  // Fallback for older browsers
  else if (document.selection && document.selection.type !== 'Control') {
    selectedText = document.selection.createRange().text
  }

  return selectedText
}

// Function to show a brief notification
function showNotification(message, toolId) {
  // Remove any existing notifications from this tool
  const existingNotification = document.querySelector(`[data-tool="${toolId}"]`)
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement('div')
  notification.textContent = `[YouTube Search] ${message}`
  notification.setAttribute('data-tool', toolId)
  notification.style.cssText = `
    position: fixed;
    top: 60px;
    right: 20px;
    background: #1976d2;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 10000;
    font-size: 14px;
    opacity: 0.9;
    transition: opacity 0.3s;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.opacity = '0'
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 2000)
}
