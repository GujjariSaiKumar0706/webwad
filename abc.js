const exp = require('express')
const app = exp()
app.use(exp.json())

let students = [
    {
        roll : "22071A0550",
        name: "Rushendra",
        branch : "CSE",
        section:"A",
        year: "II"
    }
]

app.get('/students',(req,res)=>{
    res.send({message:"all students",payload:students})
})

app.get('/student/:id',(req,res)=>{
    let student = students.find((s)=>(s.roll == (req.params.id)))
    if(student == null) res.send({message:"Student not found"})
    else res.send({message:"Student Found",payload:student})
})

app.post('/new-student',(req,res)=>{
    let student = req.body
    console.log(student)
    students.push(student)
    res.send({message:"Student Uploaded",payload:students})
})

app.delete('/delete-student/:id',(req,res)=>{
    let studentIndex = students.findIndex((s)=>(s.roll == (req.params.id)))
    if(studentIndex==null) res.send({message:"Student not found"})
    else {
    students.splice(studentIndex,1)
    res.send({message:"Student Deleted",payload:students})
    }
})
app.put('/update-student/:id',(req,res)=>{
    let studentIndex = students.findIndex((s)=>(s.roll == (req.params.id)))
    if(studentIndex==null) res.send({message:"Student not found"})
    else {
        let student = req.body
    students.splice(studentIndex,1,student)
    res.send({message:"Students Updated",payload:students})
    }
})

app.listen(4000,()=>{
    console.log('By 22071A0531')
    console.log('Server running on port 4000')
})

