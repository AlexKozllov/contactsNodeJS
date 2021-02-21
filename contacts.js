const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = "./db/contacts.json";

// TODO: задокументировать каждую функцию
function listContacts() {
  return fs
    .readFile(contactsPath, "utf8")
    .then((data) => JSON.parse(data))
    .then((data) =>
      data.map((item) => {
        return {
          Name: item.name,
          email: item.email,
        };
      })
    )
    .catch((err) => console.log(err.message));
}

function getContactById(contactId) {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((data) => data.find((item) => item.id === contactId))
    .catch((err) => console.log(err.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then(async (data) => {
      const newData = data.filter((item) => item.id !== contactId);
      const jsonData = JSON.stringify(newData);
      await fs.writeFile(contactsPath, jsonData);
    })
    .catch((err) => console.log(err.message));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then(async (data) => {
      let newData = [];
      if (!!name & !!email & !!phone) {
        newData = [
          ...data,
          {
            id: uuidv4(),
            name,
            email,
            phone,
          },
        ];
      }

      const jsonData = JSON.stringify(newData);
      await fs.writeFile(contactsPath, jsonData);
    })
    .catch((err) => console.log(err.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
