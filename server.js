const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files
app.use('/build', express.static(path.join(__dirname, 'sampleApp/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'sampleApp/sampleApp.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
