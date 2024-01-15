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

        //first check if title exists in the db
        const checkIfTitleExists = 'SELECT COUNT(*) AS count FROM posts WHERE title LIKE ?';
        db.query(checkIfTitleExists,[`%${title}%`],(checkErr,result) => { //function with query, value and callback as parameters
                
            //checkErr(handles error) & result(handles result of query) -> parameters of callback

            if (checkErr) {
                return callback(checkErr, null);//if there is an error returns error and null result through callback
            }

            //if quey succesful
            const postCount = result[0].count;//number of posts with the title
    
            if (postCount === 0) {
                // No posts found with the given title
                const error = new Error('No posts found with the given title');
                return callback(error, null);
            }

            //if posts found with the given title "the official query" can continue
            const sql = 'SELECT * FROM posts WHERE title LIKE ?';
            db.query(sql, [`%${title}%`], callback);

        });



      
      },


    };
    
    module.exports = Post;







