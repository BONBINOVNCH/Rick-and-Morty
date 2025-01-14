const baseUrl = "https://rickandmortyapi.com/api/character"

const container = document.querySelector('.cardsBox')

function getCharacters(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderCards(data.results)
            renderPagination(data.info)
        })
}

getCharacters(baseUrl)

function renderCards(data) {
    container.innerHTML = ''
    data.forEach(cardData => {
        container.innerHTML += `
         <div class="card" style="width: 18rem;">
      <img src="${cardData.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${cardData.name}</h5>
        <p class="card-text">${cardData.species}</p>
        <a href="#" class="btn btn-primary">Details</a>
      </div>
    </div>
        `
    });
}

function renderPagination(info) {
    const paginationBox = document.querySelector(".paginationBox")

    paginationBox.innerHTML = `
    <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">4</a></li>
    <li class="page-item"><a class="page-link" href="#">5</a></li>
    <li class="page-item"><a class="page-link" href="#">6</a></li>
    <li class="page-item"><a class="page-link" href="#">7</a></li>


    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`

const paginationBlock = document.querySelector(".pagination")

console.log(paginationBlock)

paginationBlock.addEventListener("click", (event) => {
  if(event.target.closest("li")) {
    console.log(event.target)
    pagination(event.target)
  }
})

}

function pagination(li) {
  let liUrl = `https://rickandmortyapi.com/api/character?page=${li.innerHTML}`

  getCharacters(liUrl)
}
