const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
	Post.find() 
	.then(posts => {
		res.status(200).json({message: 'fetches posts successfully.', posts: posts});
	})
	.catch(err => { 
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err)
	})
};

exports.createPost = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('validation failed');
		error.statusCode = 422
		throw error;
	}
	if (!req.file) {
		const error = new Error('no image provided.');
		error.statusCode = 422;
		throw error;
	}
	const imageUrl = req.file.path;
	const title = req.body.title;
	const content = req.body.content;
	const post = new Post ({
		title: title,
		content: content,
		imageUrl: imageUrl,
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
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err)
	})
	
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;
	console.log("post id" + postId)
	Post.findById(postId)
		.then( post => {
			if (!post) {
				const error = new Error('could not find post.');
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({message: 'Post fetched', post: post})
		})
		.catch(err => { 
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err)
	})
}
