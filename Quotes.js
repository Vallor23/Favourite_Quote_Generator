//Get reference to DOM elements
const container = document.querySelector('.container');
const quoteInput =document.getElementById('quote');
const authorInput =document.getElementById('author');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const quoteList = document.getElementById('quoteList');
//Add eventListener to the add button that adds quote when clicked
addQuoteBtn.addEventListener('click', addQuote);

    //Function to add a quote
    function addQuote() {
        //Retrieve the inputvalues for the quote and author
        const quote = quoteInput.value.trim();
        const author = authorInput.value.trim();

        //Check if the quote and author fiedls are filled out
        if(quote && author) {
            //// Create a JavaScript object to represent the quote
            const quoteObj = {
                text: quote,
                author: author
            };

            //Convert the JavaScript object to a JSON string
            const quoteJSON = JSON.stringify(quoteObj);

            //Retrieve existing quotes from local storage
            let quotes = JSON.parse(localStorage.getItem('quotes')) || [];

            //Add the new quote to the array
            quotes.push(quoteJSON);

            //Store the JSON string in local storage with a unique key
            localStorage.setItem("quotes", JSON.stringify(quotes));

            //Clear the input fields
            quoteInput.value = '';
            authorInput.value = '';

            //update the displayed list of quotes after adding a quote
            displayQuotes();
        } else {
            alert('Please fill out both fields')
        }
    }
    //function to display stored quotes
    function displayQuotes(){
        let quotes =  JSON.parse(localStorage.getItem('quotes'));
        
        //Clear the current list of quotes
        quoteList.innerHTML = '';

        //Iterate through all items in local storage and display each quote
        quotes.forEach(quoteJSON => {
            const quote = JSON.parse(quoteJSON);
            //Create a new div element to display the quote
            const quoteItem = document.createElement('li');
            quoteItem.classList.add('quote-item');
            quoteItem.innerHTML = `"${quote.text}" - ${quote.author}`;
            // Append the new quote item to the quote list
            quoteList.appendChild(quoteItem);

            //Implement the function for removing quotes
            const removeBtn = document.createElement('div')
            removeBtn.innerHTML = `<button class="remove-btn"onclick="removeQuote(quote)">Remove</button>`;
            quoteItem.appendChild(removeBtn)
        });
    }
        
    //Function to remove a quote
    function removeQuote(index) {
        //Retrieve the quotes array from the local storage and parse quotes
        let quotes = JSON.parse(localStorage.getItem('quotes'))  || [];
        //Remove the quote at the specified index
        quotes.splice(index, 1);
        //Save the updated array back to the local storage
        localStorage.setItem('quotes', JSON.stringify(quotes));
        //Update the displayed list of quotes
        displayQuotes();
    }

    // Display the quotes when the page loads
    displayQuotes();