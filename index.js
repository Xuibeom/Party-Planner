let partyList = [];

const addParty = (party) => {
  partyList.push(party);
  console.log(partyList);
};

const getList = async () => {
  const url =
    "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-FTB-ET-WEB-FT/events";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data");
  }
  console.log("This is the Data");
  console.log(getList());
};

const render = async () => {
  let data = await getList();
  const list = document.querySelector();
  const ListElements = data.map((data) => {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
  });
};

const addInputParty = () => {};

const init = () => {
  const submitButton = document.getElementById("");
};

document.addEventListener("DOMContentLoaded", init);
