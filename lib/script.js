const send = (obj, type) => {
  const resultsContainer = $l('.results-container');
  resultsContainer.empty();

  $l.ajax(obj).then(
    response => {

      resultsContainer.elements[0].style.paddingTop = '20px';
      resultsContainer.elements[0].style.paddingBottom = '20px';
      resultsContainer.elements[0].style.border = '2px solid #234099';
      resultsContainer.elements[0].style.borderRadius = '5px';

      if (type === 'show') {
        response.forEach( tvShowObj => {

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
      } else if (type === 'yesorno') {
        const imageURL = response.image;

        resultsContainer.append(`<img src=${imageURL} />`);
        resultsContainer.append(`<p>${response.answer}</p>`)
      } else if (type === 'advice') {

        resultsContainer.append(`<p>${response.slip.advice}</p>`);
      }
    }
  );
};

const searchShows = e => {
  const searchTVInput = $l('.search-tv-input');

  if (searchTVInput.elements[0].value) {
    const obj = { url: `https://api.tvmaze.com/search/shows?q=${searchTVInput.elements[0].value}` };

    send(obj, 'show');
    searchTVInput.elements[0].value = '';
  }
};

const searchYesOrNo = (e) => {
  const searchYesOrNoInput = $l('.search-yes-or-no-input');

  if (searchYesOrNoInput.elements[0].value) {
    const obj = { url: `https://yesno.wtf/api/` };

    send(obj, 'yesorno');
    searchYesOrNoInput.elements[0].value = '';
  }
};

const searchAdvice = () => {
  const obj = { url: `https://api.adviceslip.com/advice` };

  send(obj, 'advice');
};
