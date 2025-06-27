// Listen for keyboard shortcuts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle-playlist') {
    togglePlaylistCheckbox()
  }
})

// Function to save directly to Download playlist
function togglePlaylistCheckbox() {
  // Check if the save dialog is already open
  const dialogOpen = document.querySelector(
    'ytd-playlist-add-to-option-renderer'
  )

  if (dialogOpen) {
    // Dialog is open, just toggle the Download checkbox
    clickPlaylistCheckbox()
  } else {
    // Dialog is not open, open it and wait for it to fully load
    const saveButton = document.querySelector(
      '.ytp-save-button, [aria-label*="Save"], [title*="Save"]'
    )

    if (saveButton) {
      // Click save button to open dialog
      saveButton.click()

      // Wait for dialog to appear and playlists to load, then try multiple times
      waitForPlaylistsToLoad(() => {
        clickPlaylistCheckbox()

        // Close the dialog after toggling
        setTimeout(() => {
          closePlaylistDialog()
        }, 200)
      })
    } else {
      showNotification(
        "Save button not found. Make sure you're on a video page."
      )
    }
  }
}

// Function to wait for playlists to load with retry logic
function waitForPlaylistsToLoad(callback, attempts = 0, maxAttempts = 10) {
  const checkForPlaylists = () => {
    const playlists = document.querySelectorAll(
      'ytd-playlist-add-to-option-renderer'
    )
    const downloadPlaylist = findDownloadPlaylist()

    if (downloadPlaylist || playlists.length > 0) {
      // Found playlists, execute callback
      callback()
    } else if (attempts < maxAttempts) {
      // Not found yet, try again
      attempts++
      setTimeout(() => {
        waitForPlaylistsToLoad(callback, attempts, maxAttempts)
      }, 200)
    } else {
      // Max attempts reached, show error
      showNotification('Could not load playlists. Try again in a moment.')
    }
  }

  setTimeout(checkForPlaylists, 300)
}

// Helper function to find the Download playlist
function findDownloadPlaylist() {
  const checkboxes = document.querySelectorAll(
    'ytd-playlist-add-to-option-renderer'
  )

  for (const checkbox of checkboxes) {
    const label = checkbox.querySelector('#label, yt-formatted-string')
    if (label && label.textContent.trim().toLowerCase().includes('download')) {
      return checkbox.querySelector('tp-yt-paper-checkbox')
    }
  }

  // Fallback: look for any checkbox with "Download" in aria-label or title
  return document.querySelector(
    'tp-yt-paper-checkbox[aria-label*="Download"], ytd-playlist-add-to-option-renderer:has([title*="Download"]) tp-yt-paper-checkbox'
  )
}

function clickPlaylistCheckbox() {
  const downloadCheckbox = findDownloadPlaylist()

  if (downloadCheckbox) {
    downloadCheckbox.click()
    showNotification('Download playlist toggled!')
  } else {
    showNotification('Download playlist not found. Checking again...')

    // Try one more time after a short delay
    setTimeout(() => {
      const retryCheckbox = findDownloadPlaylist()
      if (retryCheckbox) {
        retryCheckbox.click()
        showNotification('Download playlist toggled!')
      } else {
        showNotification(
          'Download playlist still not found. Make sure it exists in your playlists.'
        )
      }
    }, 500)
  }
}

// Function to show a brief notification
function showNotification(message) {
  const notification = document.createElement('div')
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #333;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    z-index: 10000;
    font-size: 14px;
    opacity: 0.9;
    transition: opacity 0.3s;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.opacity = '0'
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 2000)
}

// Alternative: Listen for direct keyboard events (backup method)
document.addEventListener('keydown', (event) => {
  // Ctrl+Shift+S (or Cmd+Shift+S on Mac)
  if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'S') {
    event.preventDefault()
    togglePlaylistCheckbox()
  }
})

// Function to close the playlist dialog
function closePlaylistDialog() {
  // Try multiple methods to close the dialog

  // Method 1: Click outside the dialog
  const backdrop = document.querySelector('tp-yt-iron-overlay-backdrop, #scrim')
  if (backdrop) {
    backdrop.click()
    return
  }

  // Method 2: Press Escape key
  document.dispatchEvent(
    new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
      which: 27,
      bubbles: true,
    })
  )

  // Method 3: Click close button if it exists
  const closeButton = document.querySelector(
    '[aria-label*="Close"], [title*="Close"], .close-button'
  )
  if (closeButton) {
    closeButton.click()
  }

  // Method 4: Click anywhere outside the dialog area
  setTimeout(() => {
    const videoPlayer = document.querySelector(
      '#movie_player, .html5-video-player'
    )
    if (videoPlayer) {
      videoPlayer.click()
    }
  }, 50)
}

// Background script communication handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggle-playlist') {
    togglePlaylistCheckbox()
    sendResponse({ success: true })
  }
})
