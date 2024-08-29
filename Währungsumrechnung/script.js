document.getElementById('waehrungsForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seite neu laden)
 
    // Eingabewerte holen
    const betrag = parseFloat(document.getElementById('betrag').value);
    const waehrung = document.getElementById('waehrung').value;
 
    try {
        // Abrufen des Wechselkurses von einer API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`);
        const data = await response.json();

        // Abrufen des spezifischen Wechselkurses
        const wechselkurs = data.rates[waehrung.toUpperCase()];
        
        // Berechnung
        const umgerechneterBetrag = betrag * wechselkurs;
        
        // Ergebnis anzeigen
        const ergebnisDiv = document.getElementById('ergebnis');
        ergebnisDiv.textContent = `Der Betrag in ${waehrung.toUpperCase()} ist: ${umgerechneterBetrag.toFixed(2)}`;
        
    } catch (error) {
        console.error('Fehler beim Abrufen des Wechselkurses:', error);
        const ergebnisDiv = document.getElementById('ergebnis');
        ergebnisDiv.textContent = 'Es gab ein Problem beim Abrufen des Wechselkurses. Bitte versuchen Sie es später erneut.';
    }
});
