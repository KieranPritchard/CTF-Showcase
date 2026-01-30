# CTF-Showcase

<div align="center">

<img alt="GitHub Created At" src="https://img.shields.io/github/created-at/KieranPritchard/CTF-Showcase">

<img alt="GitHub License" src="https://img.shields.io/github/license/KieranPritchard/CTF-Showcase">

<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/t/KieranPritchard/CTF-Showcase">

<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/KieranPritchard/CTF-Showcase">

<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/KieranPritchard/CTF-Showcase">

<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/KieranPritchard/CTF-Showcase">

</div>

## Project Description

### Objective

A security-first portfolio platform designed to transform private CTF research into a polished, public-facing showcase. The system uses a custom Python pipeline to securely fetch Markdown write-ups from a private GitHub repository, extract structured metadata, and publish them as a searchable React application hosted on static infrastructure. The project demonstrates secure data handling, automation, and architectural problem-solving under static hosting constraints.

### Features

* **Private Research Repository:** All CTF write-ups are authored and stored in a private GitHub repository, acting as a secure content management system (CMS). Drafts, incomplete notes, and sensitive exploit research never touch the public-facing codebase.
* **Python-Based Content Pipeline:** A custom Python script authenticates to the GitHub API, retrieves Markdown files from the private repository, parses frontmatter metadata (tags, difficulty, date), and normalizes the content into a single structured data.json file.
* **Pseudo-Backend Architecture:** By publishing the generated JSON file to the public repository, the system simulates a backend database using static assets. The React frontend consumes this file at runtime to dynamically build navigation, categories, and content cards.
* **Automatic Navigation & Categorization:** The frontend automatically updates its sidebar, topic filters, and post listings based entirely on metadata—eliminating manual link mapping or duplicate content entry.
* **Static Hosting Compatibility:** The entire platform is designed to run on GitHub Pages, avoiding the need for servers, databases, or paid infrastructure.

### Technology and Tools Used

**Frontend:**
* React
* Tailwind CSS

**Backend / Automation:**
* Python
* GitHub REST API

**Content Format:**
* Markdown (source of truth)
* JSON (compiled data layer)

**Tools:**
* Git
* GitHub Pages
* VS Code

### Challenges Faced

**Static Hosting Limitations:** GitHub Pages provides no server-side execution or database support. I addressed this by precompiling all dynamic content into a single JSON artifact that the frontend can consume client-side.

**Content Privacy vs. Visibility:** Publishing Markdown files directly would expose drafts and sensitive research. I resolved this by maintaining a strict air gap between private research storage and public artifacts using a one-way data pipeline.

**Manual Content Mapping:** Traditional static blogs require manual updates to navigation and category pages. By enforcing metadata-driven rendering, the site structure updates automatically whenever new content is published.

### Outcome

The project successfully delivers a scalable, low-maintenance portfolio platform that reflects real-world cybersecurity workflows. It demonstrates secure handling of sensitive data, API-driven automation, and architectural design under infrastructure constraints. The system scales linearly—adding 1 or 100 new write-ups requires no additional frontend changes.
This architecture mirrors real-world content pipelines and showcases skills directly transferable to secure application development and infrastructure automation.
