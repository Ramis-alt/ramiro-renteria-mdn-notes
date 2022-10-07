/*
HOW TO USE PROMISES:

A promise is an object returned by an asynchronous function which represents the current state of the operation. 
It can return to the caller unfinished
but it will provide methods that either handle successes or failures to the operation.


fetch() promise example: in a fetch() f(x) you give it an url and it fetches that url 

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
a request is made 
console.log(fetchPromise);

fetchPromise.then((response) => { //handler response passed into the .then
  console.log(`Received response: ${response.status}`);
});
we get a 'pending' state meaning the fetch operation is still going on 
we get an object response from out fetch request. If operation succeeds, the promise calls the handler, 
passing in a response object containing the servers response
console.log("Started request…");
*/
/*
//this is our output:
Promise { <state>: "pending" }
Started request…
Received response: 200
*/


/*
HTTP requests- sends a message request to a remote server and sends us back a response.
A fetch() request is the modern version/replacement (promise based) for an XMLHttprequest
*/

/*
CHAINING PROMISES:


*/

/*
With the fetch() API, once you get your "Response" (check dev tools in the console), you must call another f(x) to get the response data as JSON.
After getting the response object, we have to call another f(x) to get the response data. We want
the response data as JSON, we call the json() method of the Response object. json() is also asynchronous, so 
two asynchronous f(x)s have to be called
*/

// const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// fetchPromise.then((response) => {
//   const jsonPromise = response.json();//.json returns a promise, converts it into an object we can use
//   jsonPromise.then((data) => {
//     console.log(data); //logging this gives us the whole object response which is an array containing 12 nested objects
//     console.log(data[0].name); //this gives us the "baked beans" as a response because its getting the data at index 0 under name
//   });
// });

/*
It is best practice to use callbacks to call events, like an eventListener.
We can rewrite our code using the .then promises below
*/
// const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// fetchPromise
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data[0].name);
//   });

/*
  When performing multiple asynchronous operations in a sequence, promises should be composed by chaining multiple .then() methods.
  Better practice than nesting. Chanining is known as composition.

  CATCHING ERRRORS:
  The fetch() API can throw an error. Some examples are: no network connectivity or url malformed
  Nested callback makes errors difficult to find.

  The catch() method is introduced to "catch" errors. Similar to .then(). Catch method also takes or you can pass in a handler f(x).
  The difference in the between the .then() and catch() is that the .then() handler is called when the asynchronous operation succeeds, the handler passed to
  the catch() is called when the async f(x) fails

  We add a catch() to the end of the promise chain, it will be called when any of the async f(x)s calls fail.
*/

//   const fetchPromise = fetch('bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// fetchPromise
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data[0].name);
//   })
//   .catch((error) => {
//     console.error(`Could not get products: ${error}`);
//   });

/*
The above fetch fails and throws "TypeError: Failed to fetch" in our console.

PROMISE TERMINOLOGY:
Pending: the initial state and the operation has not completed yet
Fulfilled: the operation has competed successfully and the promise now has a resolved value. 
            Example: a request promise might resolve with a JSON object as its value.
Rejected: the operation has failed and the promise has a reason for the failure. Usually an error of some kind.

A promise is resolved if it is settled. Can either be rejected or fulfilled.

COMBINING MULTIPLE PROMISES:

The Promise.all() method used when you want to start all the the promises together and fullfilled together. 
This is usefull when in cases where promises don't depend on each other. The Promise.all() takes an array
of promises and returns a single promise.

A Promise.all() is fulfilled when all the promises in the array are fulfilled. The then() handler is called
with an array of all the responses in the same way they were passed into all().

if it is rejected, the catch() handler is called with the error thrown

The example below shows how three API are fetched by the Promise.all()
  */
// const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
// const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

// Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
//   .then((responses) => {
//     for (const response of responses) {
//       console.log(`${response.url}: ${response.status}`);
//     }
//   })
//   .catch((error) => {
//     console.error(`Failed to fetch: ${error}`)
//   });

/*
Promise.all() waits for all fulfillments or the first rejection.
In the case of the above, the second one returns a 404(not found). In this case, the requested file does not 
exist

If it were a badly formed url, the catch() handler would run and we would see an error similar to
"failed to fetch: TypeError: Failed to fetch"

Promise.any(): if you want any of the set of promises fulfilled. This is fulfilled as soon as any of the array of promises is fulfilled or rejected

Here is an example of Promise.any() below. Any promise can be fulfilled and we cannot predict which will be with this method

*/
// const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
// const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

// Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
//   .then((response) => {
//     console.log(`${response.url}: ${response.status}`);
//   })
//   .catch((error) => {
//     console.error(`Failed to fetch: ${error}`)
//   });
/*
Seems that in this case, only one is fulfilled as a success
Link to documentation on promises: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

ASYNC AND AWAIT: the async keyword gives you a simpler way to work with asynchronous promise based code.
ADDING ASYNC AT THE START OF A f(x) MAKES IT AN ASYNC f(x)

example below:

Inside an asynchronous f(x) you can use await keyword before a call to a f(x) that returns a promise which makes the code wait at that
point until the promise is settled, "at which point the fulfilled value of the promise is treated as a return value, or the rejected value is thrown."


*/

// async function myFunction() {
//   //This is an asynchronous f(x). There's no turning back now buddy. It's async and that's all there is to it!
// }

/*
Here is an example below of an async await function. Notice how they're also including the try and catch used for error handling as well.
REMEMBER: Async f(x)s always return a promise
*/

// async function fetchProducts() {
//   try {
//     // after this line, our function will wait for the `fetch()` call to be settled
//     // the `fetch()` call will either return a Response or throw an error
//     const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     // after this line, our function will wait for the `response.json()` call to be settled
//     // the `response.json()` call will either return the parsed JSON object or throw an error
//     const data = await response.json();
//     console.log(data[0].name);
//   }
//   catch (error) {
//     console.error(`Could not get products: ${error}`);
//   }
// }

// fetchProducts();

/*
this will not work!!!
*/
// async function fetchProducts() {
//   try {
//     const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   }
//   catch (error) {
//     console.error(`Could not get products: ${error}`);
//   }
// }

// const promise = fetchProducts();
// console.log(promise[0].name);   // "promise" is a Promise object, so this will not work

/*
This will work!
*/

// async function fetchProducts() {
//   try {
//     const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   }
//   catch (error) {
//     console.error(`Could not get products: ${error}`);
//   }
// }

// const promise = fetchProducts();
// promise.then((data) => console.log(data[0].name));

/*
IN CONCLUSION!!
Promises are the foundation of asynchronous programming in modern JavaScript. 
They make it easier to express and reason about sequences of asynchronous operations without deeply nested callbacks, and they support a style of error handling that is similar to the synchronous try...catch statement.

The async and await keywords make it easier to build an operation from a series of consecutive asynchronous function calls, 
avoiding the need to create explicit promise chains, and allowing you to write code that looks just like synchronous code.

Promises work in the latest versions of all modern browsers; 
the only place where promise support will be a problem is in Opera Mini and IE11 and earlier versions.

*/
