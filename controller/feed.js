exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{title: 'title here', content: 'look at this content, super cool right?'}]
        });
};

exports.createPost = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    // create post in db
    res.status(201).json ({
        message: 'post was created successfully',
        post: { id: new Date().toISOString(), title: title, content: content }
    });
};