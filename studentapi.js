const exp = require('express')
const app = exp()
const bcrypt = require('bcryptjs')
app.use(exp.json())


const jwt = require('jsonwebtoken');

const secretKey = 'secret_key';


function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' });
}


function verifyToken(req,res,next){
    //get bearer token from headers of req
    const bearerToken=req.headers.authorization;
   
    //if bearer token not available
    if(!bearerToken){
        return res.send({message:"Unauthorized access. Please login to continue"})
    }
    //extract token from bearer token
    const token=bearerToken.split(' ')[1]
   // console.log(token)
    try{
        jwt.verify(token,secretKey)
        next()
    }catch(err){
        next(err)
    }
}

let users = [];

let students = [
    {
        roll : "22071A0550",
        name: "Rushendra",
        branch : "CSE",
        section:"A",
        year: "II"
    }
]

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    if (users.find(user => user.username === username)) {
        return res.send({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user
    users.push({ username, password: hashedPassword });

    res.send({ message: 'User registered successfully' });
});

// User login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find the user by username
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.send({ message: 'Invalid credentials' });
    }

    // Check the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.send({ message: 'Invalid credentials' });
    }

    // Generate a token
    const token = generateToken({ username });

    res.send({ message: 'Login successful', token });
});

app.get('/students',verifyToken,(req,res)=>{
    res.send({message:"all students",payload:students})
})

app.get('/student/:id',verifyToken,(req,res)=>{
    let student = students.find((s)=>(s.roll == (req.params.id)))
    if(student == null) res.send({message:"Student not found"})
    else res.send({message:"Student Found",payload:student})
})

app.post('/new-student',verifyToken,(req,res)=>{
    let student = req.body
    students.push(student)
    res.send({message:"Student Uploaded",payload:students})
})

app.delete('/delete-student/:id',verifyToken,(req,res)=>{
    let studentIndex = students.findIndex((s)=>(s.roll == (req.params.id)))
    if(studentIndex==null) res.send({message:"Student not found"})
    else {
    students.splice(studentIndex,1)
    res.send({message:"Student Deleted",payload:students})
    }
})
app.put('/update-student/:id',verifyToken,(req,res)=>{
    let studentIndex = students.findIndex((s)=>(s.roll == (req.params.id)))
    if(studentIndex==null) res.send({message:"Student not found"})
    else {
        let student = req.body
    students.splice(studentIndex,1,student)
    res.send({message:"Students Updated",payload:students})
    }
})

app.listen(4000,()=>{
    console.log('By 22071A0523')
    console.log('Server with authentication running on port 4000')
})