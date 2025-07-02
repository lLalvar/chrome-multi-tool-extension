// Popup script for Multi-Tool Extension
document.addEventListener('DOMContentLoaded', function () {
  const statusElement = document.getElementById('status')
  const settingsButton = document.getElementById('settingsButton')

  // Check if we're on a relevant page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0]) {
      const url = tabs[0].url
      let status = 'Ready to use!'

      if (url.includes('youtube.com/watch')) {
        status = '📺 YouTube video detected - Playlist tool ready!'
      } else if (url.includes('youtube.com')) {
        status = '📺 YouTube detected - Search tool ready!'
      } else {
        status = '🔍 Search tool ready on this page!'
      }

      statusElement.textContent = status
    }
  })

  // Settings button click handler
  settingsButton.addEventListener('click', function () {
    // Visual feedback
    settingsButton.style.transform = 'translateY(0)'
    setTimeout(() => {
      settingsButton.style.transform = 'translateY(-1px)'
    }, 100)

    // Open options page
    chrome.runtime.openOptionsPage()
  })

  // Add click handlers for tools (optional - they work via shortcuts)
  const tools = document.querySelectorAll('.tool')
  tools.forEach((tool, index) => {
    tool.addEventListener('click', function () {
      // Visual feedback
      tool.style.background = 'rgba(255, 255, 255, 0.3)'
      setTimeout(() => {
        tool.style.background = 'rgba(255, 255, 255, 0.1)'
      }, 200)

      // Send appropriate command
      if (index === 0) {
        // YouTube Playlist tool
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (tabs[0] && tabs[0].url.includes('youtube.com')) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: 'toggle-playlist',
                tool: 'youtube-playlist',
              })
            }
          }
        )
      } else if (index === 1) {
        // YouTube Search tool
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (tabs[0]) {
              chrome.tabs.sendMessage(tabs[0].id, {
                action: 'search-youtube',
                tool: 'youtube-search',
              })
            }
          }
        )
      }
    })
  })
})
