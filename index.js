const state = {
  parties: [],
};

const getList = async () => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events"
    );
    const data = await response.json();
    state.parties = data.data;

    // It is fine that it prints twice in the local server, logs the data directly from the API
    console.log("This is the basic data directly from the API");
    console.log(data);

    console.log("This is state's object array");
    console.log(state);

    return state.parties;
  } catch (error) {
    console.error("Error fetching data");
  }
};

const render = async () => {
  let data = await getList();
  console.log("This is the data");
  console.log(data);
  const list = document.querySelector("ul");

  // Logs the stringified party list
  console.log("Stringified Party List");
  data.forEach((party) =>
    console.log(`This is a party ${JSON.stringify(party)}`)
  );

  const ul = document.getElementById("ul");
  let listElement = data.forEach((party) => {
    const li = document.createElement("li");
    state.textContent = JSON.stringify(party);
    li.textContent = `${name}, ${date}, ${time}, ${location}, ${description}`;
    ul.appendChild(li);
  });
};

const addParty = async (event) => {
  event.preventDefault();

  const partyName = document.getElementById("NameInput");
  const partyDate = document.getElementById("DateInput");
  const partyTime = document.getElementById("TimeInput");
  const partyLocation = document.getElementById("LocationInput");
  const partyDescription = document.getElementById("DescriptionInput");

  //We were told to not worry about the time because it was not working
  const newParty = {
    name: partyName,
    date: "1-31-2001",
    time: "12:00",
    location: partyLocation,
    description: partyDescription,
  };

  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newParty), //converts newParty to a JSON string
      }
    );
    const data = await response.json();
    console.log("This is the Data");
    return data;
  } catch (error) {
    console.error("Error fetching data");
  }
};

// const deleteParty = async () => {
//   try {
//     const response = await fetch(
//       "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events"
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data");
//   }
//   console.log("This is the Data");
//   console.log(getList());
// };

const init = () => {
  getList();
  render();
  addParty();

  const submitButton = document.getElementById("SubmitButton");
  submitButton.addEventListener("click", addInputParty);
  console.log("Hello");
};

init();
document.addEventListener("DOMContentLoaded", init);
