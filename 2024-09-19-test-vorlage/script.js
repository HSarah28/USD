document.getElementById('initialSubmit').addEventListener('click', function () {
    // Vorherige Fehlermeldungen löschen
    document.getElementById('firstNameError').innerText = '';
    document.getElementById('lastNameError').innerText = '';
    document.getElementById('ageError').innerText = '';

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const birthDate = document.getElementById('birthDate').value;
    
    let valid = true;
    
    // Vornamen und Nachnamen validieren
    if (!validateName(firstName)) {
        document.getElementById('firstNameError').innerText = 'Der Vorname darf keine Ziffern, Doppelpunkt oder Ausrufezeichen enthalten.';
        valid = false;
    }
    
    if (!validateName(lastName)) {
        document.getElementById('lastNameError').innerText = 'Der Nachname darf keine Ziffern, Doppelpunkt oder Ausrufezeichen enthalten.';
        valid = false;
    }
    
    // Alter validieren
    if (!validateAge(birthDate)) {
        valid = false;
    }
    
    // Wenn alles gültig ist, zeige das Mathe-Captcha
    if (valid) {
        document.querySelector('.math-captcha').style.display = 'block';
        generateMathCaptcha();  // Generiere die Mathe-Aufgabe
    }
});

function validateName(name) {
    // Beispielhafte Validierung: keine Ziffern, Sonderzeichen oder Leerzeichen
    const invalidCharacters = "0123456789!@#$%^&*()_+=[]{}|;:'\"<>,.?/~`";
    for (let char of name) {
        if (invalidCharacters.includes(char)) {
            return false;
        }
    }
    return true;
}

function validateAge(birthdate) {
    const currentDate = new Date();
    const birthDate = new Date(birthdate);
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Überprüfe, ob der Geburtstag in diesem Jahr schon war
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    const dayDiff = currentDate.getDate() - birthDate.getDate();
    
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;  // Alter um 1 reduzieren, wenn der Geburtstag dieses Jahr noch nicht war
    }

    if (age >= 18) {
        document.getElementById('ageError').innerText = '';
        return true;
    } else {
        document.getElementById('ageError').innerText = 'Sie müssen mindestens 18 Jahre alt sein.';
        return false;
    }
}

// Generate a math CAPTCHA using Newton API
async function generateMathCaptcha() {
    // Generiere zwei Zufallszahlen zwischen -8 und 25
    function getRandomNumber() {
        return Math.floor(Math.random() * (25 - (-8) + 1)) + (-8);
    }

    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    
    // Wähle eine zufällige Operation
    const operations = ['+', '-', '*', '/'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    // Mathefrage erstellen
    const mathQuestion = `${num1} ${operation} ${num2}`;
    document.getElementById('mathQuestion').innerText = `Lösen Sie die folgende Mathe-Aufgabe: ${mathQuestion}`;

    // Hörer für die Überprüfung der Antwort einrichten
    document.getElementById('captchaSubmit').addEventListener('click', async function (event) {
        event.preventDefault(); // Verhindere das Absenden des Formulars

        const userAnswer = document.getElementById('mathAnswer').value;
        const status = document.getElementById('status');
        status.innerText = '';

        // Newton-API verwenden, um die Antwort zu validieren
        const response = await fetch(`https://newton.now.sh/api/v2/simplify/${encodeURIComponent(mathQuestion)}`);
        const data = await response.json();
        const correctAnswer = data.result; // Das Ergebnis der Newton-API

        // Vergleiche die Antwort des Nutzers mit der korrekten Antwort
        if (parseFloat(userAnswer) === parseFloat(correctAnswer)) {
            status.innerText = 'Richtige Antwort! Sie können fortfahren.';
        } else {
            status.innerText = `Falsche Antwort! Die korrekte Antwort wäre ${correctAnswer}.`;
        }
    });
}
