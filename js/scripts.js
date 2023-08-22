// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// User Interface Logic ---------
let epicodusRoster = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key){
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event){
  // grab id of list item clicked by user
  // search for contact using id
  const contactToDisplay = epicodusRoster.findContact(event.target.id);
  // after finding contact, display each property to html
  const contactFirstName = contactToDisplay.firstName;
  const contactLastName = contactToDisplay.lastName;
  const contactPhoneNumber = contactToDisplay.phoneNumber;
  document.querySelector(".first-name").innerText = contactFirstName;
  document.querySelector(".last-name").innerText = contactLastName;
  document.querySelector(".phone-number").innerText = contactPhoneNumber;

  document.querySelector("button.delete").setAttribute("id", event.target.id);

  document.getElementById("contact-details").removeAttribute("class");
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  let studentOne = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  epicodusRoster.addContact(studentOne);
  console.log(epicodusRoster.contacts);
  listContacts(epicodusRoster);

  document.getElementById("new-first-name").value = null;
  document.getElementById("new-last-name").value = null;
  document.getElementById("new-phone-number").value = null;
}

function handleDelete(event) {
  // delete contact from addressbook
  epicodusRoster.deleteContact(event.target.id);
  // remove displayed contact information
  // hide delete button
  document.getElementById("contact-details").setAttribute("class","hidden");
  // reset displayed contacts to remove deleted contact
  listContacts(epicodusRoster);
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});