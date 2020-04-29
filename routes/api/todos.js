const express = require("express");
const router = express.Router();

//Todo Model
const Todo = require('../../models/Todo');


//@route  GET api/items
//@desc   Get All Items
//@access Public
router.get('/', (req, res) => {
    Todo.find()
    .sort({ Date: -1 })
    .then(todos => res.json(todos))
});


//@route  POST api/items
//@desc   Create a Post
//@access Public
router.post('/', (req, res) => {
    const newTodo = new Todo({
        name: req.body.name
    })

    newTodo.save()
    .then(todo => res.json(todo))
});


//@route  DELETE api/items/:id
//@desc   Delete a Post
//@access Public
router.delete('/:id', (req, res) => {
    Todo.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});
module.exports = router