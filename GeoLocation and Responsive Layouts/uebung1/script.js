function zeigePosition(position) {
    // TODO: Zeigen Sie die Position in den entsprechenden Feldern


    // TODO: Passen Sie den Link zu Google Maps an

}

function zeigeFehler(error) {
    let text;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            text = "Benutzer verweigert Zugriff";
            break;
        case error.TIMEOUT:
            text = "Wartezeit überschritten";
            break;
        case error.POSITION_UNAVAILABLE:
            text = "Position nicht verfügbar";
            break;
        default:
            text = "Unbekannter Fehler aufgetreten";
    }
    document.getElementById("latitude").innerHTML = text;
}

function show() {
    // TODO: Übergeben Sie die Funktionen zeigePosition und zeigeFehler als Parameter
    navigator.geolocation.getCurrentPosition();
}