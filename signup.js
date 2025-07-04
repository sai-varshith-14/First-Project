

function add() {
    let value1=document.getElementById('namee')
    let text1=value1.value;
     console.log(value1.value);
    let value2=document.getElementById('mail')
    let text2=value2.value;
    console.log(value2.value);
    let value3=document.getElementById('pass')
    let text3=value3.value;
   console.log(value3.value);

   fetch('http://localhost:3000/signup',{
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body:JSON.stringify({text1,text2,text3})
   })
}

function ad(){
    let value1=document.getElementById('mail')
    let value2=document.getElementById('pass')
    let text1=value1.value;
    let text2=value2.value;

    fetch('http://localhost:3000/login',{
        method:'POST',
     headers: {'Content-Type':'application/json'},
    body:JSON.stringify({text1,text2})
   })

}