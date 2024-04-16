window.addEventListener("load", sidenVises);
//opretter kontanter//

let point = 0;
let liv = 3;

const boba1 = document.querySelector("#boba1_container");
const boba2 = document.querySelector("#boba2_container");
const carrot1 = document.querySelector("#carrot_container");
const broc1 = document.querySelector("#broccoli_container");

function sidenVises() {
  console.log("sidenVises");
  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  //Vis start skærm
  document.querySelector("#start").classList.remove("hide");
  //Klik på start_knap
  document.querySelector("#start_knap").addEventListener("mousedown", startSpil);
}

function startSpil() {
  console.log(startSpil);
  //Skjul andre skærme
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  //starter timer animation (time)
  document.querySelector("#time_fill").classList.add("time");
  //når animationen er færdig kaldes Stopspillet()
  document.querySelector("#time_container").addEventListener("animationend", stopSpillet);

  //musik startes/
  document.querySelector("#musik").play();

  //Boba1/
  boba1.classList.add("fald", "pos" + ranNum(9), "delay" + ranNum(4));
  boba1.addEventListener("mousedown", clickBobaHandler);
  boba1.addEventListener("animationiteration", bobaReset);

  //Boba2/

  boba2.classList.add("fald", "pos" + ranNum(9), "delay" + ranNum(4));
  boba2.addEventListener("mousedown", clickBobaHandler);
  boba2.addEventListener("animationiteration", bobaReset);

  //Carrot/
  carrot1.classList.add("fald", "pos" + ranNum(9), "delay" + ranNum(4));
  carrot1.addEventListener("mousedown", clickCarrotHandler);
  carrot1.addEventListener("animationiteration", carrotReset);

  //Broccoli/
  broc1.classList.add("fald", "pos" + ranNum(9), "delay" + ranNum(4));
  broc1.addEventListener("mousedown", clickCarrotHandler);
  broc1.addEventListener("animationiteration", carrotReset);
}

function clickBobaHandler() {
  point++;
  console.log(point);
  document.querySelector("#point").textContent = point;
  //lyde/
  document.querySelector("#sound_good3").currentTime = 0;
  document.querySelector("#sound_good1").currentTime = 0;

  if (Math.random() < 0.5) {
    document.querySelector("#sound_good3").play();
  } else {
    document.querySelector("#sound_good1").play();
  }
  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind_boba");
  this.removeEventListener("mousedown", bobaReset);
  this.addEventListener("animationend", bobaReset);
}

function bobaReset() {
  console.log(this);
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("fald", "pos" + ranNum(9), "delay" + ranNum(4));
  this.addEventListener("mousedown", startSpil);
}

function clickCarrotHandler() {
  //lyde/
  document.querySelector("#sound_bad1").currentTime = 0;
  document.querySelector("#sound_bad2").currentTime = 0;
  if (Math.random() < 0.5) {
    document.querySelector("#sound_bad1").play();
  } else {
    document.querySelector("#sound_bad2").play();
  }

  this.classList.add("frys");
  this.firstElementChild.classList.add("forsvind_carrot");
  this.removeEventListener("mousedown", carrotReset);
  this.addEventListener("animationend", carrotReset);

  liv--;
  console.log(liv);
  document.querySelector("#liv span").textContent = liv;
  if (liv <= 0) {
    console.log("ikke flere liv");
    stopSpillet();
  }
}

function carrotReset() {
  console.log(this);
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;
  this.classList.add("fald", "pos" + ranNum(9), "delay" + ranNum(4));
  this.addEventListener("mousedown", startSpil);
}

function stopSpillet() {
  console.log("stopSpillet");

  //stop timer//
  document.querySelector("#time_fill").classList.remove("time");
  document.querySelector("#time_container").removeEventListener("animationend", stopSpillet);

  //pause musik/
  document.querySelector("#musik").pause();

  //Boba - fjerne class og eventListener//

  boba1.classList = "";
  boba1.firstElementChild.classList = "";
  boba1.removeEventListener("mousedown", clickBobaHandler);
  boba1.removeEventListener("animationiteration", bobaReset);
  boba1.removeEventListener("animationend", bobaReset);

  boba2.classList = "";
  boba2.firstElementChild.classList = "";
  boba2.removeEventListener("mousedown", clickBobaHandler);
  boba2.removeEventListener("animationiteration", bobaReset);
  boba2.removeEventListener("animationend", bobaReset);

  // Carrot - fjerne class og eventListener//

  carrot1.classList = "";
  carrot1.firstElementChild.classList = "";
  carrot1.removeEventListener("mousedown", clickCarrotHandler);
  carrot1.removeEventListener("animationiteration", carrotReset);
  carrot1.removeEventListener("animationend", carrotReset);

  broc1.classList = "";
  broc1.firstElementChild.classList = "";
  broc1.removeEventListener("mousedown", clickCarrotHandler);
  broc1.removeEventListener("animationiteration", carrotReset);
  broc1.removeEventListener("animationend", carrotReset);

  if (liv <= 0) {
    gameOver();
  } else if (point >= 15) {
    console.log("mere end 10 point");
    levelComplete();
  } else {
    gameOver();
  }
}

function gameOver() {
  console.log("gameOver");
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#game_over_point span").textContent = point;
  document.querySelector("#genstart1").addEventListener("mousedown", reloadPage);
}
function levelComplete() {
  console.log("levelComplete");
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#level_complete_point span").textContent = point;
  document.querySelector("#genstart2").addEventListener("mousedown", reloadPage);
}

function reloadPage() {
  console.log("#reloadPage");
  document.location.reload(true);
}

function ranNum(max) {
  return Math.floor(Math.random() * max) + 1;
}
