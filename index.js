const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

// listContacts().then((result) => console.table(result));
// getContactById(3).then((user) => console.log("user", user));

// removeContact(3);
// addContact("Kennedy Lane", "mattis.Cras@nonenimMauris.net", "(542) 451-7038");
//   {
//     "id": 3,
//     "name": "Kennedy Lane",
//     "email": "mattis.Cras@nonenimMauris.net",
//     "phone": "(542) 451-7038"
//   },
//   {
//     "id": 4,
//     "name": "Wylie Pope",
//     "email": "est@utquamvel.net",
//     "phone": "(692) 802-2949"
//   },

const argv = require("yargs").argv;

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then((result) => console.table(result));

      break;

    case "get":
      getContactById(id).then((user) => console.log("user", user));
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
