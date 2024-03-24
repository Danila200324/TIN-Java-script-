document.addEventListener("DOMContentLoaded", function () {
    const priceInput = document.getElementById("price");
    const priceError = document.getElementById("priceError");

    const emailInput = document.getElementById("contactEmail");
    const emailError = document.getElementById("emailError");

    const imageInput = document.getElementById("file1");
    const imageError = document.getElementById("imageError");

    const bookNameInput = document.getElementById("bookName");
    const bookNameError = document.getElementById("bookNameError");

    priceInput.addEventListener("input", function () {
        const priceValue = parseFloat(priceInput.value);

        if (isNaN(priceValue) || priceValue < 0) {
            priceInput.classList.add("wrong-input");
            priceError.textContent = "Price must be a valid positive number.";
            priceInput.setCustomValidity("Invalid price");
        } else {
            priceInput.classList.remove("wrong-input");
            priceInput.classList.add("correct-input");
            priceError.textContent = ""; // Clear the error message
            priceInput.setCustomValidity("");
        }
    });

    emailInput.addEventListener("input", function () {
        const emailValue = emailInput.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!emailPattern.test(emailValue)) {
            emailInput.classList.add("wrong-input");
            emailError.textContent = "Invalid email address";
            emailInput.setCustomValidity("Invalid email");
        } else {
            emailInput.classList.remove("wrong-input");
            emailInput.classList.add("correct-input");
            emailError.textContent = ""; // Clear the error message
            emailInput.setCustomValidity("");
        }
    });

    imageInput.addEventListener("input", function () {
        if (imageInput.files.length > 0) {
            const fileSize = imageInput.files[0].size / 1024 / 1024; // File size in MB
            if (fileSize > 3) {
                imageInput.classList.add("wrong-input");
                imageError.textContent = "Image size must be less than 3MB.";
                imageInput.setCustomValidity("Invalid image");
            } else {
                imageInput.classList.remove("wrong-input");
                imageInput.classList.add("correct-input");
                imageError.textContent = ""; // Clear the error message
                imageInput.setCustomValidity("");
            }
        }
    });

    bookNameInput.addEventListener("input", function () {
        if (bookNameInput.value.trim() === "") {
            bookNameInput.classList.add("wrong-input");
            bookNameError.textContent = "Book name can't be empty.";
            bookNameInput.setCustomValidity("Book name is required");
        } else {
            bookNameInput.classList.remove("wrong-input");
            bookNameInput.classList.add("correct-input");
            bookNameError.textContent = ""; // Clear the error message
            bookNameInput.setCustomValidity("");
        }
    });
});