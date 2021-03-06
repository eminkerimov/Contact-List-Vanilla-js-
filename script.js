const addBtn = document.getElementById("add-btn");
const submitNewBtn = document.getElementById("submit-new-btn");
const submitEditBtn = document.getElementById("submit-edit-btn");
const cancelNewBtn = document.getElementById("cancel-new-btn");
const cancelEditBtn = document.getElementById("cancel-edit-btn");
const tableBody = document.querySelector(".table-body");
const editPersonNameInput = document.getElementById("editPersonName");
const editPersonPhoneInput = document.getElementById("editPersonPhone");
const editPersonAddressInput = document.getElementById("editPersonAddress");


let contactList = [];
let newArray = [];

function getInputValue(el) {
  return document.getElementById(el).value.trim();
}

function clearInputValue(el) {
  return (document.getElementById(el).value = "" );
}

function saveFilesToBrowser() {
  localStorage.setItem("contactList", JSON.stringify(contactList));
}

//   Creating contact
function createContactItem() {
  let name = getInputValue("newPersonName");
  let number = getInputValue("newPersonPhone");
  let address = getInputValue("newPersonAddress");
  return contactList.push({
    id: contactList.length + 1,
    name,
    number,
    address,
    createDate: new Date(),
    editDate: "",
  });
}

function addToList() {
    for (let i = 0; i < contactList.length; i++) {
      const newRecordDiv = document.createElement("div");
      newRecordDiv.classList.add("table-row");
      newRecordDiv.innerHTML = `
          <div class="table-col contact-id">${contactList[i].id}</div>
          <div class="table-col contact-name">${contactList[i].name}</div>
          <div class="table-col contact-number">${contactList[i].number}</div>
          <div class="table-col contact-address">${contactList[i].address}</div>
          <div class="table-col contact-create">${contactList[i].createDate}</div>
          <div class="table-col contact-edit">${contactList[i].editDate}</div>
          <div class="table-col edit-btn"   onClick="editFunction(this)" data-id="${contactList[i].id}" id="edit-btn">
            <i class="fas fa-user-edit"></i>
          </div>
          <div class="table-col delete-btn" onClick="deleteFunction(this)" delete-id="${[i]}" id="delete-btn">
            <i class="fas fa-trash-alt"></i>
          </div>
                `;
      tableBody.appendChild(newRecordDiv);
    }
}

function stringToJson() {
  let data = localStorage.getItem("contactList");
  contactList = JSON.parse(data) ? JSON.parse(data) : [];
  addToList();
}

stringToJson();

//     Submit button (New contact)
submitNewBtn.addEventListener("click", () => {
  let nameValue = getInputValue("newPersonName");
  let phoneValue = getInputValue("newPersonPhone");
  let addressValue = getInputValue("newPersonAddress");

  if(nameValue!=="" && phoneValue!=="" && addressValue!==""){
    tableBody.innerHTML = "";
    addToList(createContactItem());
    saveFilesToBrowser();
    enableDisableUserModal("disable", "newPersonModal");}
  else {
    document.getElementById("newPersonName").style.backgroundColor="red";
    document.getElementById("newPersonPhone").style.backgroundColor="red";
    document.getElementById("newPersonAddress").style.backgroundColor="red";
  }
});
   
//          Edit Button

function editFunction(data) {
  let id = data.getAttribute("data-id");
  let editData = contactList.filter((item) => {
    return item.id == id;
  });
  enableDisableUserModal("enable", "editPersonModal");
  newArray.push(editData[0]);
  editPersonNameInput.value = editData[0].name;
  editPersonPhoneInput.value = editData[0].number;
  editPersonAddressInput.value = editData[0].address;
}

submitEditBtn.addEventListener("click", function () {
  if(editPersonNameInput.value!=="" && editPersonPhoneInput.value!=="" && editPersonAddressInput.value!=="") {
    let newData = {
      id: newArray[0].id,
      name: editPersonNameInput.value,
      number: editPersonPhoneInput.value,
      address: editPersonAddressInput.value,
      createDate: newArray[0].createDate,
      editDate: new Date(),
    };

    //   Rewriting contact in Array
    contactList.splice(newArray[0].id - 1, 1, newData);
    saveFilesToBrowser();
    window.location.reload();
    }
    else {
      editPersonNameInput.style.backgroundColor="red";
      editPersonPhoneInput.style.backgroundColor="red";
      editPersonAddressInput.style.backgroundColor="red";
    }
  });

//           Delete Button

function deleteFunction(el) {
  let id = el.getAttribute("delete-id");
  contactList.splice(parseInt(id), 1);
  saveFilesToBrowser();
  window.location.reload();
}

//          Modal enable/disable 

let enableDisableUserModal = (option, id) => {
  let newPersonModal = document.getElementById(id);
  let layout = document.getElementById("layout");

  newPersonModal.className = `${option}-modal`;
  layout.className = `${option}-modal`;
};

addBtn.addEventListener("click", () => {
  enableDisableUserModal("enable", "newPersonModal");
  clearInputValue("newPersonName");
  clearInputValue("newPersonPhone");
  clearInputValue("newPersonAddress");
});

cancelNewBtn.addEventListener("click", () => {
  enableDisableUserModal("disable", "newPersonModal");
});

cancelEditBtn.addEventListener("click", () => {
  enableDisableUserModal("disable", "editPersonModal");
});

