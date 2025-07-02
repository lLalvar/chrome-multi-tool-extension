# Multi-Tool Chrome Extension

A collection of useful browser tools and shortcuts to enhance your browsing experience.

## 🛠️ Available Tools

### 1. YouTube Playlist Shortcut

- **Function**: Toggle any YouTube playlist for the current video
- **Shortcut**: `Ctrl+Shift+S` (Windows/Linux) or `Cmd+Shift+S` (Mac)
- **Usage**: Go to any YouTube video page and press the shortcut
- **Customization**: You can change the target playlist name in the extension settings
- **Default**: Targets the "Download" playlist (configurable)

### 2. YouTube Search

- **Function**: Search selected text on YouTube
- **Shortcut**: `Ctrl+Y` (Windows/Linux) or `Cmd+Y` (Mac)
- **Usage**: Select any text on any webpage and press the shortcut
- **Result**: Opens a new tab with YouTube search results for the selected text

## ⚙️ Extension Settings

You can customize the extension behavior through the settings page:

### How to Access Settings:

1. **Via Extension Popup**: Click the extension icon and select "Extension Settings"
2. **Via Chrome Menu**: Right-click the extension icon → "Options"
3. **Via Extensions Page**: Go to `chrome://extensions/` → Find "Multi-Tool Extension" → Click "Details" → "Extension options"

### Available Settings:

- **YouTube Playlist Name**: Change which playlist the shortcut targets (default: "Download")
  - Examples: "Watch Later", "Favorites", "Music", "Learning", etc.
  - Make sure the playlist exists in your YouTube account before using the shortcut

## 📁 Project Structure

```
multi-tool-extension/
├── manifest.json                 # Extension manifest
├── background.js                 # Main background script
├── icons/                        # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── popup/                        # Extension popup
│   ├── popup.html
│   └── popup.js
├── options/                      # Settings page
│   ├── options.html
│   └── options.js
├── tools/                        # Individual tools
│   ├── youtube-playlist/         # YouTube playlist tool
│   │   └── content.js
│   └── youtube-search/           # YouTube search tool
│       └── content.js
└── README.md
```

## 🚀 Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the extension directory
5. The extension will be installed and ready to use
6. **Configure your settings**: Click the extension icon and go to "Extension Settings" to customize your playlist name

## 🎯 Quick Setup Guide

1. **Install the extension** (see installation steps above)
2. **Create or identify your target playlist** on YouTube (e.g., "Download", "Watch Later")
3. **Configure the extension**:
   - Click the extension icon in your browser
   - Click "Extension Settings"
   - Enter your playlist name in the "Playlist Name" field
   - Click "Save Settings"
4. **Start using the shortcuts**!

## 🔧 Adding New Tools

To add a new tool to the extension:

1. **Create a new tool folder** in `tools/`:

   ```
   tools/your-new-tool/
   └── content.js
   ```

2. **Update manifest.json**:

   - Add content scripts for your tool
   - Add keyboard shortcuts if needed

3. **Update background.js**:

   - Add command handling for your tool
   - Add message routing

4. **Create your content script**:

   - Follow the existing pattern
   - Use unique tool IDs for notifications
   - Handle messages from background script

5. **Update popup** (optional):
   - Add your tool to the popup UI
   - Update version number

## 🔨 Customization

### Changing Keyboard Shortcuts

1. Go to `chrome://extensions/shortcuts`
2. Find "Multi-Tool Extension"
3. Click the edit button next to the shortcut you want to change
4. Set your preferred key combination

### Modifying Tool Behavior

Each tool is self-contained in its own folder. Edit the respective `content.js` file to modify behavior:

- `tools/youtube-playlist/content.js` - YouTube playlist functionality
- `tools/youtube-search/content.js` - YouTube search functionality

### Playlist Name Configuration

- Access via extension popup → "Extension Settings"
- Change the playlist name to any playlist you have in your YouTube account
- Settings are automatically synced across Chrome browsers when logged in
- Changes take effect immediately without needing to reload pages

## 🛡️ Permissions

The extension requires the following permissions:

- `activeTab` - To interact with the current tab
- `tabs` - To open new tabs for YouTube search
- `storage` - To save your custom settings (like playlist name)

## 🐛 Troubleshooting

### YouTube Playlist Tool

- Ensure you're on a YouTube video page
- **Check your playlist name**: Make sure the playlist exists in your YouTube account and the name matches exactly what you configured in settings
- Make sure you're logged into YouTube
- **Verify settings**: Go to extension settings and confirm the playlist name is correct

### YouTube Search Tool

- Make sure text is selected before using the shortcut
- The shortcut won't work when typing in input fields (this is intentional)
- Check that pop-ups are not blocked in your browser

### Settings Not Saving

- Check that you have internet connection (settings sync with Chrome)
- Try closing and reopening the settings page
- Check Chrome's extension permissions

## 📋 Features

- **Modular Architecture**: Each tool is separate and maintainable
- **Visual Notifications**: Get feedback for all actions
- **Popup Interface**: View all available tools and shortcuts
- **Settings Page**: Customize extension behavior
- **Keyboard Shortcuts**: Quick access without mouse interaction
- **Cross-Platform**: Works on Windows, Mac, and Linux
- **Settings Sync**: Your preferences sync across Chrome browsers

## 🔄 Version History

- **v1.1**: Added configurable playlist names and settings page
- **v1.0**: Initial release with YouTube Playlist and YouTube Search tools

## 🎨 Extension Icon

The extension features a beautiful gradient icon with a tool symbol and YouTube branding, making it easy to identify in your browser toolbar.

## 🤝 Contributing

To contribute a new tool:

1. Fork the repository
2. Create a new tool folder following the existing pattern
3. Update the necessary configuration files
4. Test your tool thoroughly
5. Submit a pull request

## 💡 Tips for Best Experience

1. **Create a dedicated playlist**: Consider creating a specific playlist for the extension (like "Extension Downloads" or "Quick Save")
2. **Use descriptive names**: Choose playlist names that are unique and easy to remember
3. **Check spelling**: Make sure the playlist name in settings matches exactly with your YouTube playlist
4. **Keyboard shortcuts**: Learn the shortcuts for fastest workflow (`Ctrl+Shift+S` for playlist, `Ctrl+Y` for search)

## 📝 License

This project is open source and available under the MIT License.
