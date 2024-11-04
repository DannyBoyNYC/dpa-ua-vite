import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Testing UA Parser</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
`;

setupCounter(document.querySelector("#counter"));
