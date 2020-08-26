const router = require('express').Router();
const { Comment, User, Post } = require('../../models/');

router.get('/', (req, res) => {
  Comment.findAll({
    attributes: [
      'id',
      'text',
      'user_id',
      'post_id',
      'created_at',
      'updated_at'
    ],
    order: [[ 'created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  if (req.session){
    Comment.create({
      text: req.body.text,
      post_id: req.body.post_id,
      user_id: req.body.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'There is absolutely not a comment with this ID' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
