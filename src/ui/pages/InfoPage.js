const InfoPage = () => `
  <div id="info-page">
    <h1>
      Info
    </h1>
    <p>
      App version: 4.0.1
    </p>
    <button onclick="dispatch({ type: 'FILTER', filter: 'active' })">Back</button>
  </div>
`

export default InfoPage
