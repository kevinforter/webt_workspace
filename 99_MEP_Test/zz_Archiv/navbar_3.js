function toggleDropdown() {
    var links = document.querySelectorAll('.navbar a:not(.dropdown-btn)');
    for (var i = 0; i < links.length; i++) {
        if (links[i].style.display === "block") {
            links[i].style.display = "none";
        } else {
            links[i].style.display = "block";
        }
    }
}