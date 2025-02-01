const lowercaseletters = "abcdefghijklmnopqrstuvwxyz"; // Corrected variable name
const uppercaseletters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

const lengthEL = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generate = document.getElementById("generate");
const passwordEl = document.getElementById("password");
const copy = document.getElementById("copy");

// Generate Password Logic
generate.addEventListener("click", () => {
    const length = parseInt(lengthEL.value, 10); // Parse length as an integer
    let characters = "";
    let password = "";

    // Build the character set based on selected options
    if (uppercase.checked) {
        characters += uppercaseletters;
    }
    if (lowercase.checked) {
        characters += lowercaseletters;
    }
    if (numbersEl.checked) {
        characters += numbers;
    }
    if (symbolsEl.checked) {
        characters += symbols;
    }

    // Generate the password
    if (characters.length === 0) {
        alert("Please select at least one character type!");
        return;
    }
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    passwordEl.value = password;
});

// Copy Password Logic
copy.addEventListener("click", () => {
    if (passwordEl.value === "") {
        alert("Password is empty!");
    } else {
        navigator.clipboard.writeText(passwordEl.value)
            .then(() => {
                alert("Password copied to clipboard");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });

        // Add a Delete Button for Password
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.style.color = "red";
        deleteBtn.style.marginLeft = "10px";
        deleteBtn.id = "delete-btn";

        // Avoid appending multiple delete buttons
        if (!document.getElementById("delete-btn")) {
            copy.parentNode.appendChild(deleteBtn);
        }

        // Add delete functionality
        deleteBtn.addEventListener("click", () => {
            passwordEl.value = ""; // Clear the password
            deleteBtn.remove(); // Remove the delete button
        });
    }
});
