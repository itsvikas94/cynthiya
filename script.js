const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// var crsr = document.querySelector("#minicircle");

// document.addEventListener("mousemove", function (dets) {
//     crsr.style.left = dets.x + "px";
//     crsr.style.top = dets.y + "px";
//   });

var timeout;
function circleChaptaKaro() {
  // define default value scale value
  let xscale = 1;
  let yscale = 1;

  let xprev = 0;
  let yprev = 0;

  window.addEventListener("mousemove", function(dets) {
    
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}


function firstPageAnim() {
  var t1 = gsap.timeline();

  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();

// teeno element ko select karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll("#elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function(dets){  
     gsap.to(elem.querySelector("img"), {
       opacity: 0,
       ease:Power3,
       duration: 0.5,
     });
   });

  elem.addEventListener("mousemove", function(dets){
   var diff = dets.clientY - elem.getBoundingClientRect().top;
  //  console.log(diff);
   diffrot = dets.clientX - rotate;
   rotate = dets.clientX;

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease:Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
    });
  });
});

// timer for footer 
function footertime(){
const clock = document.querySelector('#clock')

setInterval(function () {
  let date = new Date();
//   console.log(date.toLocaleTimeString());
clock.innerHTML = date.toLocaleTimeString();
}, 1000);
}
footertime();