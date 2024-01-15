const express = require('express');
const router = express.Router();
const Comment = require('../models/commentModel');


// post request to create a comment
router.post('/', (req, res) => {
  const { postId, text } = req.body;

  if (!postId || !text) {
    return res.status(400).json({ error: 'Post ID and text are required' }); //check if postId and text are provided
  }

  // Check if postId is integer and if text is a string
  if (!Number.isInteger(postId) || typeof text !== 'string') {
    return res.status(400).json({ error: 'postId is not int or text is not string' });
  }

  //creaye function is called
  Comment.create(postId, text, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ commentId: result.insertId, postId, text });
    }
  });
});

//get request to retrieve all comments
router.get('/', (req, res) => {

    //getAll function is called
  Comment.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});


//put request to edit a comment
router.put('/:id', (req, res) => { //id of the to edit comment is given as a route parameter
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  if(typeof text !== "string"){
    return res.status(400).json({error: "text is not string"});
  }

  const commentId = req.params.id;

  //update function is called
  Comment.update(commentId, text, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ id: commentId, text });
    }
  });
});

//delete request to delete a comment 
router.delete('/:id', (req, res) => {
  const commentId = req.params.id;//retrieve value from route parameter (placeholder)


  //delete function is called
  Comment.delete(commentId, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
