const apiKey = 'AIzaSyCzOZT0KpisM7GOxnNm2IHoI9L8SFJN8UI'
const customSearchId = '006011215058077132006:oomzxe2ej2o'
const apiPath= 'https://www.googleapis.com/customsearch/v1/'
export default query =>
  `${apiPath}?q=${encodeURIComponent(query)}&searchType=image&key=${apiKey}&cx=${customSearchId}`
