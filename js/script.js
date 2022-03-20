/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/**
  * Create a page with nine students data
  * @param   {Array[object]}  list - List of student object
  * @param   {int}            page - Current page
  */

const showPage = (list, page) => {
   //Calculating the start and end index based on the length of the list array
   const startIndex = (page * ItemPerPage) - ItemPerPage;
   
   let endIndex = page * ItemPerPage;

   //If current 'endIndex' is greater than the length of the list array
   //Set 'endIndex' equals to the length of the list array (prevent IOOB)
   endIndex = (endIndex > list.length) ? list.length : endIndex; 

   //Create new ul element
   const ul = document.querySelector('.student-list');
   ul.innerHTML = '';

   //Iterate through each student object which will be displayed on the current page
   for (let i = startIndex; i < endIndex; i++) {

      //Create new 'li' element and add styling
      const li = document.createElement('li');
      li.classList.add('student-item');
      li.classList.add('cf');

      //Create new 'div' element for student details section
      //add styling and append it to above 'li' element
      const divStudent = document.createElement('div');
      divStudent.classList.add('student-details');
      li.appendChild(divStudent);

      //Create new 'div' element for joined date section
      //assign value, add styling and append it to above 'li' element
      const divJoined = document.createElement('div');
      divJoined.classList.add('date');
      divJoined.textContent = `Joined ${list[i].registered.date}`;
      li.appendChild(divJoined);

      //Create new 'img' element for the student profile picture
      //assign 'src' value, add styling and append it to 'div' for student details
      const img = document.createElement('img');
      img.classList.add('avatar');
      img.src = list[i].picture.large;
      img.alt = 'Profile Picture';
      divStudent.appendChild(img);

      //Create new 'h3' element for the student full name
      //assign value and append it to 'div' for student details
      const h3 = document.createElement('h3');
      h3.textContent = `${list[i].name.first} ${list[i].name.last}`;
      divStudent.appendChild(h3);

      //Create new 'span' element for the student email
      //assign value, add styling and append it to 'div' for student details
      const span = document.createElement('span');
      span.classList.add('email');
      span.textContent = list[i].email;
      divStudent.appendChild(span);

      ul.appendChild(li);
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/**
  * Create pagination buttons dynamically according to the list provided
  * @param   {Array[object]}  list - List of student object
  */

const addPagination = list => {
   //Calculate the number of page required
   const totalPage = Math.ceil(list.length / ItemPerPage);
   
   const ul = document.querySelector('.link-list');
   ul.innerHTML = '';

   //If the provided list is empty, update the page with 'No results found' and return
   if (!list.length) {
      ul.textContent = 'No results found';
      return;
   };

   //For each button require, iterate through and create a button with corresponding text content
   for (let i = 0; i < totalPage; i++) {
      const li = document.createElement('li');

      const btn = document.createElement('button');
      btn.type = 'button';
      
      //Set the button text content to the current page it being created for
      btn.textContent = i + 1;

      li.appendChild(btn);
      ul.append(li);
   }

   //For every pagination being created, always set the active page to page 1
   ul.childNodes[InitialPage - 1].firstChild.classList.add('active');

   //Create event listeners for each pagination buttons created
   const navigationBtn = document.querySelectorAll('li button');

   navigationBtn.forEach(btn => btn.addEventListener('click', e => {
      //Get current active page
      const currentActive = document.querySelector('.active');
      
      //Check whether the current page is the previous active page or not
      //If no then remove the 'active' class from the previous active page and assign it to the current page
      //Then navigate to current page by updating the page
      if (currentActive != e.target) {
         currentActive.classList.remove('active');
         e.target.classList.add('active');
         showPage(list, e.target.textContent);
      }
   }));
}

/**
  * Create search bar
  */

const createSearchBar = () => {
   const header = document.querySelector('.header');

   //Create a new 'label' element, add styling and append it to the header
   const label = document.createElement('label');
   label.htmlFor = 'search';
   label.classList.add('student-search');
   header.appendChild(label);

   //Create a new 'span' element, add styling and append it to the label
   const span = document.createElement('span');
   span.textContent = 'Search by name';
   label.appendChild(span);

   //Create a new 'div' element for showing invalid input error
   //add 'id' and append it to the label
   const divSpan = document.createElement('div');
   divSpan.id = 'error';
   label.appendChild(divSpan);

   //Create a new 'input' element, add 'id' and styling and append it to the label
   const input = document.createElement('input');
   input.id = 'search';
   input.placeholder = 'Search by name...';
   label.appendChild(input);

   //Create a new 'button' element, add 'id' and 'type' and append it to the label
   const btn = document.createElement('button');
   btn.id = 'search-button';
   btn.type = 'button';
   label.appendChild(btn);

   //Create and attach search button image
   const img = document.createElement('img');
   img.src = 'img/icn-search.svg';
   img.alt = 'Search icon';
   btn.appendChild(img);
}

/**
  * Handle search function of the page
  * @param   {string}  target - search string
  */

const search = (target) => {
   //Pattern for checking valid search string
   //Search string can only be letter/s including whitespace
   const errorPattern = /[^a-zA-Z\s:]/;

   //Get 'div' element for the error message
   const divSpan = document.getElementById('error');

   //If the search string is empty, then show all results as normal and reset error div
   if (target === '') {
      divSpan.textContent = '';
      showPage(data, InitialPage);
      addPagination(data);
      return
   }

   //If the search string is invalid, then show the error in the error div and return
   if (errorPattern.test(target)) {
      divSpan.textContent = 'Can only search using alphabets';
      return
   }
   else {
      //If the search string is valid, then clear the error div
      divSpan.textContent = '';
   }

   //Pattern for searching for the search string in the student names
   //This can also be implemented using string 'includes' method with performing 'toLowerCase' method on both search string and student names first
   //Not sure about the pro/con between the two, if you can guide me on that, it would be much appreciated !
   const pattern = new RegExp(target, 'ig');
   
   //Array to store the matched search results
   let matchResult = []

   //Iterate through the student object array and search for a match
   data.forEach(item => {

      //The search function is searching through the entire full name
      let fullName = `${item.name.first} ${item.name.last}`;

      //If the full name contains the search string, then add current student object to the 'matchResult' array
      (pattern.test(fullName)) ? matchResult.push(item) : null;
   });

   //Update the page and pagination buttons with the search results starting at page 1
   showPage(matchResult, InitialPage);
   addPagination(matchResult);
}

// Call functions

//Constant for holding the maximum number of items per page and initial page
const ItemPerPage = 9;
const InitialPage = 1;

showPage(data, InitialPage);
addPagination(data);
createSearchBar();

//After initializing the initial page, attach event listeners to the search bar and button
const searchBar = document.querySelector('#search');
const searchBtn = document.getElementById('search-button');

//Listen for the 'keyup' events from the user and update the search results in real time
searchBar.addEventListener('keyup', e => {
   search(e.target.value)
});

//Handle any outliner case which user click the search button
searchBtn.addEventListener('click', e => {
   search(searchBar.value);
})