const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (if any)
app.use(express.static('public'));

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Timestamp Microservice API',
    endpoints: {
      'GET /api/': 'Returns current time',
      'GET /api/:date': 'Returns timestamp for given date',
      'GET /api/1451001600000': 'Returns timestamp for Unix value'
    },
    example: {
      'input': '/api/2015-12-25',
      'output': {
        'unix': 1451001600000,
        'utc': 'Fri, 25 Dec 2015 00:00:00 GMT'
      }
    }
  });
});

// Main API endpoint
app.get('/api/:date?', (req, res) => {
  try {
    let dateString = req.params.date;
    let date;

    // Case 1: Empty date parameter (return current time)
    if (!dateString) {
      date = new Date();
    } 
    // Case 2: Unix timestamp (number check)
    else if (!isNaN(dateString) && dateString.length > 0) {
      date = new Date(parseInt(dateString));
      
      // Check if the Unix timestamp is valid
      if (isNaN(date.getTime())) {
        return res.json({ error: "Invalid Date" });
      }
    } 
    // Case 3: Date string
    else {
      date = new Date(dateString);
    }

    // Final validation for invalid dates
    if (isNaN(date.getTime())) {
      return res.json({ error: "Invalid Date" });
    }

    // Success response
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
    
  } catch (error) {
    res.json({ error: "Invalid Date" });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Server configuration
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Timestamp Microservice running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;