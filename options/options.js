// Options page script for Multi-Tool Extension

document.addEventListener('DOMContentLoaded', function () {
  const playlistNameInput = document.getElementById('playlistName')
  const saveButton = document.getElementById('saveButton')
  const statusMessage = document.getElementById('statusMessage')

  // Load saved settings
  loadSettings()

  // Save button click handler
  saveButton.addEventListener('click', saveSettings)

  // Enter key handler for input
  playlistNameInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      saveSettings()
    }
  })

  function loadSettings() {
    chrome.storage.sync.get(
      {
        playlistName: 'Download', // Default value
      },
      function (items) {
        playlistNameInput.value = items.playlistName
      }
    )
  }

  function saveSettings() {
    const playlistName = playlistNameInput.value.trim()

    if (!playlistName) {
      showStatus('Please enter a playlist name', 'error')
      return
    }

    // Save to Chrome storage
    chrome.storage.sync.set(
      {
        playlistName: playlistName,
      },
      function () {
        if (chrome.runtime.lastError) {
          showStatus(
            'Error saving settings: ' + chrome.runtime.lastError.message,
            'error'
          )
        } else {
          showStatus('Settings saved successfully! ✅', 'success')
        }
      }
    )
  }

  function showStatus(message, type) {
    statusMessage.textContent = message
    statusMessage.className = `status-message ${type}`

    // Hide after 3 seconds
    setTimeout(() => {
      statusMessage.className = 'status-message'
    }, 3000)
  }
})
