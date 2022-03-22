const express=require('express')
const bodyParser=require('body-parser')
const mysql=require('mysql')

const app=express()
const port=process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//PORT Listen
app.listen(port)
console.log(`Listen on port ${port}`)

//MYSQL

const pool=mysql.createConnection({
  host       : "localhost",
  user       : "root",
  password   : "",
  database   : "crud"
})

///
var getall=`select * from crud_table`;
var particularid=`select * from crud_table WHERE id = ?`;
var deleteid=`delete from crud_table WHERE id = ?`;
var insert=`insert into crud_table set ?`;
var update=`update crud_table set name = ?,tagline = ?  where id = ?`;

//get all rows
app.get('/',(req,res)=>{
   pool.query(getall,(err,result)=>{
       if(!err){
           res.send(result)
       }else{
           console.log(err)
       }
   })
})

app.get('/:id',(req,res)=>{
    pool.query(particularid,[req.params.id],(err,result)=>{
        
        if(!err){
         
            res.send(result)
        }else{
            console.log(err)
           
        }
    })
 })

 app.delete('/:id',(req,res)=>{
    pool.query(deleteid,[req.params.id],(err,result)=>{
        
        if(!err){
         
            res.send('record deleted successfully')
        }else{
            console.log(err)
           
        }
    })
 })


 app.post('',(req,res)=>{
    pool.query(insert,req.body,(err,result)=>{
        
        if(!err){
         
            res.send(req.body)
        }else{
            console.log(err)
           
        }
    })
 })

 app.post('/update',(req,res)=>{
    const {id,name,tagline,description,image}=req.body;
    pool.query(update,[name,tagline,id],(err,result)=>{
      
        if(!err){
         
            res.send('updateddd')
        }else{
            console.log(err)
           
        }
    })
 })