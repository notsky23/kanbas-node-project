const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
};
const module = {
    id: 1, name: "New Module",
    description: "This is a new module",
    course: "Web Development",
};
const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
  ];  
  
const Lab5 = (app) => {
    app.get("/a5/todos", (req, res) => {
        res.json(todos);
      });    

    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });
    app.get("/a5/assignment/id", (req, res) => {
        res.json(assignment.id);
    });
    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });
    app.get("/a5/assignment/description", (req, res) => {
        res.json(assignment.description);
    });
    app.get("/a5/assignment/due", (req, res) => {
        res.json(assignment.due);
    });
    app.get("/a5/assignment/completed", (req, res) => {
        res.json(assignment.completed);
    });
    app.get("/a5/assignment/score", (req, res) => {
        res.json(assignment.score);
    });

    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment);
    });
    app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment);
    });
    app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
        const { newCompleted } = req.params;
        assignment.completed = newCompleted;
        res.json(assignment);
    });

    app.get("/a5/module", (req, res) => {
        res.json(module);
    });
    app.get("/a5/module/id", (req, res) => {
        res.json(module.id);
    });
    app.get("/a5/module/name", (req, res) => {
        res.json(module.name);
    });
    app.get("/a5/module/description", (req, res) => {
        res.json(module.description);
    });
    app.get("/a5/module/course", (req, res) => {
        res.json(module.course);
    });

    app.get("/a5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });
    
    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5");
    });

    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
    });
    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const difference = parseInt(a) - parseInt(b);
        res.send(difference.toString());
    });
    app.get("/a5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const product = parseInt(a) * parseInt(b);
        res.send(product.toString());
    });
    app.get("/a5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const quotient = parseInt(a) / parseInt(b);
        res.send(quotient.toString());
    });

    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
          case "add":
            result = parseInt(a) + parseInt(b);
            break;
          case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
          case "multiply":
            result = parseInt(a) * parseInt(b);
            break;
          case "divide":
            result = parseInt(a) / parseInt(b);
            break;
          default:
            result = "Invalid operation";
        }
        res.send(result.toString());
    });    
    
}

export default Lab5;