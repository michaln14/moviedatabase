const pridej = document.querySelector(".inputPridej")

pridej.addEventListener("submit", function(event){
event.preventDefault();
    
    let addedName = event.target.elements.pridejUzivatel.value
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if(users.length >= 5){

        alert("Number of profiles reaches maximum limit");
        return;
    }
if(addedName.length <= 2){
    return alert("Use at least three characters")
} else {
    users.push(addedName);
localStorage.setItem("users", JSON.stringify(users));
event.target.reset();
location.reload();
}
});


window.addEventListener('DOMContentLoaded', () => {
    displayUsers();
});





