document.addEventListener("DOMContentLoaded", () => {


    const searchInput = document.getElementById('search-input');
    const table = document.getElementById('table');
    const addForm = document.forms[0];
  
    // Search functionality
    searchInput.addEventListener('input', () => {
      const searchValue = searchInput.value.toLowerCase();
      const rows = table.getElementsByTagName('tr');
      for (let i = 1; i < rows.length; i++) {
        const term = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
        if (term.includes(searchValue)) {
          rows[i].style.display = '';
        } else {
          rows[i].style.display = 'none';
        }
      }
    });
  
    // Add term functionality
    addForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const term = addForm.elements['term'].value;
      const dariMeaning = addForm.elements['dari-meaning'].value;
      const pashtoMeaning = addForm.elements['pashto-meaning'].value;
      const row = table.insertRow(-1);
      const termCell = row.insertCell(0);
      const dariCell = row.insertCell(1);
      const pashtoCell = row.insertCell(2);
      termCell.textContent = term;
      dariCell.textContent = dariMeaning;
      pashtoCell.textContent = pashtoMeaning;
      addForm.reset();
  
      // Store new term in localStorage
      
      terms.push({term: term, dariMeaning: dariMeaning, pashtoMeaning: pashtoMeaning});
  //      [{
  //       term: term,
  //       dariMeaning: dariMeaning,
  //       pashtoMeaning: pashtoMeaning
  //       }, {} , {} , {} . . . . . ]
      localStorage.setItem('terms', JSON.stringify(terms));
    });
  
    // Delete term functionality
    table.addEventListener('dblclick', (event) => {
      if (event.target.tagName === 'TD') {
        const row = event.target.parentNode;
        const term = row.getElementsByTagName('td')[0].textContent;
        if (confirm(`Are you sure you want to delete the term "${term}"?`)) {
          row.remove();
          
  
          // Remove term from localStorage
          const terms = JSON.parse(localStorage.getItem('terms')) || [];
          const updatedTerms = terms.filter((t) => t.term !== term);
          localStorage.setItem('terms', JSON.stringify(updatedTerms));
        }
      }
    });
  
    // Load terms from localStorage
    const terms = JSON.parse(localStorage.getItem('terms')) || [];
    terms.forEach((t) => {
      const row = table.insertRow(-1);
      const termCell = row.insertCell(0);
      const dariCell = row.insertCell(1);
      const pashtoCell = row.insertCell(2);
      termCell.textContent = t.term;
      dariCell.textContent = t.dariMeaning;
      pashtoCell.textContent = t.pashtoMeaning;
    });
  });
  