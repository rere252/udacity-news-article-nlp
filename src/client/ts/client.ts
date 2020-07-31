import '../styles/main.scss';

fetch('api/test', {
  headers: {
    Accept: 'application/json'
  }
})
  .then((resp) => resp.text())
  .then((r) => console.log(r));
