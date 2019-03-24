const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
	res.status(200).json({
		posts: [
			{
				_id: '1',
				title: 'init title here',
				content:
					'look at this init content, super cool right? Because you can see it.',
				imageUrl: 'images/duck.png',
				creator: {
					name: 'nickisdope',
				},
				createdAt: new Date(),
			},
		],
	});
};

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res
			.status(422)
			.json({ message: 'validation failed', errors: errors.array() });
	}
	const title = req.body.title;
	const content = req.body.content;
	const post = new Post ({
		title: title,
		content: content,
		imageUrl: 'images/users.png',
		creator: { name: 'creator name' },
	})
	post.save()
	.then(result => {
		console.log(result)
		res.status(201).json({
			message: 'post was created successfully',
			post: result
		});
	})
	.catch(err => { 
		console.log(err)
	})
	
};
