
function sendMessage() {
    const v = document.getElementById("messageInput").value;
    document.getElementById("1234").innerText = `message : ${v}`
    fetch("/getData", {
        method : 'POST',
        headers:{
            'Content-Type':'application/json'
        }, 
        body: JSON.stringify({"message" : v})
        })
        .then(response => response.json())
        .then(data => {
            alert(data);
        })
        .catch(error => {
            console.log(error)
        })
}