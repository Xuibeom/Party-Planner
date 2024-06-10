// Holds the list from the API and is what we put on the page
let state = {
  parties: [],
};

const getList = async () => {
  // Gets the list from the API and then sets it to state.parties above
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events"
    );
    const APIdata = await response.json();
    state.parties = APIdata.data;

    console.log("This is state.parties");
    console.log(state.parties);
    return state.parties;
  } catch (error) {
    console.error("Error fetching data");
  }
};
console.log(getList());

const render = async () => {
  const parties = await getList();
  // We have to stringify the parties or our function will not know how to read the JSON data
  if (parties) {
    let ul = document.getElementById("ul");
    partyStrings = JSON.stringify(state.parties);
    console.log("This is state.parties STRINGIFIED");
    console.log(partyStrings);

    // Empties the list before repopulating
    ul.innerHTML = "";

    parties.forEach((party) => {
      let li = document.createElement("li");
      li.textContent = `${party.name}, ${party.date}, ${party.location}, ${party.description}`;

      // Formats the listing and adds a delete button
      li.innerHTML = `
      <div class="party-listing">
        <h5>${party.name}</h5>
        <p>Date: ${party.date}, Time: ${party.time}</p>
        <p>Location: ${party.location}</p>
        <p>Description: ${party.description}</p>
      </div>
      <button class="btn btn-danger btn-sm" id="${party.id}">Delete</button>`;
      ul.appendChild(li);

      // Event listener for the delete function
      let deleteButton = document.getElementById(party.id);
      deleteButton.addEventListener("click", deleteParty);
    });
  } else {
    return console.log("Error, parties not found");
  }
};

const addParty = async (event) => {
  event.preventDefault();

  const partyFormData = new FormData(document.getElementById("PartyForm"));

  const partyName = partyFormData.get("NameInput");
  const partyDate = partyFormData.get("DateInput");
  const partyTime = partyFormData.get("TimeInput");
  const partyLocation = partyFormData.get("LocationInput");
  const partyDescription = partyFormData.get("DescriptionInput");

  // Removed time because it did not work with the API format (Aaron said it was okay when our group asked)
  const newParty = {
    name: partyName,
    date: "2024-10-10T14:00:00.000Z",
    location: partyLocation,
    description: partyDescription,
  };

  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParty),
      }
    );
    console.log(response);
    render();
  } catch (error) {
    console.error("Error adding party");
  }
};

const deleteParty = async (event) => {
  event.preventDefault();

  // Takes the id of the party from delete button event listener, searches the API using said ID, uses the DELETE method to remove it.
  let partyID = event.target.id;
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events/${partyID}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);

    // Checks if the response went through and removes the child element, li from ul.
    if (response.ok) {
      console.log(`Party with ID ${partyID} deleted`);

      let ul = document.getElementById("ul");
      let li = event.target.parentNode; // Sets the li as the parent of the delete button (event.target), which is the whole party listing
      ul.removeChild(li);
    } else {
      throw new Error("Failed to delete party");
    }
  } catch (error) {
    console.error("Error deleting party");
  }
};

const initialize = () => {
  const submitButton = document.getElementById("SubmitButton");
  submitButton.addEventListener("click", addParty);

  render();
};

initialize();
