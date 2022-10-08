//THIS IS OUR WORKER CODE
/*
We're creating a worker constructor by using the Worker() constructor. We then pass a url to the worker script. Once
the worker is created, the worker script is executed.

"Next, as in the synchronous version, we add a click event handler to the "Generate primes" button. 
But now, rather than calling a generatePrimes() function, we send a message to the worker using worker.postMessage(). 
This message can take an argument, and in this case, we're passing a JSON object containing two properties:
command: a string identifying the thing we want the worker to do (in case our worker could do more than one thing)
quota: the number of primes to generate.
Next, we add a message event handler to the worker. This is so the worker can tell us when it has finished, 
and pass us any resulting data. Our handler takes the data from the data property of the message, 
and writes it to the output element (the data is exactly the same as quota, so this is a bit pointless, but it shows the principle).
Finally, we implement the click event handler for the "Reload" button. This is exactly the same as in the synchronous version."

*/

// Listen for messages from the main thread.
// If the message command is "generate", call `generatePrimes()`
addEventListener("message", (message) => {
    if (message.data.command === 'generate') {
      generatePrimes(message.data.quota);
    }
  });
  
  // Generate primes (very inefficiently)
  function generatePrimes(quota) {
  
    function isPrime(n) {
      for (let c = 2; c <= Math.sqrt(n); ++c) {
        if (n % c === 0) {
            return false;
         }
      }
      return true;
    }
  
    const primes = [];
    const maximum = 1000000;
  
    while (primes.length < quota) {
      const candidate = Math.floor(Math.random() * (maximum + 1));
      if (isPrime(candidate)) {
        primes.push(candidate);
      }
    }
  
    // When we have finished, send a message to the main thread,
    // including the number of primes we generated.
    postMessage(primes.length);
  }
  