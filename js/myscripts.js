const url = "https://script.google.com/macros/s/AKfycbyxqGGQmdkALun_lyMgeiSserVKHQ03pcsN6F05wubvzqtuU3flkevNn0Nz_iX87MRi/exec";
async function fetchCards() {
  let cachedData = localStorage.getItem("cardsData");
  if(cachedData) {
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
          <div class="card">
            <img src="xiDKVStudent/${item.folder}/assets/img/${item.image}" alt="sampul" class="card-img-top" onerror="this.onerror=null; this.src='assets/img/sampul.JPG';">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.description}</p>
              <a href="xiDKVStudent/${item.folder}/index.html" class="btn btn-primary">Buka</a>
            </div>
          </div>
      `;
      container.appendChild(card);
    });
}

window.onload = fetchCards;

window.addEventListener("beforeunload", ()=> {
  setTimeout(() => {
    localStorage.removeItem("cardsData");
  }, 10000);
});