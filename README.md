# Vite-React-Tailwind Template

This repository serves as a template for kickstarting projects using Vite, React, React Router DOM, and Tailwind CSS. The template includes pre-configured routes and basic pages to help you quickly set up and start building your application.

## Features

- **Vite**: Lightning-fast development environment.
- **React**: Modern library for building user interfaces.
- **React Router DOM**: Pre-configured routes for navigation.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ARK018/React-Tailwind-Template.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vite-react-tailwind-template
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Project Structure

The project follows a simple and intuitive folder structure:

```
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable React components
│   ├── pages/         # Page components for different routes
│   ├── App.jsx        # Main app component
│   ├── main.jsx       # Entry point for the application
│   └── index.css      # Tailwind CSS configuration
├── .gitignore         # Files and directories to ignore in Git
├── package.json       # Project dependencies and scripts
├── postcss.config.js  # PostCSS configuration for Tailwind
├── tailwind.config.js # Tailwind CSS configuration
├── vite.config.js     # Vite configuration
└── README.md          # Project documentation
```

### Available Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run preview`**: Preview the production build.

## Routing

The project uses `React Router DOM` for routing. Example routes are already set up in the `/pages` directory. You can easily add new routes by creating new components in the `pages` folder and updating the `App.jsx` file.

### Example Routes

- **Home Page**: `/`
- **SignIn Page**: `/signin`

## Tailwind CSS

Tailwind CSS is pre-configured in the project. You can start using utility classes directly in your components. The `index.css` file includes the necessary setup.
