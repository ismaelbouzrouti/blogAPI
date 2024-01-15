const db = require('./models/db');

const express = require('express');
const postsRouter = require('./routes/posts');


const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/posts', postsRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});