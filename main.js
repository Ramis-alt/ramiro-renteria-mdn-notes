//MDN: Introducing Asynchronus Programing

//Asynchronous programming is a technique that enables you to run your program that may take a long time and be able to run other programs or tasks during the time 
//the long-running program resolves.

//An example of function that may take a long time are fetch() requests, accessing a user's camera or microphone using getUserMedia() and
//asking the user to select files using showOpenFilePicker().

//Long running synchronous functions makes asynchronous programming a necessity .

//The browser reads the code line by line from top down in the order written.

//Event handlers are a form of asynchronous programming

//API's are asynchronous as well. Requests to a remote server take some time.

/*Questions:
What is the primary difference between synchronous and asynchronous programming in JavaScript?
The difference between synchronous and asynchronous programming is that synchronous programming runs one task at a time in sequence
while asynchronous programming runs multiple tasks at once while resolving a function or operation that may take longer.

Why is this useful?
It is useful on occasions where for example, some kind of fetch request may take longer and therefore you have the need for other
operations to work while waiting for the operation that takes longer to resolve.

What problems does it solve?
It resolves the ability for programs that may be stuck waiting for the long-running program to run while waiting.
*/

//XMLHttpRequest is an asynchronous API, used heavily in AJAX programming. Can be used to request/retrieve any type of data not just XML from a URL

//Callbacks: an event handler is a particular type of callback. A callback is a function that is passed into another function and expected to be called
//the appropiate time. Callbacks used to be the way asynchronous functions were implemented in JavaScript but can be hard to understand. Can also be harder to find errors and debug
//!!Callback Hell!! or Pyramid of DOOM

//How to use promises:

//A promise is an object returned by an asynchronous function which represents the current state of the operation. It can return to the caller unfinished
//but it will provide methods that either handle successes or failures to the operation.


//fetch() promise example

//const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
//a request is made 
//console.log(fetchPromise);

// fetchPromise.then((response) => { //handler response passed into the .then
//   console.log(`Received response: ${response.status}`);
// });
//we get a 'pending' state meaning the fetch operation is still going on 
//we get an object response from out fetch request. If operation succeeds, the promise calls the handler, 
//passing in a response object containing the servers response
//console.log("Started request…");
/*
//this is our output:
Promise { <state>: "pending" }
Started request…
Received response: 200
*/

//after getting the response object, we have to call another f(x) to get the response data. We want
//the response data as JSON, we call the json() method of the Response object. json() is also asynchronous, so 
//two asynchronous f(x)s have to be called

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

fetchPromise.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((data) => {
    console.log(data); //logging this gives us the whole object response which is an array containing 12 nested objects
    console.log(data[0].name);
  });
});

//