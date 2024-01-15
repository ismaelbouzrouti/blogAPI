const db = require('./db');//importing db module to execute the querys in my db

//db opertions are async so callback function is used when the db operation is complete
//the program doesnt have to wait on the db operation to be done to continue with the rest of the program

const Comment = {

    // create function used to create a new comment
  create: (postId, text, callback) => {
    const sql = 'INSERT INTO comments (postId, text) VALUES (?, ?)'; //sql query with placeholders to counter sql injection

    db.query(sql, [postId, text], callback); //function to execute the query with the above query, array of values and callback function as parameters
  },

  //getAll function to retrieve all the comments
  getAll: (callback) => {
    const sql = 'SELECT * FROM comments';
    db.query(sql, callback);
  },

  // update function to edit a comment
  update: (commentId, text, callback) => {
    const sql = 'UPDATE comments SET text=? WHERE commentId=?';
    db.query(sql, [text, commentId], callback);
  },

  //delete function to delete comment
  delete: (commentId, callback) => {
    const sql = 'DELETE FROM comments WHERE commentId=?';
    db.query(sql, [commentId], callback);
  },
};

module.exports = Comment;
