function displayUsers() {
    let userList = document.getElementById("userList");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    userList.innerHTML = '';

    users.forEach((user, index) => {
        let container = document.createElement("div");
        container.className = "profile-container";

        let div = document.createElement("div");
        div.className = "profile-card";
        div.dataset.userId = index;

        let p = document.createElement("p");
        p.textContent = user;

        div.appendChild(p);

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete profile";
        deleteButton.className = "delete-button";
        container.appendChild(div);
        container.appendChild(deleteButton);

        userList.appendChild(container);

        div.addEventListener('click', () => {
            localStorage.setItem('currentProfile', user);
            window.location.href = 'profile.html'; 
        });

        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteUser(index);
        });
    });
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userName = users[index];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    
    
    removeProfileData(userName);
    
    displayUsers();
}

function removeProfileData(userName) {
    
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith(`${userName}`)) {
            localStorage.removeItem(key);
        }
    });
}




