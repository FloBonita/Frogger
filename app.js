const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector ('#result')
const startButton = document.querySelector('#btn-start')
const pauseButton = document.querySelector('#btn-pause')
const squares = document.querySelectorAll('.grid div')
const logLeft = document.querySelectorAll('.log-left')
const logRight = document.querySelectorAll('.log-right')
const carLeft = document.querySelectorAll('.car-left')
const carRight = document.querySelectorAll('.car-right')

console.log(squares)
let currentIndex = 76
const width = 9 
let timerId
let outcomeTimerId
let currentTime = 20

function moveFrog(e) {

    squares[currentIndex].classList.remove('frog')

    switch(e.key){
            case 'ArrowLeft' :
                if(currentIndex % width !== 0) currentIndex -= 1
                break
            case 'ArrowRight' :                 
                if(currentIndex % width < width - 1) currentIndex += 1
                break
            case 'ArrowUp' :                 
                if(currentIndex - width >= 0) currentIndex -= width
                break
            case 'ArrowDown' :                 
                if(currentIndex + width < width * width) currentIndex += width
                break    
    }

    squares[currentIndex].classList.add('frog')
    

}


function autoMoveElements (){
    currentTime--
    timeLeftDisplay.textContent = currentTime
    logLeft.forEach(logLeftDiv => moveLogLeft(logLeftDiv))
    logRight.forEach(logRightDiv => moveLogRight(logRightDiv))
    carLeft.forEach(carLeftDiv => moveCarLeft(carLeftDiv))
    carRight.forEach(carRightDiv => moveCarRight(carRightDiv))
     
}

function checkOutComes(){ 
    lose()
    win() 
}

function moveLogLeft(logLeftDiv){

    switch(true){
        case logLeftDiv.classList.contains('l1') :
            logLeftDiv.classList.remove('l1')
            logLeftDiv.classList.add('l2')
            break
        case logLeftDiv.classList.contains('l2') :
            logLeftDiv.classList.remove('l2')
            logLeftDiv.classList.add('l3')
            break        
        case logLeftDiv.classList.contains('l3') :
            logLeftDiv.classList.remove('l3')
            logLeftDiv.classList.add('l4')
            break
        case logLeftDiv.classList.contains('l4') :
            logLeftDiv.classList.remove('l4')
            logLeftDiv.classList.add('l5')
            break
        case logLeftDiv.classList.contains('l5') :
            logLeftDiv.classList.remove('l5')
            logLeftDiv.classList.add('l1')
            break
    }

}
function moveLogRight(logRightDiv){

    switch(true){
        case logRightDiv.classList.contains('l1') :
            logRightDiv.classList.remove('l1')
            logRightDiv.classList.add('l5')
            break
        case logRightDiv.classList.contains('l2') :
            logRightDiv.classList.remove('l2')
            logRightDiv.classList.add('l1')
            break        
        case logRightDiv.classList.contains('l3') :
            logRightDiv.classList.remove('l3')
            logRightDiv.classList.add('l2')
            break
        case logRightDiv.classList.contains('l4') :
            logRightDiv.classList.remove('l4')
            logRightDiv.classList.add('l3')
            break
        case logRightDiv.classList.contains('l5') :
            logRightDiv.classList.remove('l5')
            logRightDiv.classList.add('l4')
            break
    }

}

function moveCarLeft(carLeftDiv){

    switch(true){
        case carLeftDiv.classList.contains('c1') :
            carLeftDiv.classList.remove('c1')
            carLeftDiv.classList.add('c2')
            break
        case carLeftDiv.classList.contains('c2') :
            carLeftDiv.classList.remove('c2')
            carLeftDiv.classList.add('c3')
            break        
        case carLeftDiv.classList.contains('c3') :
            carLeftDiv.classList.remove('c3')
            carLeftDiv.classList.add('c1')
            break        
    }

}
function moveCarRight(carRightDiv){

    switch(true){
        case carRightDiv.classList.contains('c1') :
            carRightDiv.classList.remove('c1')
            carRightDiv.classList.add('c3')
            break
        case carRightDiv.classList.contains('c2') :
            carRightDiv.classList.remove('c2')
            carRightDiv.classList.add('c1')
            break        
        case carRightDiv.classList.contains('c3') :
            carRightDiv.classList.remove('c3')
            carRightDiv.classList.add('c2')
            break        
    }

}

function lose(){
    if (
        squares[currentIndex].classList.contains('c1') ||
        squares[currentIndex].classList.contains('l4') ||
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ){
        resultDisplay.textContent = 'VOCÊ PERDEU!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}
function win () {
     if ( squares[currentIndex].classList.contains('ending-block')){
        resultDisplay.textContent = 'VOCÊ GANHOU!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)       
        document.removeEventListener('keyup', moveFrog)
     }
 }

 pauseButton.addEventListener('click', () => {
     if(timerId){
         clearInterval(timerId)
         clearInterval(outcomeTimerId)
         timerId = null
         outcomeTimerId = null
         document.removeEventListener('keyup', moveFrog)
     } 
 })
 startButton.addEventListener('click', () => {
    timerId = setInterval(autoMoveElements, 1000)
    outcomeTimerId = setInterval (checkOutComes, 50)
    document.addEventListener('keyup', moveFrog)
})

 function Refresh(){
    window.location.reload();
  }




