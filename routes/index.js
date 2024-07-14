var express = require('express');
const {sendObject} = require("./requests");
const {getMaxCount} = require("./requests");
const {getLevel} = require("./requests");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome!' });
});

router.post('/save_level', async (req, res) => {
  try {
    const newData = await sendObject(req.body);
    res.status(201).send(newData);
  } catch (error) {
      res.status(400).send(error);
  }
});

router.get('/get_max_count', async (req, res) => {
  try {
    const number = await getMaxCount();
    res.status(201).send(number.toString());
  } catch (error) {
      res.status(400).send(error);
  }
})

router.get('/get_level', async (req, res) => {
  try {
    const numberId = parseInt(req.query.numberId, 10);
    if (isNaN(numberId)) {
      return res.status(400).send('Invalid numberId');
    }
    const newData = await getLevel(numberId);
    res.status(201).send(newData);
  } catch (error) {
      res.status(400).send(error);
  }
});
module.exports = router;
