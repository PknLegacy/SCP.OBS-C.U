// ========== Navigation ==========
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
document.querySelectorAll('.box[data-json]').forEach(box => {
    box.addEventListener('click', () => {
        const jsonFile = box.getAttribute('data-json');

        fetch(`json/${jsonFile}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('json-title').textContent = data.title;
                document.getElementById('json-text').textContent = data.text;
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById('json-content').classList.add('active');
            })
            .catch(err => {
                document.getElementById('json-title').textContent = "Error";
                document.getElementById('json-text').textContent = "Could not load file.";
            });
    });
});

// Back Button → zurück zu "home"
function goBack() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('home').classList.add('active');
}

// SCP Files aus JSON laden
document.addEventListener("DOMContentLoaded", () => {
    const scpList = document.getElementById("scp-list");
    if (!scpList) return;
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

// ========== Spezial-Boxen mit Animation & Modals ==========

// Beispiel-Daten für Uhrzeiten und Nutzer
const globalTimes = [
    { city: "Berlin", offset: 2, image: "assets/berlin.png" },
    { city: "New York", offset: -4, image: "assets/ny.png" },
    { city: "Tokyo", offset: 9, image: "assets/tokyo.png" }
];
const users = [
    { name: "Dr. Bright", image: "assets/bright.jpg", info: "SCP Lead Scientist" },
    { name: "Agent Smith", image: "assets/smith.jpg", info: "Security Officer" },
];

// Modal-Helper
function showModal(html) {
    const modal = document.getElementById('modal');
    modal.innerHTML = `<div class="modal-content">${html}</div>`;
    modal.style.display = 'flex';
}
function closeModal() {
    const modal = document.getElementById('modal');
    modal.innerHTML = '';
    modal.style.display = 'none';
}

// Globale Uhrzeiten
function showGlobalTimeBox() {
    let html = `<h2>Globale Uhrzeiten</h2><div class="clocks">`;
    globalTimes.forEach(tz => {
        html += `<div class="clock">
            <img src="${tz.image}" alt="${tz.city}" width="40"/>
            <div><strong>${tz.city}</strong> <span id="clock-${tz.city}"></span></div>
        </div>`;
    });
    html += `</div><button onclick="closeModal()">Schließen</button>`;
    showModal(html);
    globalTimes.forEach(tz => {
        const updateClock = () => {
            const now = new Date();
            // Zeitzonen Offset
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const local = new Date(utc + 3600000 * tz.offset);
            document.getElementById(`clock-${tz.city}`).textContent =
                local.toLocaleTimeString();
        };
        updateClock();
        setInterval(updateClock, 1000);
    });
}

// Sicherheitsprotokoll mit Animation
function showSecurityProtocol() {
    let html = `
        <h2>Sicherheitsprotokoll</h2>
        <div class="animation-bar"></div>
        <p>Protokoll: Nur autorisierte Nutzer. Alle Aktionen werden protokolliert.<br>
        Zugriff wird überwacht. Kontakt: O5-Command.</p>
        <button onclick="closeModal()">Schließen</button>
    `;
    showModal(html);
}

// Nutzerinformationen mit Bildern
function showUserInfo() {
    let html = `<h2>Nutzer-Informationen</h2><div class="users">`;
    users.forEach(user => {
        html += `<div class="user">
            <img src="${user.image}" alt="${user.name}" width="60"/>
            <div>
                <strong>${user.name}</strong><br/>
                <span>${user.info}</span>
            </div>
        </div>`;
    });
    html += `</div><button onclick="closeModal()">Schließen</button>`;
    showModal(html);
}

// Download Sicherheitsprotokoll mit Ladeanimation
function downloadProtocol() {
    let html = `
        <h2>Download wird vorbereitet...</h2>
        <div class="loader-modal"></div>
        <p>Bitte warten...</p>
    `;
    showModal(html);
    setTimeout(() => {
        // Download-Link
        window.location.href = 'downloads/Sicherheitsprotokoll_V1.22.1.pdf';
        closeModal();
    }, 2500);
}

// Event-Listener für Spezialboxen
document.querySelectorAll('.box.special').forEach(box => {
    box.addEventListener('click', function() {
        switch (box.dataset.action) {
            case 'showGlobalTime':
                showGlobalTimeBox();
                break;
            case 'showSecurityProtocol':
                showSecurityProtocol();
                break;
            case 'showUserInfo':
                showUserInfo();
                break;
            case 'downloadProtocol':
                downloadProtocol();
                break;
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
  const worldDataDiv = document.getElementById("worlddata-list");
  if (!worldDataDiv) return;

  fetch("json/worlddata.json")
    .then(res => res.json())
    .then(dataArr => {
      worldDataDiv.innerHTML = dataArr.map(item => {
        let content = "";
        if (item.type === "image") {
          content = `<img src="${item.file}" alt="${item.title}">`;
        } else if (item.type === "video") {
          content = `
            <video controls>
              <source src="${item.file}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          `;
        } else if (item.type === "document") {
          content = `
            <a href="${item.file}" target="_blank" download>⬇ Download Document</a>
          `;
        }
        return `
          <div class="wd-entry">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            ${content}
          </div>
        `;
      }).join("");
    })
    .catch(err => {
      worldDataDiv.innerHTML = "<div style='color:red'>Fehler beim Laden der Weltdaten.</div>";
    });
});
// ...dein bisheriges JS...

// --- Worlddata Bereich ---
document.addEventListener("DOMContentLoaded", () => {
  const worldDataDiv = document.getElementById("worlddata-list");
  if (!worldDataDiv) return;

  fetch("json/worlddata.json")
    .then(res => res.json())
    .then(dataArr => {
      worldDataDiv.innerHTML = dataArr.map(item => {
        let content = "";
        if (item.type === "image") {
          content = `<img src="${item.file}" alt="${item.title}">`;
        } else if (item.type === "video") {
          content = `
            <video controls>
              <source src="${item.file}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          `;
        } else if (item.type === "document") {
          content = `
            <a href="${item.file}" target="_blank" download>⬇ Download Document</a>
          `;
        }
        return `
          <div class="wd-entry">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            ${content}
          </div>
        `;
      }).join("");
    })
    .catch(err => {
      worldDataDiv.innerHTML = "<div style='color:red'>Fehler beim Laden der Weltdaten.</div>";
    });
});
