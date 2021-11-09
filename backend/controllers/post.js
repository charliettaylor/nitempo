// episode, show, track, album, playlist
// make music entry then post
const db = require('./db');


// req : { userID: string, description: string, type: string, musicID: string }
// res : { message : success/error }
exports.create = (req, res) => {
    let date_time = new Date().toUTCString();
    db.query('INSERT INTO post VALUES (0, ?, ?, ?, ?, ?)',
        [req.body["description"], date_time, req.body["type"], req.body["musicID"], req.body["userID"]],
        (error, result) => {
            if(error){
                console.log(error);
                res.status(400).json({ message: "Post error, could not create"});
            } else {
                console.log(result);
                res.json({ message: "Post success" });
            }
        });
}


// req : { limit?: int }
// res : { posts: post objects }
exports.get = (req, res) => {
    let limit = 10;
    if (req.body["limit"]) { limit = req.body["limit"]; }

    db.query('SELECT * FROM post ORDER BY post_time DESC LIMIT ?', [limit],
    (error, result) => {
        if(error){
            console.log(error);
            res.json({ message: "Post error, could not find posts"});
        } else {
            console.log(result);
            result = result.map(v => Object.assign({}, v));
            res.json({ posts: result });
        }
    });
}