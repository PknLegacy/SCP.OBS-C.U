// Page Navigation
document.querySelectorAll('.navbar li').forEach(item => {
    item.addEventListener('click', () => {
        let page = item.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
    });
});

// Loader beim Start
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1500);
});

// JSON Loading for Boxes
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', () => {
        const jsonFile = box.getAttribute('data-json');

        fetch(`json/${jsonFile}`)
            .then(response => response.json())
            .then(data => {
                // Fill Content
                document.getElementById('json-title').textContent = data.title;
                document.getElementById('json-text').textContent = data.text;

                // Switch to JSON Page
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById('json-content').classList.add('active');
            })
            .catch(err => {
                document.getElementById('json-title').textContent = "Error";
                document.getElementById('json-text').textContent = "Could not load file.";
            });
    });
});

// Back Button → immer zurück zu "home"
function goBack() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home').classList.add('active');
}

// SCP Files aus JSON laden
document.addEventListener("DOMContentLoaded", () => {
  const scpList = document.getElementById("scp-list");

  fetch("json/data.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(scp => {
        const li = document.createElement("li");
        li.innerHTML = `
          <strong>${scp.id}:</strong> ${scp.title}<br>
          <em>${scp.description}</em><br>
          <a href="${scp.link}" style="color: red;">[Open File]</a>
        `;
        scpList.appendChild(li);
      });
    })
    .catch(error => console.error("Error loading SCP data:", error));
});
// Rechtsklick deaktivieren
document.addEventListener('contextmenu', function(event) {
  event.preventDefault();
});

// Funktion zum Aktivieren des Vollbildmodus
function activateFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { // Safari
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE11
    elem.msRequestFullscreen();
  }
}

// Nach dem ersten Klick in den Vollbildmodus
let fullscreenActivated = false;
document.addEventListener('click', function() {
  if (!fullscreenActivated) {
    activateFullscreen();
    fullscreenActivated = true;
  }
});

// Nach 5 Sekunden automatisch in den Vollbildmodus (falls kein Klick)
setTimeout(function() {
  if (!fullscreenActivated) {
    activateFullscreen();
    fullscreenActivated = true;
  }
}, 5000);
