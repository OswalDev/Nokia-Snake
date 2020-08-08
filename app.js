document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex=0 //so first div in the grid
    let appleIndex= 0 //so first div in the grid 
    let currentSnake = [2,1,0] //so the div in our gridd being 2(head), 1(body), 0 (tail)
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    //start the game and resets it

    function startGame(){
        //clears everything
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score= 0
        randomApple()
        direction=1
        scoreDisplay.innerText=score
        intervalTime = 1000
        currentSnake= [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes,intervalTime)
    }

    //function that deals with outcomes of the snake
    function moveOutcomes(){
    //deals with snake hitting the wall or self

        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom wall
            (currentSnake[0] % width === width -1 && direction === 1) ||//if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) ||//if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||//if snake hits top wall
            squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
     ) {
         alert('You Lost')
         return clearInterval(interval) //this will clear interval for everything above
     }

     const tail = currentSnake.pop() //remove last item of the array and shows it
     squares[tail].classList.remove('snake') // remove class of snake from tail
     currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head

    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
        squares[currentSnake[0]].classList.add('snake')
    }

    //generates new apple once apple is eaten
    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length)
        }while(squares[appleIndex].classList.contains('snake'))
        
        squares[appleIndex].classList.add('apple')
    
    }


    //assign functions to keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake') //we are moving the class of snake
 
    if(e.keyCode === 39){
        direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
    }else if(e.keyCode === 38){
        direction = -width //if we press the up arrow on our keyboard, the snake will go back 10 divs, appearing to go up
    }else if(e.keyCode === 37){
        direction= -1 //if we press the left arrow on our keyboard, the snake will go left one
    }else if(e.keyCode === 40){
        direction = +width //if we press the down arrow on our keyboard, the snake will go fowards 10 divs, appearing to go down
    }
}

document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)
})