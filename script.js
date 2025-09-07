document.addEventListener("DOMContentLoaded",()=>{
    const form = document.getElementById("ticketForm");
    form.addEventListener("submit",handleFormSubmit);
});

function handleFormSubmit(event){
    event.preventDefault();

    clearErrors();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const date = document.getElementById("date").value;
    const avatarFile = document.getElementById("avatar").files[0];

    const isValid = validateForm(name,email,date);
    if(!isValid) return;

    displayTicket(name,email,date,avatarFile);
}

function clearErrors(){
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("dateError").textContent = "";
    document.getElementById("avatarError").textContent = "";
}

function validateForm(name,email,date){
    let valid = true;

    if(name === ""){
        document.getElementById("nameError").textContent = "Name is required";
        valid = false;
    }

    if(email === ""){
        document.getElementById("emailError").textContent = "Email is required";
        valid = false;
    }else if(!email.includes("@")|| !email.includes(".")){
        document.getElementById("emailError").textContent = "Enter a valid email";
        valid = false;
    }

    if(date === ""){
        document.getElementById("dateError").textContent = "Event date is required";
        valid = false;
    }

    return valid;
}

function displayTicket(name,email,date,avatarFile){
    document.getElementById("ticketName").textContent = name;
    document.getElementById("ticketEmail").textContent = email;
    document.getElementById("ticketDate").textContent = date;

    if(avatarFile){
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById("ticketAvatar").src = e.target.result;
        };
        reader.readAsDataURL(avatarFile);
    }else{
        document.getElementById("ticketAvatar").src = "";
    }

    document.getElementById("ticketsection").hidden = false;
}