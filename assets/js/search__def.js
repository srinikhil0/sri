function searchCards() {
    // Get the search query from the input field
    var query = document.getElementById('searchInput').value.toLowerCase();
  
    // Get all the cards
    var cards = document.getElementsByClassName('chapter__content');
  
    // Loop through each card and check if it matches the search query
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var title = card.getElementsByClassName('chapter__title')[0].innerText.toLowerCase();
      var description = card.getElementsByClassName('def__description')[0].innerText.toLowerCase();
  
      if (title.includes(query) || description.includes(query)) {
        // Show the card if it matches the search query
        card.style.display = 'block';
      } else {
        // Hide the card if it doesn't match the search query
        card.style.display = 'none';
      }
    }
  }
  
  // Get the search input element
  var searchInput = document.getElementById('searchInput');
  
  // Add an input event listener to the search input
  searchInput.addEventListener('input', searchCards);
  