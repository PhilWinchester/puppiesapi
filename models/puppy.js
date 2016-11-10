const db = require('../lib/dbConnect');

function getAllPuppies(req, res, next) {
  db.any(`
  SELECT * from puppies
  ORDER BY likes DESC;
  `)
    .then((puppies) => {
      res.puppies = puppies;
      next();
    })
    .catch(error => next(error));
}

function adoptPuppy(req, res, next) {
  // Implement adopting a puppy
  db.none(`
    INSERT INTO puppies(name, URL)
    VALUES ($/name/, $/url/);
    `, req.body)
    .then(puppies => {
      res.puppies = puppies;
      next();
    })
    .catch(err => next(err));
}

function abandonPuppy(req, res, next) {
  // Implement abandoning the puppy :(
  console.log('model deleting');
  console.log(req.params);
  db.none(`
    DELETE FROM puppies
    WHERE id = $/id/;
    `, req.params)
    .then(() => next())
    .catch(err => next(err))
}

function likePuppy(req, res, next) {
  // Implement increasing the likes value of the puppy by one
  db.none(`
    UPDATE puppies
    SET likes = likes + 1
    WHERE id = $/id/;
    `, req.params)
    .then(() => next())
    .catch(err => next(err))
}

module.exports = {
  getAllPuppies,
  adoptPuppy,
  abandonPuppy,
  likePuppy
};
