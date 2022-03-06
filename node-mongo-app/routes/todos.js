const {Router} =  require("express");
const res = require("express/lib/response");
const Todo = require("../models/Todo");
const router = Router();


router.get('/', async (req,res) => {
    const todos = await Todo.find({})
    res.render("index", {
        title : "Todos list",
        isIndex : true,
        todos
    });
});

router.get('/create', (req,res) => {
    res.render("create", {
        title : "Create Todo",
        isCreate : true
    });
})

router.post("/create", async (req,res) => {
    const todo = new Todo({
        title : req.body.title
    });
    await todo.save()
    res.redirect("/");
});

router.post("/complete", async () => {
    const todo = await Todo.findById(req.body.id);

    todo.completed = true;
    await todo.save();
    res.redirect("/");
})


module.exports = router;