# Bubble Portfolio Template

An interactive portfolio template with skill-based bubble visualization. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- Interactive bubble visualization showing jobs and transferrable skills
- Click on jobs or skills to explore stories and connections
- Responsive design (mobile-friendly)
- Dark theme with modern aesthetics

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Customize `src/BubblePortfolio.jsx`:
   - Update `SKILLS` array with your transferrable skills
   - Update `JOBS` array with your work experience
   - Fill in your stories for each job-skill combination
   - Update the header, footer, and references sections with your info

## Customization

### Skills
Edit the `SKILLS` array to define your transferrable skills. Each skill has:
- `id`: unique identifier
- `label`: display name
- `emoji`: visual icon
- `color`: accent color (hex)

### Jobs
Edit the `JOBS` array to add your work experience. Each job has:
- `id`: unique identifier
- `title`: your job title
- `company`: company name
- `skills`: array of skill IDs this job demonstrates
- `x`, `y`: position on canvas (0-1 range)
- `stories`: object mapping skill IDs to your stories

## License

MIT
