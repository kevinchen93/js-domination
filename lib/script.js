const send = obj => {
  const resultsContainer = $l('.results-container');
  resultsContainer.empty();
  $l.ajax(obj).then(
    response => {
      response.forEach( tvShowObj => {
        resultsContainer.elements[0].style.paddingTop = '20px';
        resultsContainer.elements[0].style.paddingBottom = '20px';
        resultsContainer.elements[0].style.border = '2px solid #234099';
        resultsContainer.elements[0].style.borderRadius = '5px';

        resultsContainer.append(`<a href=${tvShowObj.show.officialSite}><h1>${tvShowObj.show.name}</h1></a>`);

        if (tvShowObj.show.rating.average) {
          resultsContainer.append(`<h4>Average Rating: ${tvShowObj.show.rating.average}</h4>`);
        } else {
          resultsContainer.append(`<h4><a href="https://github.com/kevinchen93" target="_blank">Rating N/A</a><h4>`);
        }

        if (tvShowObj.show.image) {
          resultsContainer.append(`<img src=${tvShowObj.show.image.medium} />`);
        } else {
          resultsContainer.append(`<h4><a href="https://github.com/kevinchen93" target="_blank">Image N/A</a></h4>`);
        }

        resultsContainer.append(`${tvShowObj.show.summary}`);
      });
    }
  );
};

const searchInput = e => {
  if (e.keyCode === 13 && e.target.value) {
    console.log('ENTER KEY WAS PRESSED');

    const searchQuery = e.target.value;
    const obj = { url: `https://api.tvmaze.com/search/shows?q=${searchQuery}` };
    send(obj);
    e.target.value = '';
  }
};
