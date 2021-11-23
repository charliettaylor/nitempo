// episode, show, track, album, playlist
// make music entry then post
const db = require('./db');


// req : { userID: string, description: string, type: string, musicID: string }
// res : { message : success/error }
exports.create = (req, res) => {
    let date_time = new Date().toUTCString();
    db.query('INSERT INTO post VALUES (0, ?, ?, ?, ?, ?)',
    [req.body['description'], date_time, req.body['type'], req.body['musicID'], req.body['userID']],
    (error, result) => {
        if(error){
            console.log(error);
            res.status(400).json({ message: 'Post error, could not create'});
        } else {
            console.log(result);
            res.json({ message: 'Post success' });
        }
    });
}

// req : { userID: string, desc: string }
// res : { message: success/error }
exports.update = (req, res) => {
    let date_time = new Date().toUTCString();
    db.query('UPDATE post SET desc = ? WHERE postId = ? ', [req.body['desc'], req.body['userID']],
    (error, result) => {
        if(error) {
            console.log(error);
            res.status(400).json({ message: 'Post error, could not update'});
        } else {
            console.log(result);
            res.json({ message: 'Post update success' });
        }
    });
}

// req : { userID: string }
// res : { message: string }
exports.delete = (req, res) => {
    db.query('DELETE FROM post WHERE postID = ?' [req.body['userID']],
    (error, result) => {
        if(error){
            console.log(error);
            res.status(400).json({ message: 'Post error, could not delete'});
        } else {
            console.log(result);
            res.json({ message: 'Post deletion success' });
        }
    });
}

// req : { limit?: int }
// res : { description: atring, musicID: string, postID: int, post_time: datetime, type: string, userID: string }
exports.get = (req, res) => {
    let limit = 10;
    if (req.body['limit']) { limit = req.body['limit']; }

    db.query('SELECT * FROM post ORDER BY post_time DESC LIMIT ?', [limit],
    (error, result) => {
        if(error){
            console.log(error);
            res.json({ message: 'Post error, could not find posts'});
        } else {
            console.log(result);
            result = result.map(v => Object.assign({}, v));
            res.json({ posts: result });
        }
    });
}

// req : { userID: string, limit?: int }
// res : { message: success/failure }
exports.getUser = (req, res) => {
    let limit = 10;
    if (req.body['limit']) { limit = req.body['limit']; }

    db.query('SELECT * FROM post ORDER BY post_time DESC WHERE postID = ?', [req.body['userID'], limit],
    (error, result) => {
        if(error){
            console.log(error);
            res.json({ message: 'Post error, could not find posts'});
        } else {
            console.log(result);
            result = result.map(v => Object.assign({}, v));
            res.json({ posts: result });
        }
    });
}