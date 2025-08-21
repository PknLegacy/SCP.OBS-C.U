// Page Navigation
document.querySelectorAll('.navbar li').forEach(item => {
    item.addEventListener('click', () => {
        let page = item.getAttribute('data-page');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');
    });
});

// Loader
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
// Back Button
function goBack() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('about').classList.add('active');
}

});
