let watchlist = JSON.parse(localStorage.getItem("watchlist"))

const tbody = document.querySelector(".tbody")

console.log(watchlist)

function renderTable() {
    tbody.innerHTML =``
    for (let i = 0; i < watchlist.length; i++) {
        console.log(watchlist[i])
        
        tbody.innerHTML += `
               <tr>
             <th scope="row">${i + 1}</th>
             <td>${watchlist[i].name}</td>
             <td>${watchlist[i].episode}</td>
             <td>${watchlist[i].addDate}</td>
             <td><input class="form-check-input d-flex m-auto inputWatched" data-id="${i}" type="checkbox" name="watched" id="inputWatched" ${watchlist[i].watched ? 'checked' : ''}></td>
             <td><button type="button" class="btn btn-danger btnDelete" data-id="${i}">Delete</td>
           </tr>
    `
}
    deleteBtn()
    inputWatched()
}
renderTable()

function deleteBtn() {
    const btnDelete = document.querySelectorAll(".btnDelete")
    btnDelete.forEach(btn => {
        btn.addEventListener("click", () => {
            watchlist.splice(btn.getAttribute("data-id"), 1)
            localStorage.setItem("watchlist", JSON.stringify(watchlist))
            renderTable()
        })
    });
}

function inputWatched() {
    const inputWatchedCheck = document.querySelectorAll(".inputWatched")
    inputWatchedCheck.forEach(input => {
        input.addEventListener("click", () => {
        let id = input.getAttribute('data-id')
        
        if (watchlist[id].watched === false) {
            watchlist[id].watched = true
        } else {
            watchlist[id].watched = false
        }
        localStorage.setItem("watchlist", JSON.stringify(watchlist))
    })
    
    })
}