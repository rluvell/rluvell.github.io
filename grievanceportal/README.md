# Vicki's Grievance Centre

A humorous portal for lodging grievances with multiple confirmation steps and meditative waiting periods.

## Features

- Clean, modern interface
- Multiple confirmation steps with countdown timers
- Meditative messages during waiting periods
- Persistent storage of grievances
- Real-time display of submitted grievances

## Setup

1. Make sure you have Node.js installed on your system
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Enter a title for your grievance
2. Write the details of your grievance
3. Click "Lodge Grievance"
4. Follow the multiple confirmation steps, each with a 10-second countdown
5. Enjoy the meditative messages while waiting
6. Your grievance will be saved and displayed in the list below

## Technical Details

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js with Express
- Storage: JSON file-based storage
- Dependencies:
  - express
  - cors
  - body-parser 