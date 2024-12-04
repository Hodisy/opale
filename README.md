## About Opale AI Search Bar

### Inspiration
The idea for **Opale AI Search Bar** was born from a desire to simplify how we work online. Too often, we juggle **multiple tools and workflows**, losing precious **time and focus**. Inspired by the convenience of **browser extensions** like Tampermonkey but powered by **cutting-edge AI**, Opale aims to bring **intelligence directly into your browser**, streamlining tasks like **writing, translating, and templating**—all in real-time.

### What it does

Opale is a dynamic, ergonomic, lightweight, and fast search bar integrated into every web page in your browser. It is also an interface that lets you create, add, modify, delete prompts you use daily for small tasks (writing emails, rephrasing messages, taking notes, drafting templates, writing snippets of code, etc.). Once you save a prompt, you can use it anywhere on the web and in (almost) all your favorite applications. Say goodbye to dedicated AI chat assistants for every need, infinite conversation histories, and repetitive discussions.

In short, Opale is just AI—nothing but AI—integrated seamlessly into your browser to provide instant assistance. No more endless lists of AI tools. With just a few clicks or a keyboard shortcut, you can:
- Generate reusable templates for a variety of tasks, from technical documentation to creative writing.
- Reformulate text for better clarity.
- Translate content in seconds.

Opale is your ultimate productivity companion, helping you work smarter, not harder.

<img src="https://github.com/user-attachments/assets/662ba649-389d-4170-9b37-bfcad34b0914" alt="Opale Chrome Extension" width="600">

### How we built it
We designed Opale with usability and flexibility at its core, using:
- **Chrome Extension Framework** to integrate directly with the browser.
- **Gemini Nano Prompt API** to power the AI capabilities.
- A user-friendly UI inspired by tools like Visual Studio Code, enabling seamless prompt creation and management.

We combined sleek and smooth visuals, like this homepage, to elevate your experience and ensure intuitive use of the extension:
<img src="https://github.com/user-attachments/assets/4cba8632-2993-40d9-957d-e94e82c9ff65" alt="Opale Home" width="600">



with robust and accessible functionality as seen in the search bar that lets you interact without a single click anywhere on the web where you need to with a lightweight, free and (privacy?) ai assistant.
<img src="https://github.com/user-attachments/assets/fa5c04c4-c0e5-42d4-9f55-3e9e0daefea1" alt="Opale Search Bar VsCode" width="600">

to deliver an effortless user experience.

### Challenges we ran into
Building Opale came with its fair share of challenges:
1. Ensuring compatibility with diverse web applications while navigating the limitations of non-standard inputs (e.g., Google Docs).
2. Streamlining the user interface to balance simplicity and functionality:
<img src="https://github.com/user-attachments/assets/ce388f4e-bf6f-4e60-8710-f863092953fc" alt="Opale Create Prompt UI" width="600">


### Accomplishments that we're proud of
We're particularly proud of:
- Enabling **custom reusable prompts** that adapt to any workflow.
- Creating a polished, intuitive interface:
<img src="https://github.com/user-attachments/assets/eb1486fa-b9dc-43fa-8401-fb93f57ed65b" alt="Opale Edit Css" width="600">

- Overcoming technical hurdles to provide a robust and reliable AI experience.

### What we learned
Building Opale taught us:
1. The importance of **user-centric design**—users want simple tools that fit into their existing workflows without friction.
2. How to manage **browser limitations** effectively, ensuring functionality in most text-based applications.

### What's next for Opale

- Integrate Chrome Translator and Summarizer APIs (currently, we rely solely on prompt-based solutions, which don't always perform well due to model restrictions).
- Extend support to more non-standard input fields, such as contentEditable elements (e.g., SlateJS), Monaco editor, and canvas-based applications like Google Suite.
- Enable LLM result streaming for an even smoother experience (this was planned but couldn’t be implemented due to time constraints).
- Improve Ctrl+Z and Ctrl+Shift+Z handling (the replacement of input values can sometimes delete the undo history).
- Introduce collaborative tools to allow teams to share prompts, workflows, and configurations seamlessly.
- Rewrite the codebase in TypeScript, build with esbuild, and test with Vitest (possibly using Playwright for end-to-end UI testing).
- Expand compatibility with various AI tools, including client-side APIs for translation, summarization, and more. Leverage advanced AI cloud models through user-provided API keys (e.g., Gemini 1.5) and integrate alternative large language models like GPT-4o-mini, Claude Haiku, and Mistral’s offerings (e.g., Mistral-small, Codestral).

#### Additional Ideas
- Show text generation history in settings.
- Leverage webpage context (e.g., extract tags, labels, input, or URL details) to enhance relevance.
- Improve the search bar engine to offer more pertinent suggestions and handle user input errors, spaces, and special characters.
- Allow the search bar to be repositioned on the page and styled differently (e.g., light mode, dark mode). Add F1, F2, F3 shortcuts for the top three suggestions to improve accessibility.
- Enhance search bar responsiveness for small screens and improve accessibility with ARIA labels.
- Offer custom agents with advanced workflows, including retrieval-augmented generation (RAG) supported by server-side memory platforms.
- Explore non-AI enhancements, such as script execution, redirection to specific pages, or adding versatile search bar features to streamline user workflows.

For more details (like [installation](https://github.com/Hodisy/opale/blob/main/docs/setup.md), usage, use cases, and compatible applications, etc.) about the application, check the YouTube video and the [GitHub repository](https://github.com/Hodisy/opale). thanks 💫

![opale-banner](https://github.com/user-attachments/assets/8a870ac1-9b89-405f-a82f-feb234ad041e)
