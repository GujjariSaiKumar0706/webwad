
const exp = require('express')
const studentapp = exp()
studentapp.use(exp.json())


let students=[{
    StudentID:"523",
    Password:'saikumar',
    StudentName:'G.Sai Kumar',
    Branch:'CSE',
    Scetion:'A',
    Age:"20",
}]


studentapp.post('/new-student',(req,res)=>{
    
        const newStu=req.body;
        students.push(newStu)
        res.send({message:"Student Uploaded",payload:students})


    }
)


studentapp.get('/students',(req,res)=>{
    res.send({message:"all students",payload:students})
})

studentapp.get('/student/:id',(req,res)=>{
    let student = students.find((s)=>(s.StudentID == (req.params.id)))
    if(student == null) res.send({message:"Student not found"})
    else res.send({message:"Student Found",payload:student})
})

studentapp.delete('/delete-student/:id',(req,res)=>{
    let studentIndex = students.findIndex((s)=>(s.StudentID == (req.params.id)))
    if(studentIndex==null) res.send({message:"Student not found"})
    else {
    students.splice(studentIndex,1)
    res.send({message:"Student Deleted",payload:students})
    }
})
studentapp.put('/update-student/:id',(req,res)=>{
    let studentIndex = students.findIndex((s)=>(s.StudentID == (req.params.id)))
    if(studentIndex==null) res.send({message:"Student not found"})
    else {
        let student = req.body
    students.splice(studentIndex,1,student)
    res.send({message:"Students Updated",payload:students})
    }
})

studentapp.listen(4000,()=>{
    console.log('By 22071A523')
    console.log('Server running on port 4000')
})