var express = require('express');
var router = express.Router();

let items = [
  {
    imageUrl: "https://placehold.co/150x150",
    id: 1,
    name: "CloudTalk logo sticker",
    description: "High-quality sticker of the best cloud calling solution provider in the world",
    quantity: 99,
    unitPrice: 1,
  },
];

router.post('/', function(req, res) {
  const newItem = req.body;
  newItem.id = items.length ? items[items.length - 1].id + 1 : 1;
  items.push(newItem);
  res.status(201).json(newItem);
});

router.get('/', function(req, res) {
  res.json(items);
});

router.get('/:id', function(req, res) {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

router.put('/:id', function(req, res) {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

router.delete('/:id', function(req, res) {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedItem = items.splice(index, 1);
    res.json(deletedItem);
  } else {
    res.status(404).send('Item not found');
  }
});

module.exports = router;
