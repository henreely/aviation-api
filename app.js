


// a cleaner  method PORT
const express = require('express');
const app = express();
const PORT = 5000;


// Middleware to PARSE json data
app.use(express.json());


//simulated database array
let users = [
    { id: 1, name: 'John Doe', email: 'johndoe@gmail.com'},
    { id: 2, name: 'Peter Parker', email: 'peterparker@gmail.com'},
];

//create - add new user
app.post("/create-users", (req, res) => {
    const { name,  email } = req.body;
    const existUser = users.find(user => users.email === email);
    if (existUser) {
        return res.status(400).json({
            message: "User already exists with this email"
        });
              
};
const newUser = {
        id: users.length + 1,
        name,
        email,
     };

      users.push(newUser);
      res.status(201).json({
        message: "User created successfully",
        newUser
      });

});

     
      // Get all users
      app.get("/get-all-users", (req, res) => {
        res.json(users);
      });

      // Read => Get Single User
      app.get("/getUserById/:id", (req, res) => {
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) return res.status(404).json({ message: "User not found"});
        res.json(user);

      });

      // Update => Udate user
      app.put('/updateUser/:id', (req, res) => {
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) return res.status(404).json({ message: "User not found"});

        //Updating that User
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        res.json(user);

      })

      // Delete => Delete User
      app.delete('/deleteUser/:id', (req, res) =>{
        const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
      if (userIndex === -1) return res.status(404).json({ message: "User not found"});

      const deletedUser = users.splice(userIndex, 1);
      res.json({ message: `User deleted`, user: deletedUser[0]});
    });


      // Route handler to access the local server,
      app.get('/', (req, res) => { 
        res.send("Hello from express server");
      });

      // Creating PORT NUMGER FOR OUR SERVERR
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
