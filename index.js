
const API_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-CPU-RM-WEB-PT/events'

const state = {
    parties: []
}

const partiesList = document.querySelector('#parties')
const addPartyForm = document.querySelector('#addParty')
addPartyForm.addEventListener("submit", addParty)


async function getParties() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.parties = json.data;
        // console.log(state)
    } catch(err){
        console.log(err)
    }
}
getParties();


function renderParties() {
    if(!state.parties.length) {
        partiesList.innerHTML = `<li>No Parties found.</li>`;
        return;
    }
    const partyCards = state.parties.map((party) => {
        const partyCard = document.createElement("li");
        partyCard.classList.add("party");

        partyCard.innerHTML = `
        <h2>${party.name}</h2>
        <p>${party.description}</p>
        <p>${party.date}</p>
        <p>${party.location}</p>`;

        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete Party";
        partyCard.append(deleteButton);
        deleteButton.addEventListener("click", () => deleteParty(party.id));

        return partyCard;
    });
    partiesList.replaceChildren(...partyCards)
}

async function render() {
    await getParties();
    renderParties();
}
render();


function addParty() {
    event.preventDefault();
// TODO
}