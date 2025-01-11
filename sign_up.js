document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatPassword = document.getElementById('repeatPassword').value;

    // Reset previous error messages
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('repeatPasswordError').innerText = '';

    // Validate if fields are empty
    if (!email || !password || !repeatPassword) {
        alert('Please fill in all fields.');
        return; // Stop further execution if any field is empty
    }

    let isValid = true;

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        isValid = false;
    }

    // Password validation
    if (password.length < 6) {
        document.getElementById('passwordError').innerText = 'Password must be at least 6 characters.';
        isValid = false;
    }

    // Repeat Password validation
    if (password !== repeatPassword) {
        document.getElementById('repeatPasswordError').innerText = 'Passwords do not match.';
        isValid = false;
    }

    // If all validations pass, submit the form using Fetch API
    if (isValid) {
        // Create URL-encoded string
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('repeatPassword', repeatPassword);

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  // Explicitly set the content type
            },
            body: formData.toString(),  // Serialize the form data
        })
        .then(response => response.json())
        .then(data => {
            // Show alert based on response from the server
            if (data.message === 'Account created successfully!') {
                alert('Registration successful!');
            } else if (data.message === 'Email is already registered.') {
                alert('This email is already registered.');
            } else {
                alert('Error: ' + data.message);
            }
            document.getElementById('signupForm').reset();
        })
        .catch(error => {
            alert('An error occurred. Please try again.');
        });
    }
});
