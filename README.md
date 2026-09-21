# 🌿 EcoCode AI

EcoCode AI is a simple, beginner-friendly web project that reviews code for a few common patterns that can increase resource use. It presents suggestions and a **Green Score** to encourage more sustainable coding habits.

## ✨ Features

- VS Code-inspired dark interface with green sustainability accents
- Large code input editor
- AI-style suggestions for common efficiency concerns
- Green Score out of 100 with a visual progress bar
- Responsive layout for desktop and mobile
- Sustainability tips for writing more efficient code

## 🔎 What it checks

EcoCode AI detects:

- Nested `for` loops
- `append()` calls inside loops
- Wildcard imports such as `from module import *`

Each finding deducts points from a starting score of 100. The result is labelled **Excellent**, **Good**, or **Needs Improvement**.

## 🚀 Run locally

No installation or external API is needed.

1. Open the `outputs` folder.
2. Double-click `index.html`, or open it with a web browser.
3. Paste code into the editor and select **Analyze Code**.

## 🧰 Built with

- HTML
- CSS
- JavaScript

## 📁 Project files

```text
outputs/
├── index.html    # Page structure
├── style.css     # VS Code-inspired styling
└── script.js     # Code analysis and score logic
```

## 📝 Note

This is an educational demonstration, not a full code-quality or energy-measurement tool. The checks are intentionally simple so beginners can read and build on them.
