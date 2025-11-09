const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve HTML page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Timestamp Microservice</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
      min-height: 100vh; color: #333; line-height: 1.6; padding: 20px; 
    }
    .container { 
      max-width: 800px; margin: 0 auto; background: white; 
      border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.3); overflow: hidden; 
    }
    header { 
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%); 
      color: white; padding: 40px; text-align: center; 
    }
    h1 { font-size: 2.5em; margin-bottom: 10px; font-weight: 700; }
    .subtitle { font-size: 1.2em; opacity: 0.9; font-weight: 300; }
    .content { padding: 40px; }
    .section { margin-bottom: 30px; }
    h2 { color: #2c3e50; margin-bottom: 15px; font-size: 1.8em; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
    h3 { color: #34495e; margin: 20px 0 10px 0; font-size: 1.3em; }
    p { margin-bottom: 15px; font-size: 1.1em; }
    code { background: #f8f9fa; padding: 2px 6px; border-radius: 4px; font-family: 'Courier New', monospace; color: #e74c3c; font-size: 0.9em; }
    pre { background: #2c3e50; color: #ecf0f1; padding: 20px; border-radius: 8px; overflow-x: auto; margin: 15px 0; font-family: 'Courier New', monospace; font-size: 0.9em; line-height: 1.4; }
    .example { background: #e8f4f8; padding: 20px; border-radius: 10px; border-left: 5px solid #3498db; margin: 20px 0; }
    .endpoint { background: #2c3e50; color: white; padding: 15px; border-radius: 8px; margin: 15px 0; font-family: 'Courier New', monospace; }
    .test-links { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
    .test-link { display: block; background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; padding: 15px; text-decoration: none; border-radius: 10px; text-align: center; font-weight: 600; transition: all 0.3s ease; }
    .test-link:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.2); text-decoration: none; color: white; }
    .response { background: #27ae60; }
    .response:hover { background: #229954; }
    footer { background: #34495e; color: white; text-align: center; padding: 20px; margin-top: 30px; }
    .api-test { background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 25px 0; border: 2px solid #e9ecef; }
    .test-input { display: flex; gap: 10px; margin-bottom: 15px; }
    .test-input input { flex: 1; padding: 12px; border: 2px solid #bdc3c7; border-radius: 8px; font-size: 1em; font-family: 'Courier New', monospace; }
    .test-input button { background: linear-gradient(135deg, #27ae60 0%, #229954 100%); color: white; border: none; padding: 12px 25px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; }
    .test-input button:hover { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
    .result { background: white; padding: 15px; border-radius: 8px; border: 2px solid #e9ecef; font-family: 'Courier New', monospace; min-height: 50px; white-space: pre-wrap; word-wrap: break-word; }
    @media (max-width: 768px) { 
      .container { margin: 10px; } 
      header { padding: 30px 20px; } 
      h1 { font-size: 2em; } 
      .content { padding: 30px 20px; } 
      .test-links { grid-template-columns: 1fr; } 
      .test-input { flex-direction: column; } 
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Timestamp Microservice</h1>
      <p class="subtitle">FreeCodeCamp Back End Development and APIs Project</p>
    </header>

    <div class="content">
      <div class="section">
        <h2>API Usage</h2>
        <p>This API converts dates between Unix timestamps and UTC strings.</p>
        
        <div class="endpoint">
          GET /api/:date?
        </div>

        <div class="example">
          <h3>Examples:</h3>
          <p><strong>Valid Date:</strong> <code>/api/2015-12-25</code></p>
          <p><strong>Unix Timestamp:</strong> <code>/api/1451001600000</code></p>
          <p><strong>Current Time:</strong> <code>/api</code></p>
        </div>
      </div>

      <div class="section">
        <h2>Response Format</h2>
        <p>The API returns a JSON object with two properties:</p>
        <ul>
          <li><code>unix</code> - Unix timestamp in milliseconds (number)</li>
          <li><code>utc</code> - Date string in UTC format</li>
        </ul>

        <h3>Example Responses:</h3>
        <pre>{
  "unix": 1451001600000,
  "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}</pre>

        <pre>{
  "error": "Invalid Date"
}</pre>
      </div>

      <div class="api-test">
        <h2>Test the API</h2>
        <p>Enter a date or timestamp to test:</p>
        <div class="test-input">
          <input type="text" id="testInput" placeholder="Enter date (e.g., 2015-12-25) or timestamp" value="2015-12-25">
          <button onclick="testAPI()">Test API</button>
        </div>
        <div class="result" id="testResult">
          Click "Test API" to see the result
        </div>
      </div>

      <div class="test-links">
        <a href="/api" class="test-link" target="_blank">Test Current Time</a>
        <a href="/api/2015-12-25" class="test-link response" target="_blank">Test Example Date</a>
        <a href="/api/1451001600000" class="test-link" target="_blank">Test Unix Timestamp</a>
        <a href="/api/invalid-date" class="test-link response" target="_blank">Test Invalid Date</a>
      </div>
    </div>

    <footer>
      <p>Built with Node.js and Express for FreeCodeCamp</p>
    </footer>
  </div>

  <script>
    async function testAPI() {
      const input = document.getElementById('testInput').value.trim();
      const resultDiv = document.getElementById('testResult');
      
      if (!input) {
        resultDiv.textContent = 'Please enter a date or timestamp';
        return;
      }

      try {
        const response = await fetch('/api/' + input);
        const data = await response.json();
        resultDiv.textContent = JSON.stringify(data, null, 2);
        resultDiv.style.background = data.error ? '#f8d7da' : '#d1ecf1';
        resultDiv.style.borderColor = data.error ? '#f5c6cb' : '#bee5eb';
      } catch (error) {
        resultDiv.textContent = 'Error: ' + error.message;
        resultDiv.style.background = '#f8d7da';
        resultDiv.style.borderColor = '#f5c6cb';
      }
    }

    document.getElementById('testInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') testAPI();
    });
  </script>
</body>
</html>
  `);
});

// API endpoint
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;
  
  // If no date parameter provided, use current time
  if (!dateString) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString()
    });
  }

  // Check if dateString is a number (Unix timestamp)
  if (!isNaN(dateString)) {
    dateString = parseInt(dateString);
  }

  const date = new Date(dateString);

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON response with unix and utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Timestamp Microservice running on port ${PORT}`);
});

module.exports = app;