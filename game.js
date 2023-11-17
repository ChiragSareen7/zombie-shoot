// Iteration 1: Declare variables required for this game

// Iteration 1.2: Add shotgun sound

// Iteration 1.3: Add background sound

// Iteration 1.4: Add lives

// Iteration 2: Write a function to make a zombie

// Iteration 3: Write a function to check if the player missed a zombie

// Iteration 4: Write a function to destroy a zombie when it is shot or missed

// Iteration 5: Creating timer

// Iteration 6: Write a code to start the game by calling the first zombie

// Iteration 7: Write the helper function to get random integer
let gameBody=document.getElementById('game-body')
let lives=document.getElementById('lives')
let seconds=document.getElementById('timer').textContent
// console.log(seconds)
let maxlives=4;

let backgroundSound=new Audio('./assets/bgm.mp3')
backgroundSound.play()
backgroundSound.loop=true

let shotgunSound=new Audio('./assets/shotgun.wav')
shotgunSound.volume=0.1
// shotgunSound.play()
// shotgunSound.loop=true

gameBody.onclick=()=>{
    shotgunSound.pause()
    shotgunSound.currentTime=0
    shotgunSound.play()
}
var zombieId = 0;
let img = [
    "zombie-1.png",
    "zombie-2.png",
    "zombie-3.png",
    "zombie-4.png",
    "zombie-5.png",
    "zombie-6.png",

];
function getRandomInt(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min))+min;
}

var zombieId=0;
function create(){
    z=img[getRandomInt(0,img.length)]
    // console.log(z)
    gameBody.innerHTML +=`<img src='./assets/${z}'
    class="zombie-image" id="zombies${zombieId}">`;

    let zombie=document.getElementById(`zombies${zombieId}`)
    zombie.style.transform=`translateX(${getRandomInt(15,75)}vw)`
    zombie.onclick=()=>{
        zombieDestruct(zombie)
    }
}
create()

function checkCollision(zombie){
    if(zombie.getBoundingClientRect().top<=0){
        maxlives--
        return true
    }
    return false
}

function zombieDestruct(zombie){
    zombie.style.display='none';
    zombieId++
    create()
}

var timerId = setInterval(()=>{
    seconds--
    document.getElementById('timer').textContent=seconds
    let zombie=document.getElementById(`zombies${zombieId}`)

    if(checkCollision(zombie)==true){
        zombieDestruct(zombie)
        if(maxlives==0){
            clearInterval(timerId)
            location.href='./win.html'
        }
    }

    if(seconds==0){
        clearInterval(timerId)
        location.href='./win.html'
    }
},1000)