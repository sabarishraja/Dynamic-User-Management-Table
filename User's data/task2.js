var formContainer = document.getElementById("form_user");
var form = document.getElementById("create_user");

var userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];

window.addEventListener("load", ShowrowinTable)

var tableBody = document.getElementById("data_table");
var imageInput = document.getElementById("accept_image");


//Create button display 
var create_btn = document.getElementById("create_button");
function displayFormCreate(){
    formContainer.style.display = "block";
    form.reset();
    profilePic.src = "images/profile pic.svg";
    delete_bin.style.display = "none";
    document.querySelector("#create_user h2").innerText = "Create User";
    document.getElementById("submit_btn").innerText = "Submit";
    console.log(first_name_input.style.display)
    first_name_input.style.display = "none";
    last_name_input.style.display = "none";
    user_name_input.style.display = "none";
    first_last_user_name_error();
      
}
//BUBBLING FOR CLICKING OUTSIDE THE FORM
formContainer.addEventListener('click', e=>{
    if(!form.contains(e.target) && e.target !== form){
        formContainer.style.display = "none";
    }
})
//Cancel Button hide
var cancel_btn = document.getElementById("cancel")
function closeForm(){
    formContainer.style.display = "none";
}
// When adding a new image by uploading, display the image
const delete_bin = document.getElementById("delete_bin")
const profilePic = document.getElementById("ProfilePic");
imageInput.onchange = function () {
    
    const reader = new FileReader();
    reader.addEventListener("load", () =>{
        if(this.files.length > 0){
            const fileSize = this.files[0].size;
            const fileMb = fileSize / (1024 ** 2);
            if(fileMb > 1){
                showImagesizepopup();
            }
            else{
                profilePic.src = reader.result;
            }
        }
        
    })
    reader.readAsDataURL(this.files[0]);

    //Displaying the deletebin image
    delete_bin.style.display="block";
    delete_bin.onclick = function(){
        profilePic.src = "images/profile pic.svg";
        delete_bin.style.display = "none";
    }

};

function showImagesizepopup(){
    const confirmationPopup = document.createElement("div");
    confirmationPopup.id = "size_exceeded_popup";

    const size_exceeded_popup = document.createElement("div");
    size_exceeded_popup.id = "size_exceeded_content";
    size_exceeded_popup.innerHTML = "Exceeded size limit!\nUpload an image less than 1 Mb";
    confirmationPopup.appendChild(size_exceeded_popup);

    const close = document.createElement("button");
    close.id = "close_btn";
    close.innerHTML = "Close";
    size_exceeded_popup.appendChild(close);

    // Add event listener to close button
    close.addEventListener("click", function() {
        // Remove confirmation popup
        confirmationPopup.remove();
    });

    // Append confirmation popup to the body
    document.body.appendChild(confirmationPopup);
}



var idno = null;
var onclickid = null;
var x = document.forms["create_user"]["First Name"];
var first_name_input = document.getElementById("enter_first_name");
var y = document.forms["create_user"]["Last Name"];
var last_name_input = document.getElementById("enter_last_name");
var z = document.forms["create_user"]["User's Username"];
var user_name_input = document.getElementById("enter_user_name");
function first_last_user_name_error(){
    x.addEventListener("input", ()=>{
        if(x.value.length<1)  {
            first_name_input.style.display = "block";
        }
        else    {
            first_name_input.style.display = "none";
        }
    })
    y.addEventListener("input", ()=>{
        if(y.value.length<1)  {
            last_name_input.style.display = "block";
        }
        else    {
            last_name_input.style.display = "none";
        }
    })
    z.addEventListener("input", ()=>{
        if(z.value.length<1)  {
            console.log('IF');
            user_name_input.style.display = "block";
        }
        else    {
            console.log('ELSE');
            user_name_input.style.display = "none";
        }
    })
}


function onFormSubmit(){
    // //Check if any input field empty
    if(x.value.length < 1 || y.value.length<1 || z.value.length<1){
        if(x.value.length>0)    first_name_input.style.display = "none";
        else    first_name_input.style.display = "block";
        if(y.value.length>0)    last_name_input.style.display = "none";
        else    last_name_input.style.display = "block";
        if(z.value.length>0)    user_name_input.style.display = "none";
        else    user_name_input.style.display = "block";
        first_last_user_name_error();
    }
    //ELSE ALL THE VALUES ARE ENTERED, THEN EXECUTE THE CREATE AND EDIT BUTTON FUNCTIONS
    else{
        //if submit from pressing create button -> addDatafromForm
        if(idno==null){
            addDatafromForm();
        }
        //else update user details in array by getting index from editUser
        else{
            UpdateForm(idno)
            idno = null
        }
    }
}

function addDatafromForm(){
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var username = document.getElementById("username").value;
    var avatar = profilePic.src;
    var new_object = {
        Firstname:fname,
        Lastname:lname,
        Username:username,
        Avatar:avatar
    };
    userList.push(new_object);
    localStorage.setItem('userList', JSON.stringify(userList));
    ShowrowinTable();
    
    form.reset();
    profilePic.src = "images/profile pic.svg";
    closeForm();
}
function ShowrowinTable(){
    tableBody.innerHTML = "";
    userList.forEach((user, index) => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${user.Avatar}" alt="Avatar" class="avatar" id = "zoro_image"></td>
            <td>${user.Firstname}</td>
            <td>${user.Lastname}</td>
            <td>${user.Username}</td>
            <td>
                <button id="edit_btn_css" onclick="EditUser(${index})">Edit</button>
                <button id="delete_btn_css" onclick="DeleteUser(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function EditUser(index){
    // Display the form
    formContainer.style.display = "block";
    //Change the innertext
    document.querySelector("#create_user h2").innerText = "Edit User";
    document.getElementById("submit_btn").innerText = "Update";

    //Pre-fill the values in the input
    profilePic.src = userList[index].Avatar;
    document.getElementById("fname").value = userList[index].Firstname;
    document.getElementById("lname").value = userList[index].Lastname;
    document.getElementById("username").value = userList[index].Username;
    idno = index;
    if(x.value.length>0)    first_name_input.style.display = "none";
    if(y.value.length>0)    last_name_input.style.display = "none";
    if(z.value.length>0)    user_name_input.style.display = "none";
    first_last_user_name_error();
}



function UpdateForm(idno){
    userList[idno].Firstname = document.getElementById("fname").value;
    userList[idno].Lastname = document.getElementById("lname").value;
    userList[idno].Username = document.getElementById("username").value;
    userList[idno].Avatar = profilePic.src
    
    localStorage.setItem('userList', JSON.stringify(userList))
    ShowrowinTable();
    formContainer.style.display="none";
}

// Function to delete user
function DeleteUser(index) {
    // Create delete confirmation popup
    const confirmationPopup = document.createElement("div");
    confirmationPopup.id = "confirmation-popup";

    const size_exceeded_popup = document.createElement("div");
    size_exceeded_popup.id = "confirmation-content";
    size_exceeded_popup.innerHTML = "Are you sure you want to delete this user?";
    confirmationPopup.appendChild(size_exceeded_popup);

    const confirmBtn = document.createElement("button");
    confirmBtn.id = "confirm-btn";
    confirmBtn.innerHTML = "Confirm";
    size_exceeded_popup.appendChild(confirmBtn);

    const closeButton = document.createElement("button");
    closeButton.id = "X_button";
    closeButton.innerHTML = "&times";
    size_exceeded_popup.appendChild(closeButton);

    // Add event listener to confirm button
    confirmBtn.addEventListener("click", function() {
        // Delete user
        userList.splice(index, 1);
        localStorage.setItem('userList', JSON.stringify(userList));
        ShowrowinTable();
        // Remove confirmation popup
        confirmationPopup.remove();
    });

    // Add event listener to close button
    closeButton.addEventListener("click", function() {
        // Remove confirmation popup
        confirmationPopup.remove();
    });
    // CLICKING OUTSIDE THE CONFIRMATION  CONTENT
    confirmationPopup.addEventListener('click', e=>{
        if(!size_exceeded_popup.contains(e.target) && e.target !== size_exceeded_popup){
            confirmationPopup.style.display="none";
        }
    })
    // Append confirmation popup to the body
    document.body.appendChild(confirmationPopup);
}



