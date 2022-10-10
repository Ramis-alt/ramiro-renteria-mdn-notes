//SEQUENCING ANIMATIONS ASSESMENT:
/*
the element.animate() is being used here to animate the image
*/
const swirlyTumbling = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];
  
  const swirlyTiming = {
    duration: 2000,
    iterations: 1,
    fill: 'forwards'
  }
  
  const swirly1 = document.querySelector("#swirly1");
  const swirly2 = document.querySelector("#swirly2");
  const swirly3 = document.querySelector("#swirly3");

//   swirly1.animate(swirlyTumbling, swirlyTiming).finished
//     .then(() => swirly2.animate(swirlyTumbling, swirlyTiming).finished)
//     .then(() => swirly3.animate(swirlyTumbling, swirlyTiming).finished)
//     .catch(error => console.log(`Error animating: $(error)`));


async function myAnimation () {
    await swirly1.animate(swirlyTumbling, swirlyTiming).finished;
    await swirly2.animate(swirlyTumbling, swirlyTiming).finished;
    await swirly3.animate(swirlyTumbling, swirlyTiming).finished;
}

myAnimation(); //calls the function as page opens