const express=require('express');
const cors=require('cors')
const app = express();
const mysql=require('mysql2');
const bcrypt=require('bcrypt');

app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'login'
})

db.connect((err)=>{
    if(err){
        console.log('Error connecting to database');
        return
    }
    console.log('Connected with database');
})

app.post('/login',(req,res)=>{
    const email=req.body.text1;
    const password=req.body.password;

    const sql=`select * from loginItems where email='${email}'`;

    db.query(sql,[email],(err,result)=>{
        if(err){
            console.log(error)
            return res.status(500).json("something wrong")
        }
        if(results.length===0){
            console.log('Email not found',email);
            res.redirect('/signup.html');
            return;
        }
        const user=results[0];
        const storedHp=user.password;

        bcrypt.compare(password,storedHp,(err,isMatch)=>{
            if(err){
                console.log(err);
                res.status(500).send('Error comparing passwords');
                return;
            }
            if(isMatch){
                console.log('Login successful',user.email);
                res.redirect('/welcome.html');
            }
            else{
                console.log('wrong password');
                res.redirect('/');
            }
        });
    });
});



app.post('/signup',async (req,res)=>{
    console.log(req.body);
    const p1 = req.body.text3;
    let hashedPassword=await bcrypt.hash(p1,10);
    
    db.query(`insert into loginItems(userName,email,password) values('${req.body.text1}','${req.body.text2}','${hashedPassword}')`,(error,results)=>{
        if(err){
            console.log('Error',err);
            if(err.code==='er_dup_entry'){
                res.status(409).send('Email already registered');
            }
            return;
        }
        console.log(results);
       res.status(200).json("User registred successfuly");
       res.redirect('/welcome.html');
       return;
    });

});

app.get('/login.html', (req, res) => {
    
});

app.get('/', (req, res) => {
     
});


app.listen(3000,()=>{
    console.log('server running on port 3000')
})

