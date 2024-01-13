/**
 * sleduje událost načtení dokumentu (DOMContentLoaded) a nastaví obsluhu události pro odeslání přihlašovacího formuláře na server.
 */
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        var loginUsername = document.getElementById('loginUsername').value;
        var loginPassword = document.getElementById('loginPassword').value;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'server.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var result = JSON.parse(xhr.responseText);
                    if (result.status === 'success') {
                        window.location.href = '../html/main.php';
                    } else {
                        alert('Login error: ' + result.message);
                    }
                } else {
                    alert('Login Error');
                }
            }
        };

        var data = 'action=login&username=' + encodeURIComponent(loginUsername) + '&password=' + encodeURIComponent(loginPassword);
        xhr.send(data);
    });
});
