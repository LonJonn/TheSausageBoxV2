const pEl = document.querySelector("p");

const fetchCors = (url: string) =>
  fetch("https://cors-anywhere.herokuapp.com/" + url);

// (async () => {
//   const url = "https://lookmovie.ag/api/v1/shows/search/?q=breaking%20bad";
//   // const url = "https://jsonplaceholder.typicode.com/todos";

//   const todosRes = await fetch("https://jsonplaceholder.typicode.com/todos");
//   const todoData = await todosRes.json();

//   const res = await fetchCors(url);
//   const data = await res.json();

//   pEl.innerText = JSON.stringify(data);
// })();

const s = "123";

console.log("hehe xd");
if (pEl) pEl.innerText = "hehe";
