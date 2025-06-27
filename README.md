# YouTube Playlist Shortcut

A Chrome extension that adds a keyboard shortcut to quickly toggle the "Download" playlist for the current YouTube video.

## Features

- Toggle the "Download" playlist for the current video with a keyboard shortcut.
- Works on any YouTube video page.
- Shows notifications for success or errors.

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (top right).
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

- Go to any YouTube video page.
- Press **Ctrl+Shift+S** (Windows/Linux) or **Command+Shift+S** (Mac) to toggle the "Download" playlist for the current video.
- A notification will appear indicating success or failure.

## Keyboard Shortcut

- **Default:**
  - Windows/Linux: `Ctrl+Shift+S`
  - Mac: `Command+Shift+S`
- You can change the shortcut in Chrome's extension shortcuts settings.

## How it works

- The extension injects a content script into YouTube pages.
- When the shortcut is pressed, it simulates clicking the "Save" button and toggles the "Download" playlist.
- The playlist dialog is automatically closed after toggling.

## Troubleshooting

- Make sure you are on a YouTube video page.
- Ensure you have a playlist named "Download" in your YouTube account.
- If the shortcut doesn't work, check Chrome's extension shortcut settings.
