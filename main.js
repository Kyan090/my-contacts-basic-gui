// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variables 
let contacts = getContact();

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let outPutStr = '';
  for (let i = 0; i < contacts.length; i++) {
    outPutStr += getContactHTMLStr(contacts[i], i);
  }
  outputEl.innerHTML = outPutStr;
  saveContacts()
}


function addContact() {
  let name = prompt('Enter Contact Name...')
  let email = prompt('Enter Contact Email...')
  let phone = prompt('Enter Contact Phone...')
  let country = prompt('Enter Country...')
  let info = [name, email, phone, country];
  contacts.push(newContact(info));
  outputEl.innerHTML = `New Contact Add: (${name})`;
  saveContacts()
}

function removeContact() {
  let contactIndex = +prompt('Please enter the index number of contact to remove:');
  contacts.splice(contactIndex, 1);
  saveContacts();
  outputEl.innerHTML = `Successfully removed contact #${contactIndex}.`
}

function displayByName() {
  let nameInput = prompt('Enter Name...');
  let outPutNameStr = '';
  for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].description[0].includes(nameInput)) {
        outPutNameStr += getContactHTMLStr(contacts[i], i)
      } 
    }
    outputEl.innerHTML = outPutNameStr;
  }


function displayByCountry() {
  let countryInput = prompt('Enter The Country The Contact Is From...');
  let outPutCountryStr = '';
  for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].description[3].includes(countryInput)) {
        outPutCountryStr += getContactHTMLStr(contacts[i], i)
      } 
    }
    outputEl.innerHTML = outPutCountryStr;
}



// helper Functions

// save contact in local storage 
function saveContacts() {
  localStorage.setItem('contactInfo', JSON.stringify(contacts));
}

// Get Item from Local Storage 
function getContact() {
  let jsonContacts = localStorage.getItem('contactInfo');
  return JSON.parse(jsonContacts) ?? [];
}

// create a new contact
function newContact(contactDescription) {
  return {
    description: contactDescription,
  };
}

// get HTML for given cotact 
function getContactHTMLStr(contact, i) {
  return `
    <div>
      ${i}: ${contact.description} \
    </div>`
}