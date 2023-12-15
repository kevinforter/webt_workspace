function show() {
    // TODO: Übergeben Sie die Funktionen zeigePosition und zeigeFehler als Parameter
    navigator.geolocation.getCurrentPosition(showPosition, showError);
}

function showPosition(position) {
    // TODO: Zeigen Sie die Position in den entsprechenden Feldern
    document.getElementById("latitude").innerHTML =
        " " + position.coords.latitude;

    document.getElementById("longitude").innerHTML =
        " " + position.coords.longitude;

    // TODO: Passen Sie den Link zu Google Maps an

        const link = document.getElementById("maps");
        link.setAttribute(
            "href",
            " https://www.google.com/maps/search/?api=1&query="
            + position.coords.latitude + ","
            + position.coords.longitude
            )

        return false
}
function showError(error) {
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

