## Setup

### Installation Steps

1. Install the Chrome extension from the GitHub repository
2. Configure Keyboard Shortcut
 - Default shortcut: Ctrl + Shift + L
 - Customize if needed in browser extension settings

### Prerequisites

 - Ensure Gemini Nano Prompt API is available in your browser

 1. Use a compatible Chrome version:
   - Install a version of Chrome that supports Gemini Nano, such as Chrome Canary Version 133.
   - Compatible on Windows, Mac, or Linux.

 2. Enable necessary Chrome flags:
   - Navigate to `chrome://flags/#optimization-guide-on-device-model` and set it to **Enabled BypassPerfRequirement**.
   - Navigate to `chrome://flags/#prompt-api-for-gemini-nano` and set it to **Enabled**.
   - Click **Relaunch** or restart Chrome to apply the changes.

 3. Verify setup:
   - Open the browser terminal and run:
     ```javascript
     /* shoud output 'no' | readily' | 'after-download' */
     await chrome.aiOriginTrial.languageModel.capabilities()
     ```

 4. Install the model if necessary:
   - Follow the official documentation to install the model.
   - Ensure at least **20GB of free space** on your desktop.
   - Create a new instance of `languageModel` and wait for the setup to complete.

 For additional information, refer to the [Prompt API - Google Chrome Documentation](https://developer.chrome.com/docs/extensions/ai/prompt-api).


### Initial Setup

1. Click the extension icon (multicolored, top left corner)
2. Add Example Prompts
 - Use the "Example" button for quick start
 - Or create custom prompts for your specific use case

### Prompt Creation

- Select an icon
- Choose version 1.0
- Add a title
- Define the tool's role (system prompt) (Example: "create a markdown project template")
- Keep "Replace All" option as default

### Usage Workflow

- Navigate to your favorite website with a text editor
- Place cursor (focus) in input or textarea
- Briefly describe your task 

Example: "explain to my colleagues how great this extension is"

> [!NOTE]
> The extension can't work with google doc, google slide and some applications, 
> as they don't use standard web inputs (canvas tag) and some others apps, that don't 
> implement standard text input fields (like input, textarea, editableContent).
> you can use all the applications shown in the video and many others


### Trigger Shortcut

- Press Ctrl + Shift + L (or your custom shortcut)
- Type first letters of your prompt title
- Select your tool
- Watch the magic happen! ✨ 

You should ensure that a solid foundation to clearly explain to your colleagues how effective this application is has been created. If this isn't the case, the extension doesn't work, and it's an absolute disaster..


### Pro Tips

- Experiment with different prompts
- Customize to fit your workflow
- Explore the flexibility of instant AI assistant
