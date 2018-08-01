var express = require('express');
var router = express.Router();
const randomstring = require('randomstring');
const path = require('path');
require(path.join(__dirname, '../node_modules/gun/lib/path.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/gunwrite', (req, res) => {
  let rands = global.store.get('randomstrings');

  for (let i = 0; i < 100000; i++) {
    let rnd = randomstring.generate({
      length: 7
    });

    rands.get(rnd).path('exists').once(v => {
      if (!v) {
        let rndStore = global.store.get(rnd);
        rndStore.put({
          exists: true
        });

        rands.set(rndStore)
        console.log({
          rnd,
          i
        })
      }
    });
  }

  res.status(200).send({
    init: true
  });
});

module.exports = router;
