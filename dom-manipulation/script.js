
document.addEventListener("DOMContentLoaded", function () {
  const quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");

  function showRandomQuote() {
    if (quotes.length === 0) {
      quoteDisplay.textContent = "No quotes available. Add some!";
      return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteDisplay.textContent = `${quotes[randomIndex].text} - (${quotes[randomIndex].category})`;
  }

  newQuoteBtn.addEventListener("click", showRandomQuote);

  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    
    const quoteInput = document.createElement("input");
    quoteInput.id = "newQuoteText";
    quoteInput.type = "text";
    quoteInput.placeholder = "Enter a new quote";
    
    const categoryInput = document.createElement("input");
    categoryInput.id = "newQuoteCategory";
    categoryInput.type = "text";
    categoryInput.placeholder = "Enter quote category";
    
    const addButton = document.createElement("button");
    addButton.textContent = "Add Quote";
    addButton.addEventListener("click", addQuote);

    formContainer.appendChild(quoteInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addButton);
    
    document.body.appendChild(formContainer);
  }

  function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText === "" || quoteCategory === "") {
      alert("Please enter both a quote and a category.");
      return;
    }

    quotes.push({ text: quoteText, category: quoteCategory });
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
  }

  createAddQuoteForm();
  showRandomQuote();
});
