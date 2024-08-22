document.getElementById('waehrungsForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seite neu laden)
 
    // Eingabewerte holen
    const betrag = parseFloat(document.getElementById('betrag').value);
    const waehrung = document.getElementById('waehrung').value;
 
    // Wechselkurse definieren
    const wechselkurse = {
        eur: 1,        // Basiswährung Euro
        usd: 1.1,      // Beispiel: 1 EUR = 1.1 USD
        gbp: 0.85      // Beispiel: 1 EUR = 0.85 GBP
    };
 
    // Berechnung
    const umgerechneterBetrag = betrag * wechselkurse[waehrung];
 
    // Ergebnis anzeigen
    const ergebnisDiv = document.getElementById('ergebnis');
    ergebnisDiv.textContent = `Der Betrag in ${waehrung.toUpperCase()} ist: ${umgerechneterBetrag.toFixed(2)}`;
});