const db = require('./db'); //importing db module to execute the querys in my db

//db opertions are async so callback function is used when the db operation is complete
//the program doesnt have to wait on the db operation to be done to continue with the rest of the program

const Post = {

    //create function to create post
    create: (title, content, callback) => {


        const sql = 'INSERT INTO posts (title, content) VALUES (?, ?)';//sql query with placeholders to counter sql injection

        db.query(sql, [title, content], callback);//function to execute the query with the above query, array of values and callback function as parameters
    },

    //getAll function to retireve all posts
    getAll: (callback) => {

        const sql = 'SELECT * FROM posts';

        db.query(sql, callback);

    },

    //update funcction to edit a post
    update: (postId,title, content, callback) => {

        const sql = 'UPDATE posts SET title=?, content=? WHERE postId=?';
        db.query(sql, [title, content, postId], callback);
    },

    //delete function to delete a post
    delete: (postId, callback) => {
        const sql = 'DELETE FROM posts WHERE postId=?';
        db.query(sql, [postId], callback);
      },

      //function to retrieve a certain amount of posts beginning from a certain point
    getByLimitAndOffset: (limit, offset, callback) => {
        const sql = 'SELECT * FROM posts LIMIT ? OFFSET ?';
        db.query(sql, [limit, offset], callback);
      },

      //function to retrieve a post by title using a searchterm that the user gives
    searchByTitle: (title, callback) => {
        const sql = 'SELECT * FROM posts WHERE title LIKE ?';
        db.query(sql, [`%${title}%`], callback);
      },


    };
    
    module.exports = Post;







