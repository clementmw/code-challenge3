let items = [];

document.addEventListener("DOMContentLoaded", async function() {
    const response = await getItems();
    items = [...response];
    displayItems(items);
});

// Function to fetch items from the server
async function getItems() {
    const response = await fetch("http://localhost:3000/items");
    const data = await response.json();
    return data;
}

function displayItems(items) {
    const itemContainer = document.querySelector("#items");
    itemContainer.innerHTML = "";
    for (item of items) {
        // Create HTML elements for each item and append them to the itemContainer
        itemContainer.innerHTML += `
        <div class="ml-1 my-2 col-4">
            <div class="card" style="width: 18rem;">
                <img src="${item.poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">RUNTIME: ${item.runtime} minutes</li>
                    <li class="list-group-item">CAPACITY: ${item.capacity}</li>
                    <li class="list-group-item">SHOWTIME: ${item.showtime}</li>
                    <li class="list-group-item">TICKETS SOLD: ${item.tickets_sold}</li>
                    <div class="buyTicketBtn">
                        <!-- Each button has a unique ID based on item's ID -->
                        <button class="btn btn-outline-secondary buyTicketBtn" data-item-id="${item.id}">Buy Ticket (${item.tickets_sold} left)</button>
                    </div>
                </ul>
            </div>
        </div>
        `;

        // Add event listener for each button
        const buyTicketBtn = document.querySelector(`[data-item-id="${item.id}"]`);
        buyTicketBtn.addEventListener("click", function() {
            // Call the tickets function with the corresponding item data when the button is clicked
            tickets(item);
        });
    }
}

// Function to handle ticket purchasing logic
function tickets(item) {
    // Check if there are available tickets for the selected item
    if (item.tickets_sold > 45) {
        // Reduce available tickets by 1
        item.tickets_sold--;
        // Update the button text to show the number of tickets left
        document.querySelector(`[data-item-id="${item.id}"]`).innerText = `Buy Ticket (${item.tickets_sold} left)`;
        // You can also save the updated data back to your server/database here if needed
    } else {
        // Alert the user if tickets are sold out
        alert("Sorry, tickets are sold out!");
    }
}
