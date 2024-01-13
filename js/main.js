/**
 * sleduje odeslání formuláře pro přihlášení k odběru, asynchronně odesílá data na server a zobrazuje zprávu o úspěšném přihlášení k odběru nebo chybovou zprávu.
 */
document.getElementById('subscribe-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var email = document.getElementById('contactemail').value;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'server.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log('Response from server:', xhr.responseText); // Log the response for debugging

            if (xhr.status === 200) {
                if (xhr.responseText) {
                    try {
                        var response = JSON.parse(xhr.responseText);
                        if (response.status === 'success') {
                            console.log(response.message);
                        } else {
                            var errorMessageElement = document.getElementById('error-message');
                            errorMessageElement.textContent = 'Subscription error: ' + response.message;
                        }
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                } else {
                    var errorMessageElement = document.getElementById('error-message');
                    errorMessageElement.textContent = 'Empty response from server.';
                }
            } else {
                var errorMessageElement = document.getElementById('error-message');
                errorMessageElement.textContent = 'Server data error: ' + xhr.status;
            }
        }
    };
    xhr.send('action=subscribe&contactemail=' + encodeURIComponent(email));});

/**
 * umožňuje plynulé posouvání na určitý prvek po kliknutí na prvek.
 */
document.addEventListener("DOMContentLoaded", function () {
    var angleIcon = document.querySelector(".angle");
    var targetElement = document.querySelector(".downnavbar");

    angleIcon.addEventListener("click", function () {
        targetElement.scrollIntoView({ behavior: "smooth" });
    });
});