# Placement Job Portal

A modern React + TypeScript web application designed for college placement management. The portal allows students to explore job openings, submit applications, and track their progress, while placement officers can review applicants and manage hiring activities from a dedicated dashboard.

## live demo - https://charming-banoffee-52aa98.netlify.app/

## Overview

This project simulates a complete placement portal workflow with:
- Student-friendly job discovery and filtering
- Detailed job descriptions and eligibility information
- Application submission forms
- Application status tracking
- Officer dashboard for candidate management
- Clean, responsive UI for desktop and tablet usage

## Features

### Student Features
- Browse all available placement opportunities
- Search and filter jobs by category or company
- View detailed job descriptions and requirements
- Apply to jobs using an application form
- Track application status over time

### Officer Features
- Review incoming student applications
- View candidate details and resumes/skills information
- Update application statuses
- Monitor placement activity using summary statistics

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS modules / custom CSS
- Tailwind CSS
- Lucide icons
- Motion animations

## Project Structure

```text
src/
├── components/
│   ├── ApplicationFormModal.tsx
│   ├── JobCard.tsx
│   ├── JobDetailView.tsx
│   ├── OfficerDashboardView.tsx
│   └── StatCard.tsx
├── App.tsx
├── data.ts
├── index.css
├── main.tsx
└── types.ts
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project folder
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the URL shown in the terminal (usually `http://localhost:3000`)

## Available Scripts

```bash
npm run dev
```
Starts the local development server.

```bash
npm run build
```
Creates a production-ready build.

```bash
npm run preview
```
Previews the production build locally.

## How the App Works

1. The homepage shows a list of job cards.
2. Users can click a job to see full details.
3. Students can submit applications from the modal form.
4. The officer dashboard provides an overview of applicants and job activity.
5. Data is managed through the sample dataset in [src/data.ts](src/data.ts).

## Sample Data

The app uses predefined sample data for:
- placement jobs
- student profiles
- application statuses
- recruiter/placement officer information

## Styling

The UI uses a modern, attractive color palette and responsive layout to provide a smooth experience across devices.

## Deployment

This project can be deployed on any static hosting service that supports Vite applications, such as:
- Vercel
- Netlify
- GitHub Pages

## Notes

- No external API setup is required for the current version.
- The application is designed for demonstration and educational use.
- You can customize the sample data in [src/data.ts](src/data.ts) to match your college or company requirements.
