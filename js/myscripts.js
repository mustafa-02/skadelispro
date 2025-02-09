const url = "https://script.google.com/macros/s/AKfycbyxqGGQmdkALun_lyMgeiSserVKHQ03pcsN6F05wubvzqtuU3flkevNn0Nz_iX87MRi/exec";
async function fetchCards() {
  let cachedData = localStorage.getItem("cardsData");
  if (cachedData) {
    renderCards(JSON.parse(cachedData));
    return;
  }
  try {
    let response = await fetch(url);
    let data = await response.json();
    localStorage.setItem("cardsData", JSON.stringify(data));
    console.log(data);

    renderCards(data);

  } catch (error) {
    console.error("Error Fetching data: ", error);
  }
}

function renderCards(data) {
  let container = document.getElementById("cardContainer");
  container.innerHTML = "";

  data.forEach(item => {
    let card = document.createElement("div");
    card.className = "col";
    card.innerHTML = `
          <div class="portfolio-item" onclick="openModal('${item.title}','${item.description}', 'xiDKVStudent/${item.folder}/assets/img/${item.image}', 'xiDKVStudent/${item.folder}/index.html')">
            <a class="portfolio-link" data-bs-toggle="modal" href="#cardModal" >
              <div class="portfolio-hover">
                <div class="portfolio-hover-content"><i class="fas fa-plus fa-3x"></i></div>
              </div>
              <img src="xiDKVStudent/${item.folder}/assets/img/${item.image}" style="width: 100%;" alt="sampul" onerror="this.onerror=null; this.src='assets/img/sampul.JPG';">
            </a>
            <div class="portfolio-caption">
              <div class="portfolio-caption-heading">${item.title}</div>
              <div class="portfolio-caption-subheading text-muted">${item.description}</div>
              <a class="portfolio-caption-subheading text-muted text-decoration-none" href="xiDKVStudent/${item.folder}/index.html">Klik untuk melihat</a>
            </div>
          </div>
      `;
    container.appendChild(card);
  });
}

function openModal(title, description, image, link) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDescription").innerText = description;
  let imgElement = document.getElementById("modalImage");
  imgElement.src = image
  imgElement.onerror=function() {
    imgElement.src = "assets/img/sampul.JPG"
  }
  document.getElementById("modalIframe").src = link;
}

window.onload = fetchCards;

window.addEventListener("beforeunload", () => {
  setTimeout(() => {
    localStorage.removeItem("cardsData");
  }, 10000);
});