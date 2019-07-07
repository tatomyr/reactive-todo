export const InfoPage = () => `
  <div id="info-page">
    <h1>
      Purity ToDo App Info
    </h1>
    <p>
      App version: 5.0.10
    </p>
    <p>
      Check out the repository:
      <a href="https://github.com/tatomyr/reactive-todo">
        github.com/tatomyr/reactive-todo
      </a>
    </p>
    <button onclick="dispatch({ type: 'FILTER', view: 'active' })">Back</button>
  </div>
`
