// Google API credentials
const google = {
  apiKey: 'AIzaSyCzOZT0KpisM7GOxnNm2IHoI9L8SFJN8UI',
  customSearchId: '006011215058077132006:oomzxe2ej2o',
  apiPath: 'https://www.googleapis.com/customsearch/v1/',
  apiUrl: query =>
    `${google.apiPath}?q=${encodeURIComponent(query)}&searchType=image&key=${google.apiKey}&cx=${google.customSearchId}`,
}

export default google.apiUrl;
