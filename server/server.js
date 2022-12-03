const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.static('build'))
app.use(express.json());
app.use(cors());
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
    morgan(
        ":method :url :status :res[content-length] :response-time ms - :body - :req[content-length]"
    )
);

let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

//get front page
app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
});

//get info page
app.get("/info", (request, response) => {
    const date = new Date();
    const body = `Phonebook has data for ${data.length} persons
  ${date}`;
    response.writeHead(200, {
        "Content-type": "text/javascript",
    });
    response.write(body);
    response.end();
});

// get all data
app.get("/api/persons", (request, response) => {
    response.json(data);
});

// get one person
app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = data.find((item) => item.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

createId = (arr) => {
    const max = arr.length > 0 ? Math.max(...arr.map((n) => n.id)) : 0;

    return max + 1;
};
// add a person
app.post("/api/persons", (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "Content is missing",
        });
    } else if (!body.name) {
        return response.status(400).json({
            error: "Name is missing",
        });
    } else if (!body.number) {
        return response.status(400).json({
            error: "Number is missing",
        });
    } else {
        const person = {
            id: createId(data),
            name: body.name,
            number: body.number,
        };
        const search = data.some(
            (info) => info.name.toLowerCase() === person.name.toLowerCase()
        );

        if (search) {
            return response.status(409).json({
                error: `${person.name} exists already`,
            });
        } else {
            data = data.concat(person);
            response.send(true);
        }
    }
});

// delete a person
app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    data = data.filter((person) => person.id !== id);

    response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
