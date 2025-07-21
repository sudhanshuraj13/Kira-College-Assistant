# College Assistant

Meet **Kira**—your smart, AI-powered college assistant designed to revolutionize how students organize their academic lives! Powered by the cutting-edge LLM model, **Llama-3.3-70b-versatile**, Kira acts as your personal companion, proactively reminding you about upcoming classes, assignments, exams, and campus events.

Harnessing the capabilities of advanced natural language processing, Kira delivers friendly, concise, and context-aware responses tailored to your schedule. Whether you're juggling deadlines or searching for event details, Kira is here to keep you on track and stress-free.

Built for the future, Kira is not just a static tool—it's a dynamic project with plans to evolve into a full-featured website, integrating real-time data from college portals and emails. Experience the next generation of student productivity and organization!

## Features
- Reminds students of upcoming assignments, exams, events, and deadlines
- Friendly, brief, and proactive responses
- Easily customizable for your college schedule

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- A Groq API key

### Installation
1. **Clone the repository:**
   ```sh
   git clone https://github.com/sudhanshuraj13/college-Assistant.git
   cd college-Assistant
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Add your Groq API key to the `.env` file:
     ```env
     GROQ_API_KEY=your_actual_api_key
     ```

### Running the Project
To start the agent:
```sh
npm run dev
```

### Usage
- The agent will start and provide details about upcoming classes and events.
- You can customize the prompts and logic in `agent.js` as needed.

## Project Structure
- `agent.js` - Main agent logic
- `.env.example` - Example environment file
- `.gitignore` - Files to ignore in git
- `package.json` - Project metadata and scripts

## Security
- **Do not share your `.env` file or API keys publicly.**
- `.env` is ignored by git for your protection.

## License
ISC

## Author
Sudhanshu Raj

## Future Plans 🚀

Currently, College Assistant provides answers using local sample data. In the future, I plan to:

- Integrate web scraping to fetch real-time class schedules, events, and deadlines directly from college websites.
- Connect to email accounts to automatically track assignments, notices, and updates.
- Transform this project into a full-fledged interactive website, making it accessible and engaging for all students.
- Add smart notifications, personalized dashboards, and seamless integrations with popular college platforms.

Stay tuned—College Assistant is just getting started! The goal is to create an intelligent, proactive companion for every student, making college life easier and more organized than ever before.
