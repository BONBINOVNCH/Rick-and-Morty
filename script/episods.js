

const baseUrl = "https://rickandmortyapi.com/api/episode"

const container = document.querySelector('.cardsBox')

function getCharacters(page, gender, name) {
   fetch(`${baseUrl}/?page=${page}&name=${name}`)
      .then(response => response.json())
      .then(data => {
         renderCards(data.results);
         renderPagination(data.info);
      });

}

getCharacters(1, '', '');


function renderCards(data) {
    container.innerHTML = ''
    data.forEach(cardData => {
        container.innerHTML += `
         <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${cardData.name}</h5>
        <h6 class="card-text">${cardData.episode}</h6>
        <p class="card-text">${cardData.air_date}</p>
        <button type="button" class="btn btn-primary btnAdd" id="" data-name="${cardData.name}" data-episode="${cardData.episode}">Add</button>
      </div>
    </div>
        `
    });

    addToWatchList() 

}



let currentPage = 1;
function renderPagination(info){
   
   const paginationBox = document.querySelector('.pagination');
   paginationBox.innerHTML = '';
   paginationBox.innerHTML += `
      <li class="page-item prevPage">
         <a class="page-link" href="#" aria-label="Previous">
         <span aria-hidden="true">&laquo;</span>
         </a>
      </li>
   `;
   paginationBox.innerHTML += `
      <li class="page-item"><a class="page-link" href="#">${currentPage}</a></li>
   `;

   paginationBox.innerHTML += `
      <li class="page-item nextPage">
         <a class="page-link" href="#" aria-label="Next">
         <span aria-hidden="true">&raquo;</span>
         </a>
      </li>
   `;
   const prevPage = document.querySelector('.prevPage');
   const nextPage = document.querySelector('.nextPage');

   nextPage.addEventListener('click', () => {
      currentPage++;

      console.log('next page');

      getCharacters(currentPage, '', '');
      
   })
   prevPage.addEventListener('click', () => {
      console.log('previous page');
      if(currentPage > 1){
         currentPage--;
         getCharacters(currentPage, '', '');
      }
      

   })
}

const btnFilter = document.querySelector(".btnFilter")

btnFilter.addEventListener('click', () => {
   const epiName = document.querySelector('.epi-name').value 

   currentPage = 1
   
   getCharacters(currentPage, "", epiName)
   
})

function addToWatchList() {
   const btnAdds = document.querySelectorAll(".btnAdd")
   console.log(btnAdds)
   btnAdds.forEach(btnAdd => {
      btnAdd.addEventListener("click", () => {
      const name = btnAdd.getAttribute("data-name")
      const episode = btnAdd.getAttribute("data-episode")
      console.log(name)

         let watchlist = JSON.parse(localStorage.getItem("watchlist")) || []

      const episodeObj = {
            name: name,
            episode: episode,
            watched: false,
            addDate: new Date().toISOString()
         }

      const isAlreadyAdded = watchlist.some(item => item.name === name && item.episode === episode)
      console.log(watchlist)

      console.log(isAlreadyAdded)

      if (!isAlreadyAdded) {
         watchlist.push(episodeObj);
         localStorage.setItem('watchlist', JSON.stringify(watchlist))
      }

   })
   })
   
}
  