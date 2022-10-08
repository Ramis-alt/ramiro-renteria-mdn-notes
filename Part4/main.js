//INTRODUCING WORKERS:
/*
Single-threaded program: means long-running programs that are synchronous can become unresponsive
A thread is a sequence of instructions that a program follows.
Programs are single threaded so they can only do one thing at a time. A synchronous program 
that is waiting for a long-running synchronous call to return will get stuck because it can only do
one thing at a time. Thus, the window becoming unresponsive. Hijole!

This is where it gets good! Workers give you the ability to run some tasks in a different thread. 
Seems like asynchronous f(x)s. "You start the task the continue with other processing"

The downside to this is you may not know when the multithreaded code (one of the threads) may be suspended
and other code will get a chance to run. May cause bugs hard to find if they have access to the same variables

TO AVOID THIS PROBLEM: Your main code and your worker code I'm guessing must never get access to each other's
variables. Workers cannot access the DOM and the only way worker code and main code interact is by sending each
other messages.

THREE DIFFERENT SORTS OF WORKERS:
1._Dedicated workers: A dedicated worker is used by a single script instance.

2._Shared workers: Can be shared by several different scripts running in different windows.

3._Service workers: Act like proxy servers, caching resources so that web applications can work when the user is offline. 
They're a key component of Progressive Web Apps.

Note: there is no disgruntled workers...👀

USING WEB WORKERS: A web worker is a JavaScript process that runs in the background of a webpage. A web worker offloads some of the
work that the main thread has. VERY IMPORTANT!!!!!


The Synchronous Prime Generator

*/

// function generatePrimes(quota) {

//     function isPrime(n) {
//       for (let c = 2; c <= Math.sqrt(n); ++c) {
//         if (n % c === 0) {
//             return false;
//          }
//       }
//       return true;
//     }
  
//     const primes = [];
//     const maximum = 1000000;
  
//     while (primes.length < quota) {
//       const candidate = Math.floor(Math.random() * (maximum + 1));
//       if (isPrime(candidate)) {
//         primes.push(candidate);
//       }
//     }
  
//     return primes;
//   }
  
//   document.querySelector('#generate').addEventListener('click', () => {
//     const quota = document.querySelector('#quota').value;
//     const primes = generatePrimes(quota);
//     document.querySelector('#output').textContent = `Finished generating ${quota} primes!`;
//   });
  
//   document.querySelector('#reload').addEventListener('click', () => {
//     document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
//     document.location.reload();
//   });

/*
The program becomes unresponsive in the code above after generatePrimes() is called. I think the reason for that is because it's
waiting for 1000000m/s. 

BELOW, it shows the way to separate worker code and main code by having it in different files and by not including the file in our script tag.
*/
// Create a new worker, giving it the code in "generate.js"
const worker = new Worker('./generate.js');

// When the user clicks "Generate primes", send a message to the worker.
// The message command is "generate", and the message also contains "quota",
// which is the number of primes to generate.
document.querySelector('#generate').addEventListener('click', () => {
  const quota = document.querySelector('#quota').value;
  worker.postMessage({
    command: 'generate',
    quota,
  });
});

// When the worker sends a message back to the main thread,
// update the output box with a message for the user, including the number of
// primes that were generated, taken from the message data.
worker.addEventListener('message', (message) => {
  document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
  document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});


/*
All of this runs as soon as the script creates the worker.  
The worker listens for event listeners from the main script: addEventListener()
addEventListener() is a global f(x) in a worker. "Inside the message event handler, 
the data property of the event contains a copy of the argument passed from the main script. 
If the main script passed the generate command, we call generatePrimes(), 
passing in the quota value from the message event.

The generatePrimes() function is just like the synchronous version,
 except instead of returning a value, we send a message to the main script when we are done. 
 We use the postMessage() function for this, which like addEventListener() is a global function in a worker. 
 As we already saw, the main script is listening for this message and will update the DOM when the message is received."

The type of worker used in this example is called a dedicated worker. 
A dedicated worker is used by a single script instance.


Conclusion:
In this article we've introduced web workers, 
which enable a web application to offload tasks to a separate thread. 
The main thread and the worker don't directly share any variables, 
but communicate by sending messages, which are received by the other side as message events (addEventListener()).

Workers can be an effective way to keep the main application responsive, 
although they can't access all the APIs that the main application can, 
and in particular can't access the DOM.


 */