document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        var usernameInput = document.getElementById('username');
        var emailInput = document.getElementById('email');
        var passwordInput = document.getElementById('password');
        var confirmPasswordInput = document.getElementById('confirmPassword');
        var firstNameInput = document.getElementById('firstName');
        var lastNameInput = document.getElementById('lastName');

        var username = usernameInput.value.trim();
        var email = emailInput.value.trim();
        var password = passwordInput.value.trim();
        var confirmPassword = confirmPasswordInput.value.trim();
        var firstName = firstNameInput.value.trim();
        var lastName = lastNameInput.value.trim();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            passwordInput.value = '';
            confirmPasswordInput.value = '';
            return;
        }

        var xhr = new XMLHttpRequest();

        xhr.open('POST', 'server.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        var data = 'action=register' +
            '&username=' + encodeURIComponent(username) +
            '&email=' + encodeURIComponent(email) +
            '&password=' + encodeURIComponent(password) +
            '&firstName=' + encodeURIComponent(firstName) +
            '&lastName=' + encodeURIComponent(lastName);

        xhr.onload = function() {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                if (responseData.status === 'success') {
                    alert('Registration successful!');

                    saveAvatar(avatarFile);
                    saveUserData(username, email, firstName, lastName);
                    window.location.href = 'main.php';


                } else {
                    alert('Registration error: ' + responseData.message);
                }
            } else {
                alert('Error sending request');
            }
        };

        xhr.send(data);
    });

    /**
     * ukládá uživatelská data
     * @param username - přihlášení uživatele
     * @param email - uživatelská pošta
     * @param firstName - jméno uživatele
     * @param lastName - příjmení uživatele
     *  vytvoří objekt s uživatelskými daty, načte stávající data z místního úložiště, přidá nová data a uloží je zpět.
     */
    function saveUserData(username, email, firstName, lastName) {
        var userData = {
            username: username,
            email: email,
            firstName: firstName,
            lastName: lastName
        };

        var existingDataString = localStorage.getItem('user.json');

        var existingData = existingDataString ? JSON.parse(existingDataString) : [];

        existingData.push(userData);

        try {
            localStorage.setItem('user.json', JSON.stringify(existingData));
        } catch (error) {
            console.error('Error saving user.json data:', error);
        }
    }
    async function saveAvatar(file) {
        try {
            const formData = new FormData();
            formData.append('action', 'saveAvatar');
            formData.append('avatar', file);

            const response = await fetch('server.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.status === 'success') {
                    alert('Avatar saved successfully!');
                } else {
                    alert('Avatar saving error: ' + responseData.message);
                }
            } else {
                alert('Error sending avatar request');
            }
        } catch (error) {
            console.error('Error saving avatar:', error);
        }
    }

    var avatarFile = null;

    document.getElementById('avatar').addEventListener('change', function (event) {
        const fileInput = event.target;
        if (fileInput.files.length > 0) {
            avatarFile = fileInput.files[0];
        }
    });

    document.getElementById('sing1').addEventListener('click', function () {
        if (avatarFile) {
            saveAvatar(avatarFile);
        }
    });

});