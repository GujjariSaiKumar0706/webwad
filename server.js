const exp = require('express')
const app = exp()
app.use(exp.json())

const studentapp=require('/studentsapi')
app.use('/student-api',studentapp)



const port = 4000;
app.listen(port,()=>{ console.log(`Web server running on port ${port}`)
})