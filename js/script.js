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

// A list parameter to represent student data that will be passed as an argument when the function is called.
// A page parameter to represent the page number that will be passed as an argument when the function is called.
const showPage = (list, page) => {
   const startIndex = (page * ItemPerPage) - ItemPerPage;
   let endIndex = page * ItemPerPage;

   endIndex = (endIndex > list.length) ? list.length : endIndex;

   const ul = document.querySelector('.student-list');
   ul.innerHTML = '';

   for (let i = startIndex; i < endIndex; i++) {
      const li = document.createElement('li');
      const divStudent = document.createElement('div');

      li.classList.add('student-item');
      li.classList.add('cf');
      divStudent.classList.add('student-details');

      li.appendChild(divStudent);

      const divJoined = document.createElement('div');
      divJoined.classList.add('date');
      divJoined.textContent = `Joined ${list[i].registered.date}`;

      li.appendChild(divJoined);

      const img = document.createElement('img');
      img.classList.add('avatar');
      img.src = list[i].picture.large;
      img.alt = 'Profile Picture';

      const h3 = document.createElement('h3');
      h3.textContent = `${list[i].name.first} ${list[i].name.last}`;

      const span = document.createElement('span');
      span.classList.add('email');
      span.textContent = list[i].email;

      divStudent.appendChild(img);
      divStudent.appendChild(h3);
      divStudent.appendChild(span);

      ul.appendChild(li);
   }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = list => {
   const totalPage = Math.ceil(list.length / ItemPerPage);
   const ul = document.querySelector('.link-list');
   ul.innerHTML = '';

   if (!list.length) {
      ul.textContent = 'No results found';
      return;
   };

   for (let i = 0; i < totalPage; i++) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = i + 1;

      li.appendChild(btn);
      ul.append(li);
   }

   ul.childNodes[initialPage - 1].firstChild.classList.add('active');

   const navigationBtn = document.querySelectorAll('button');
   navigationBtn.forEach(btn => btn.addEventListener('click', e => {
      const currentActive = document.querySelector('.active');

      if (currentActive != e.target) {
         currentActive.classList.remove('active');
         e.target.classList.add('active');
         showPage(list, e.target.textContent);
      }
   }));
}

/*
Create search bar
*/
// data-toggle="tooltip" data-placement="top" title="Tooltip on top"
const createSearchBar = () => {
   const header = document.querySelector('.header');

   const label = document.createElement('label');
   label.htmlFor = 'search';
   label.classList.add('student-search');

   header.appendChild(label);

   const span = document.createElement('span');
   span.textContent = 'Search by name';

   label.appendChild(span);

   const divSpan = document.createElement('div');
   divSpan.id = 'error';
   label.appendChild(divSpan);

   const input = document.createElement('input');
   input.id = 'search';
   input.placeholder = 'Search by name...';

   label.appendChild(input);

   const btn = document.createElement('button');
   btn.type = 'button';

   label.appendChild(btn);

   const img = document.createElement('img');
   img.src = 'img/icn-search.svg';
   img.alt = 'Search icon';

   btn.appendChild(img);
}

/*
Search function
*/

const search = (target) => {
   const errorPattern = /[^a-zA-Z\s:]/;
   const divSpan = document.getElementById('error');

   if (target === '') {
      divSpan.textContent = '';
      return data;
   }

   if(errorPattern.test(target)) {
      divSpan.textContent = 'Can only search using alphabets';
      console.log(divSpan);
      return;
   }
   else {
      divSpan.textContent = '';
   }

   const pattern = new RegExp(target, 'ig');
   let matchResult = []

   data.forEach(item => {
      let fullName = `${item.name.first} ${item.name.last}`;

      (pattern.test(fullName)) ? matchResult.push(item) : null;
   });

   showPage(matchResult, initialPage);
   addPagination(matchResult);
}

// Call functions

const ItemPerPage = 9;
const initialPage = 1;

showPage(data, initialPage);
addPagination(data);
createSearchBar();

const searchBar = document.querySelector('#search');

searchBar.addEventListener('keyup', e => search(e.target.value));