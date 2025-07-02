// YouTube Playlist Shortcut Tool
// Handles toggling a configurable playlist for YouTube videos

let currentPlaylistName = 'Download' // Default value

// Load playlist name from storage when script loads
chrome.storage.sync.get(
  {
    playlistName: 'Download',
  },
  function (items) {
    currentPlaylistName = items.playlistName
  }
)

// Listen for storage changes to update playlist name in real-time
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (namespace === 'sync' && changes.playlistName) {
    currentPlaylistName = changes.playlistName.newValue
  }
})

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (
    request.tool === 'youtube-playlist' &&
    request.action === 'toggle-playlist'
  ) {
    togglePlaylistCheckbox()
    sendResponse({ success: true })
  }
})

// Function to save directly to the configured playlist
function togglePlaylistCheckbox() {
  // Check if the save dialog is already open
  const dialogOpen = document.querySelector(
    'ytd-playlist-add-to-option-renderer'
  )

  if (dialogOpen) {
    // Dialog is open, just toggle the configured playlist checkbox
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
        "Save button not found. Make sure you're on a video page.",
        'youtube-playlist'
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
    const targetPlaylist = findTargetPlaylist()

    if (targetPlaylist || playlists.length > 0) {
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
      showNotification(
        'Could not load playlists. Try again in a moment.',
        'youtube-playlist'
      )
    }
  }

  setTimeout(checkForPlaylists, 300)
}

// Helper function to find the target playlist
function findTargetPlaylist() {
  const checkboxes = document.querySelectorAll(
    'ytd-playlist-add-to-option-renderer'
  )

  for (const checkbox of checkboxes) {
    const label = checkbox.querySelector('#label, yt-formatted-string')
    if (
      label &&
      label.textContent
        .trim()
        .toLowerCase()
        .includes(currentPlaylistName.toLowerCase())
    ) {
      return checkbox.querySelector('tp-yt-paper-checkbox')
    }
  }

  // Fallback: look for any checkbox with the playlist name in aria-label or title
  return document.querySelector(
    `tp-yt-paper-checkbox[aria-label*="${currentPlaylistName}"], ytd-playlist-add-to-option-renderer:has([title*="${currentPlaylistName}"]) tp-yt-paper-checkbox`
  )
}

function clickPlaylistCheckbox() {
  const targetCheckbox = findTargetPlaylist()

  if (targetCheckbox) {
    targetCheckbox.click()
    showNotification(
      `"${currentPlaylistName}" playlist toggled!`,
      'youtube-playlist'
    )
  } else {
    showNotification(
      `"${currentPlaylistName}" playlist not found. Checking again...`,
      'youtube-playlist'
    )

    // Try one more time after a short delay
    setTimeout(() => {
      const retryCheckbox = findTargetPlaylist()
      if (retryCheckbox) {
        retryCheckbox.click()
        showNotification(
          `"${currentPlaylistName}" playlist toggled!`,
          'youtube-playlist'
        )
      } else {
        showNotification(
          `"${currentPlaylistName}" playlist still not found. Make sure it exists in your playlists or check your settings.`,
          'youtube-playlist'
        )
      }
    }, 500)
  }
}

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

// Function to show a brief notification
function showNotification(message, toolId) {
  // Remove any existing notifications from this tool
  const existingNotification = document.querySelector(`[data-tool="${toolId}"]`)
  if (existingNotification) {
    existingNotification.remove()
  }

  const notification = document.createElement('div')
  notification.textContent = `[YouTube Playlist] ${message}`
  notification.setAttribute('data-tool', toolId)
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ff0000;
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
