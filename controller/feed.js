const { validationResult } = require('express-validator/check');

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
	// create post in db
	res.status(201).json({
		message: 'post was created successfully',
		post: {
			_id: new Date().toISOString(),
			title: title,
			content: content,
			creator: { name: 'creator name' },
			createdAt: new Date(),
		},
	});
};
