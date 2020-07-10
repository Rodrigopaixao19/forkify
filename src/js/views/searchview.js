import { elements } from './base';

// return the input value of the field
export const getInput = () => elements.searchInput.value; // implicit return
    

export const clearInput = () => {
    elements.searchInput.value = '';
}

export const clearResult = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}


const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;

    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

// type: prev or next
const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right' }"></use>
            </svg>
        </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    // in which page are we? how many pages are there? number of results / results displayed per page
    const pages = Math.ceil(numResults / resPerPage); // 30 results, each page 10 results 30/ 10 = 3 pages
    // math.ceil (4.4 = 5 not 4.4 = 4)
    let button;
    if(page === 1 && pages > 1) {
        // Only on button to move to the next page
        button = createButton(page, 'next');
    } else if(page < pages) {
        // when we are in one of the middle pages, we want both buttons previous and next
        button = `
        ${createButton(page, 'prev')} 
        ${createButton(page, 'next')}
        `;
    } else if(page === pages && pages > 1) {
        // Only one button to go back to previous pages
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage; // page 1 (1-1 = 0(0 is the first position of the array, first recipe), page 2 2-1 = 1) results per page will always be 10 so i have to multiply by the results per page
    const end = page * resPerPage; // page 1 * 10 = 10 results

    recipes.slice(start, end).forEach(renderRecipe);   


    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};


export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el =>{
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
};


// pasta with tomate and spinach

/*
first iteration 0
acc 0/0 acc + cur.lenght = 0 + 5 / newtitle = [pasta]
acc 5 / acc + cur.length = 5 + 4 = 9 / new title = [with]
acc 9 / acc + cur.length = 6 + 9 = 15 / new title = [tomate]
acc 15 / acc + cur.length = 15 + 3 = 18 / [still tomato] 'and'not pushed into the array cause is the limit is 17
acc 15 / acc + cur.length = 18 + 7 = 25 / [still tomato] 'spinach'not pushed into the array cause the limit is 17


*/
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        //return result
        return `${newTitle.join(' ')} ...`;
    }  
    return title;
};