const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');


//post request for creating a post
router.post('/', (req, res) => {
    const { title, content } = req.body; //retrieving title and content form the request
  
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' }); //check to see if title and content are given
    }
  
    //create function is called
    Post.create(title, content, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ postId: result.insertId, title, content });
      }
    });
  });

  //get request for retrieving all posts
  router.get('/', (req, res) => {

     //getAll function is called
    Post.getAll((err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  });

    //put request for editing a post
  router.put('/:id', (req, res) => {
    const { title, content } = req.body;
  
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
  
    const postId = req.params.id;
  
    //update function is called
    Post.update(postId, title, content, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({ postId: postId, title, content });
      }
    });
  });

  //delete request to delete a post
  router.delete('/:id', (req, res) => {
    const postId = req.params.id;
  
    //delete funtion is called
    Post.delete(postId, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(204).send();
      }
    });
  });

    //get request to retrieve a certain amount of posts starting from a certain point
  router.get('/limit/:limit/offset/:offset', (req, res) => {
    const limit = parseInt(req.params.limit); //req.params. used to extract data from route parametrs wich are placeholders
    const offset = parseInt(req.params.offset); // parseInt to make sure the values are treated as integers
  
    //getByLimitAndOffset is called
    Post.getByLimitAndOffset(limit, offset, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  });

    //get request to retrieve a post by title searched by the user
  router.get('/search', (req, res) => {
    const { title } = req.query;//req.query to extract data from url query //best used for filtering
  
    if (!title) {
      return res.status(400).json({ error: 'Title parameter is required for search' });
    }
  
    //searchByTitle function is called
    Post.searchByTitle(title, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json(results);
      }
    });
  });
  
  
  module.exports = router;