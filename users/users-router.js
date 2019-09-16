
const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');


db.post("/api/register", (req, res) => {
    const user = req.body;
    if (!user.username || !user.password) {
        res.status(404).json({ message: "missing user or pass" });
    } else {
        const hash = bcrypt.hashSync(user.password, 12);
        user.password = hash;
        Users.add(user)
            .then(saved => {
                res.status(201).json(saved);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }
});

db.get("/api/users", async(req, res) => {
    try {
        const getUsers = await Users.get();
        if (getUsers) {
            res.status(200).json(getUsers);
        } else {
            res.status(400).json({ message: 'cant get users' });
        }
    } catch (err) {
        res.status(500).json({ message: "Error." });
    }
});
db.post('/api/login', (req, res) => {
    let { username, password } = req.body;

    Users.login({ username })
        .first()
        .then(user => {
            if (user) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});