var Score = require('../models/score');

module.exports = {
  create,
  highScores
};

function create(req, res) {
  Score.create(req.body)
  .then(() => {
    highScores(req, res);
  })
  .catch(err => {
    res.json({error: err});
  });
}

function highScores(req, res) {
  console.log(req.user);
  Score.find({})
  .sort({numGuesses: 1, seconds: 1})
  // default to a limit of 20 high scores
  // if not specified in a query string
  .limit(req.query.limit || 20)
  .then(scores => {
    res.json(scores);
  });
}





