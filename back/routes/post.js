const express = require("express");
const multer = require("multer");

const router = express();

const { isLoggedIn } = require("./middleware");

const db = require("../models");

const upload = multer({
	storage: multer.diskStorage({
		destination: function(req, file, done) {
			done(null, "uploads/");
		},
		filename: function(req, file, done) {
			const fileName = file.originalname.replace(/ /gi, ""); // 공백제거
			const extension = fileName.slice(-4); // 확장자
			const baseName = fileName.slice(0, -4); // 확장자 제거된 파일명
			done(null, baseName + new Date().valueOf() + extension);
		}
	})
});

router.post("/", isLoggedIn, async (req, res, next) => {
	try {
		const { text, imagePaths } = req.body;

		const newPost = await db.Post.create({
			// 게시글 등록
			content: text,
			UserId: req.user.id
		});

		const hashtags = text.match(/#[^\s]+/g);

		if (hashtags) {
			const result = await Promise.all(
				hashtags.map((tag) =>
					db.Hashtag.findOrCreate({
						// 해시태그 등록
						where: { name: tag.slice(1).toLowerCase() }
					})
				)
			);
			await newPost.addHashtags(result.map((v) => v[0])); // 게시글과 해시태그 관계 설정
		}

		const image = await Promise.all(
			// 이미지 등록
			imagePaths.map((image) => {
				return db.Image.create({
					src: image
				});
			})
		);
		await newPost.addImages(image); // 게시글과 이미지 관계 설정

		const fullPost = await db.Post.findOne({
			where: {
				id: newPost.id
			},
			include: [
				{
					model: db.User,
					attributes: ["userId", "name", "profile"]
				},
				{ model: db.Image },
				{ model: db.User, as: "Likers", attributes: ["id"] },
				{ model: db.Comment }
			]
		});

		res.json(fullPost);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.post("/image", upload.array("image"), (req, res) => {
	const files = req.files.map((v) => {
		return v.filename;
	});

	res.json(files);
});

router.post("/:id/like", isLoggedIn, async (req, res, next) => {
	try {
		const post = await db.Post.findOne({
			where: {
				id: req.params.id
			}
		});
		if (!post) {
			return res.status(404).send("해당 게시글이 존재하지 않습니다.");
		}

		await post.addLikers(req.user.id);

		const likers = await db.User.findOne({
			where: {
				id: req.user.id
			},
			attributes: ["id", "userId", "profile"]
		});

		res.json(likers);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.delete("/:id/like", isLoggedIn, async (req, res, next) => {
	try {
		const post = await db.Post.findOne({
			where: {
				id: req.params.id
			}
		});
		if (!post) {
			return res.status(404).send("해당 게시글이 존재하지 않습니다.");
		}
		await post.removeLikers(req.user.id);
		res.json(req.user.id);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

router.post("/:id/comment", isLoggedIn, async (req, res, next) => {
	try {
		const post = await db.Post.findOne({
			where: {
				id: req.params.id
			}
		});

		if (!post) {
			return res.status(404).send("해당 게시글이 존재하지 않습니다.");
		}

		const newComment = await db.Comment.create({
			PostId: req.params.id,
			content: req.body.comment,
			UserId: req.user.id
		});

		await post.addComments(newComment.id);
		const comment = await db.Comment.findOne({
			where: {
				id: newComment.id
			},
			include: [{ model: db.User, attributes: ["id", "userId", "profile"] }]
		});

		res.json(comment);
	} catch (err) {
		console.error(err);
		next(err);
	}
});

module.exports = router;
