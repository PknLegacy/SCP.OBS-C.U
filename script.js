document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".navbar li");
    const loader = document.getElementById("loader");
    const scpList = document.getElementById("scp-list");

    fetch("data.json")
        .then(res => res.json())
        .then(data => {
            data.forEach(scp => {
                const li = document.createElement("li");
                li.textContent = `${scp.id} - ${scp.name}`;
                scpList.appendChild(li);
            });
        });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            loader.style.display = "flex";
            setTimeout(() => {
                loader.style.display = "none";
                pages.forEach(page => page.classList.remove("active"));
                document.getElementById(item.dataset.page).classList.add("active");
            }, 2000);
        });
    });

    setTimeout(() => loader.style.display = "none", 2000);
});
