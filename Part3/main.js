//HOW TO IMPLEMENT A PROMISE BASED API

/*
Implementing an alarm() API: this example will use an alarm API that will send out an alert to a "person" to "wake up"
It'll have a delay

a setTimeout() API will be used to set our time (in milliseconds of course).

The example below has a delay of 1000 milliseconds or one secord
*/


// const output = document.querySelector('#output');
// const button = document.querySelector('#set-alarm');
// const secondOutput = document.querySelector('#output2');
// const secondButton = document.querySelector('#set-alarm2');

// function setAlarm() {
//   setTimeout(() => {
//     output.textContent = 'Wake up!';
//   }, 1000);
// }

// button.addEventListener('click', setAlarm);//the event listener is listening for a click
//on the button, when clicked, the f(x) setAlarm is called, the setTimeout is triggered
//with a 1 second delay and the message output string is displayed (Wake up!)


// function secondAlarm() {
//   setTimeout(() => {
//     secondOutput.textContent = 'Second Time!';
//   }, 1000);
// }

// secondButton.addEventListener('click', secondAlarm);

/*
The alarm f(x) returns a promise that is fulfilled when the timer expires.

The Promise() constructor:
The alarm f(x)s return a promise that when is fulfilled when the timer expires.
It will pass a "Wake up!" message into the then() handler,
and will reject the promise if the caller supplies a negative delay value.

The Promise constructor takes a single f(x) as an argument called the executor. 
Resolve and reject. In our asynchronous f(x), if it succeeds, you call resolve. 
If the f(x) fails, you call reject.
*/

// function alarm(person, delay) {
//     return new Promise((resolve, reject) => {
//       if (delay < 0) {
//         throw new Error('Alarm delay must not be negative');
//       }
//       setTimeout(() => {
//         resolve(`Wake up, ${person}!`);
//       }, delay);
//     });
//   }

/*
This function creates and returns a new Promise. Inside the executor for the promise, we:

check that delay is not negative, and throw an error if it is.
call setTimeout(), passing a callback and delay. 
The callback will be called when the timer expires, 
and in the callback we call resolve, passing in our "Wake up!" message.

Using async and await with the alarm() API

Since alarm() returns a Promise, we can do everything with it that we could do with any other promise: promise chaining, Promise.all(), and async / await:
*/

const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', async () => {
  try {
    const message = await alarm(name.value, delay.value);
    output.textContent = message;
  }
  catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});