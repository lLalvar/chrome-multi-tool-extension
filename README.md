# Multi-Tool Chrome Extension

A collection of useful browser tools and shortcuts to enhance your browsing experience.

## 🛠️ Available Tools

### 1. YouTube Playlist Shortcut

- **Function**: Toggle the "Download" playlist for the current YouTube video
- **Shortcut**: `Ctrl+Shift+S` (Windows/Linux) or `Cmd+Shift+S` (Mac)
- **Usage**: Go to any YouTube video page and press the shortcut
- **Requirements**: You must have a playlist named "Download" in your YouTube account

### 2. YouTube Search

- **Function**: Search selected text on YouTube
- **Shortcut**: `Ctrl+Y` (Windows/Linux) or `Cmd+Y` (Mac)
- **Usage**: Select any text on any webpage and press the shortcut
- **Result**: Opens a new tab with YouTube search results for the selected text

## 📁 Project Structure

```
multi-tool-extension/
├── manifest.json                 # Extension manifest
├── background.js                 # Main background script
├── popup/                        # Extension popup
│   ├── popup.html
│   └── popup.js
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

## 🛡️ Permissions

The extension requires the following permissions:

- `activeTab` - To interact with the current tab
- `tabs` - To open new tabs for YouTube search

## 🐛 Troubleshooting

### YouTube Playlist Tool

- Ensure you're on a YouTube video page
- Make sure you have a playlist named "Download" in your account
- Check that you're logged into YouTube

### YouTube Search Tool

- Make sure text is selected before using the shortcut
- The shortcut won't work when typing in input fields (this is intentional)
- Check that pop-ups are not blocked in your browser

## 📋 Features

- **Modular Architecture**: Each tool is separate and maintainable
- **Visual Notifications**: Get feedback for all actions
- **Popup Interface**: View all available tools and shortcuts
- **Keyboard Shortcuts**: Quick access without mouse interaction
- **Cross-Platform**: Works on Windows, Mac, and Linux

## 🔄 Version History

- **v1.0**: Initial release with YouTube Playlist and YouTube Search tools

## 🤝 Contributing

To contribute a new tool:

1. Fork the repository
2. Create a new tool folder following the existing pattern
3. Update the necessary configuration files
4. Test your tool thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.
