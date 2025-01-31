const baseUrl = "https://rickandmortyapi.com/api/location"

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
        <h6 class="card-text">${cardData.type}</h6>
        <p class="card-text">${cardData.dimension}</p>
         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="${cardData.id}">Details</button>
         </div>
      </div>
    </div>
        `
    });
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
   const locName = document.querySelector('.loc-name').value 
   currentPage = 1
   getCharacters(1, '', locName)
   
})


const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
   exampleModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget
      const modalTitle = exampleModal.querySelector('.modal-title')
      const id = button.getAttribute('data-bs-whatever')
      const modalBody = document.querySelector('.modal-body')

      
      fetch(`${baseUrl}/${id}`)
         .then(response => response.json())
         .then(data => {
            console.log(data);
            modalBody.innerHTML = ``
            modalBody.innerHTML = `
             <div class="boxImg">
               <img src="${data.image}" alt="">
            </div>

        <div class="boxInfo">
          <p>Name: ${data.name}</p>
          <p>Type: ${data.type}</p>
          <p>Dimension: ${data.gender}</p>

          <p></p>
        </div>
            `

            modalTitle.textContent = `Info about ${data.name}`
         })


      

   })
}


