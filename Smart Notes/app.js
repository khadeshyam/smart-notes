//if user adds a note, add it to the local storage
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener("click", function(e) {
  let addTxt = document.getElementById('addTxt');
  let addTitle = document.getElementById('addTitle');
  if(!addTxt.value ||!addTitle.value){
     return alert('Title or Note Cant be empty');
  }
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  let myObj={
    title:addTitle.value,
    text:addTxt.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTxt.value = "";
  addTitle.value = "";
  showNotes();
  
})

//function to show elements from local storage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
   }

  let html = "";
  notesObj.forEach(function(element, index) {
    html += `<div class="notecard my-2 mx-2 card" >
      <div class="card-body">
        <h5 class="card-title text-center">${element.title}</h5>
        <p class="card-text">${element.text}</p>
        <div class="d-flex flex-row-reverse">
           <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger p-2">Delete Note</button>
        </div>
        </div>
     </div>`;
  });

  let notesElm = document.getElementById('notes');
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  }
  else {
    notesElm.innerHTML = ``;
  }
}

//after reload
showNotes();

//function to delete note

function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();

}


let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {
  let inputVal = search.value.toLowerCase();
  let notecards = document.getElementsByClassName('notecard');//=>Returns HTML collection
  let notesArray = Array.from(notecards)//=>convert HTML collection to an Array

  notesArray.forEach(function(element) {
    let noteTitle = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
    let noteText = element.getElementsByTagName('p')[0].innerText.toLowerCase();

    if (noteText.includes(inputVal) ||noteTitle.includes(inputVal) ) {
      element.style.display = "block"
    }
    else {
      element.style.display = "none"
    }

  })
})
