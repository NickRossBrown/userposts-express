exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{title: 'title here', content: 'look at this content, super cool right?'}]
        });
};