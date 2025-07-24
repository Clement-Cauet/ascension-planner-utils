<p align="center">
  <img src="https://github.com/user-attachments/assets/a54ae38d-d0b3-44f1-9610-370240dda4a0" alt="Genshin logo" width="200px">
</p>

## About Ascension Planner Utils

A Tampermonkey userscript that enhances the [Genshin Impact Ascension Planner](https://genshin-center.com/planner) by automatically calculating and displaying total resin and days remaining for all planned materials.
Ascension Planner Utils adds a convenient summary section to your planner interface that:

- Automatically scans all item panels on the page
- Calculates total resin required across all materials
- Calculates total days needed for farming
- Displays the summary in a clean, integrated UI element
- Updates calculations when you interact with the page
- Removes unwanted advertisement elements for a cleaner experience

<p align="center">
  <img width="341" height="114" alt="Copie d'écran_20250724_154315" src="https://github.com/user-attachments/assets/61a7fef2-17c0-43c3-872e-369811df6182" width="200px" />
</p>

## Prerequisites

You'll need **Tampermonkey** browser extension installed:

- **Chrome/Edge**: [Install from Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Install from Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Safari**: [Install from App Store](https://apps.apple.com/us/app/tampermonkey/id1482490089)

For more information and other browsers, visit: https://www.tampermonkey.net/

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ascension-planner-utils.git
   cd ascension-planner-utils
   ```

2. **Import the script into Tampermonkey**
   - Open Tampermonkey dashboard in your browser
   - Go to **Utilities** tab
   - Click **Import from file**
   - Select the `script.js` file from the cloned repository
   - Click **Install** when the script editor opens

3. **Configure the script**
   - Save the script (Ctrl+S or Cmd+S)

### Usage

1. Navigate to your Genshin Impact Ascension Planner page
2. The script will automatically activate and display a "Remaining" summary section
3. The summary shows total resin and days calculated from all your planned materials

## Contributing

Feel free to submit issues and enhancement requests!
