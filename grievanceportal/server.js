const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));
app.use('/images', express.static('images'));

// Store grievances in a JSON file
const grievancesFile = path.join(__dirname, 'grievances.json');

// Initialize grievances file if it doesn't exist
if (!fs.existsSync(grievancesFile)) {
    fs.writeFileSync(grievancesFile, JSON.stringify([]));
}

// Get all grievances
app.get('/api/grievances', (req, res) => {
    const grievances = JSON.parse(fs.readFileSync(grievancesFile));
    res.json(grievances);
});

// Submit a new grievance
app.post('/api/grievances', (req, res) => {
    const grievances = JSON.parse(fs.readFileSync(grievancesFile));
    const newGrievance = {
        id: Date.now(),
        title: req.body.title,
        body: req.body.body,
        date: new Date().toISOString()
    };
    
    grievances.unshift(newGrievance);
    fs.writeFileSync(grievancesFile, JSON.stringify(grievances, null, 2));
    
    res.json(newGrievance);
});

// Clear all grievances
app.delete('/api/grievances', (req, res) => {
    console.log('DELETE request received for /api/grievances');
    try {
        // Ensure the file exists before trying to clear it
        if (!fs.existsSync(grievancesFile)) {
            console.log('Grievances file does not exist, creating it');
            fs.writeFileSync(grievancesFile, JSON.stringify([]));
        }
        
        // Clear the file
        console.log('Clearing grievances file');
        fs.writeFileSync(grievancesFile, JSON.stringify([]));
        console.log('Grievances cleared successfully');
        res.json({ message: 'All grievances cleared successfully' });
    } catch (error) {
        console.error('Error clearing grievances:', error);
        res.status(500).json({ error: 'Failed to clear grievances' });
    }
});

// Add a catch-all route for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - Not Found`);
    res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 