document.addEventListener("DOMContentLoaded", function () {
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Perseverance" }
  ];

  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const categoryFilter = document.createElement("select");
  categoryFilter.id = "categoryFilter";
  categoryFilter.addEventListener("change", filterQuotes);
  document.body.insertBefore(categoryFilter, quoteDisplay);

  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    syncWithServer();
  }

  function showRandomQuote() {
    const filteredQuotes = getFilteredQuotes();
    if (filteredQuotes.length === 0) {
      quoteDisplay.innerHTML = "No quotes available. Add some!";
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const selectedQuote = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `${selectedQuote.text} - (${selectedQuote.category})`;
    sessionStorage.setItem("lastQuote", JSON.stringify(selectedQuote));
  }

  function getFilteredQuotes() {
    const selectedCategory = localStorage.getItem("selectedCategory") || "all";
    if (selectedCategory === "all") {
      return quotes;
    }
    return quotes.filter(q => q.category === selectedCategory);
  }

  function populateCategories() {
    categoryFilter.innerHTML = "";
    const categories = ["all", ...new Set(quotes.map(q => q.category))];
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
    categoryFilter.value = localStorage.getItem("selectedCategory") || "all";
  }

  function filterQuotes() {
    localStorage.setItem("selectedCategory", categoryFilter.value);
    showRandomQuote();
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
    saveQuotes();
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added successfully!");
  }

 async function fetchQuotesFromServer() {
    let result = await fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(serverQuotes => {
        const serverData = serverQuotes.map(q => ({ text: q.title, category: "General" }));
        quotes = [...quotes, ...serverData];
        saveQuotes();
      })
      .catch(error => console.error("Error syncing with server:", error));
  }

  createAddQuoteForm();
  populateCategories();
  filterQuotes();
  fetchQuotesFromServer();
  const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
  if (lastQuote) {
    quoteDisplay.textContent = `${lastQuote.text} - (${lastQuote.category})`;
  } else {
    showRandomQuote();
  }

  setInterval(fetchQuotesFromServer, 30000);
});
