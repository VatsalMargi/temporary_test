import express from "express";
const app=express()
const port=3000

// app.get("/",(req,res)=>{
//     res.send("Hello from Hitesh snd his tea!")
    
// })
// app.get("/ice-tea",(req,res)=>{
//     res.send("It's ice tea 4 u")
    
// })
// app.get("/twitter",(req,res)=>{
//     res.send("It's twitter tea 4 u")
    
// })
app.use(express.json())

let teaData=[]
let nextId=1

app.post('/teas',(req,res)=>{
    const {name,price}=req.body
    const newTea={id:nextId++,name,price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get('/show',(req,res)=>{
    res.status(200).send(teaData)
})
app.get('/show/:id',(req,res)=>{
    const tea=teaData.find(t=> t.id=== parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("could not found")
    }
    
    res.status(200).send(tea)
})

app.put('/show/:id',(req,res)=>{
    const tea=teaData.find(t=> t.id=== parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("could not found")
    }
    const {name,price}=req.body
    tea.name=name
    tea.price=price
    return res.status(200).send(tea)
    
    
})
app.delete('/show/:id',(req,res)=>{
    const index=teaData.findIndex(t=>t.id=== parseInt(req.params.id))
    if(!index){
        return res.status(404).send("could not found")
    }
    
    teaData.splice(index,1)
    return res.status(204).send("Deleted")

})
app.listen(port,()=>{
    console.log(`Server is listening on port: ${port}...`)
})