const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit',(e)=>{
    document.getElementById("msg-1").innerHTML = 'Loading...';
    document.getElementById("msg-2").innerHTML = '';
    e.preventDefault();
    const location = search.value;
    // console.log(location)
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            document.getElementById("msg-1").innerHTML = data.error;
            document.getElementById("msg-2").innerHTML = '';
            // console.log(data.error)
        } else{
            document.getElementById("msg-1").innerHTML = data.location;
            document.getElementById("msg-2").innerHTML = data.forecast;
            // console.log(data.location,data.forecast)
        // console.log(data)
        }
    })
})
})