document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  // Adicionando o grid
  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoredisplay = document.querySelector('#score')
  const startbutton = document.querySelector('#startbutton')
  const width = 10

  //  Adicionando os tetraminoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0
  // Selecionar um tetraminó aleatório
  let randomNumber = Math.floor(Math.random()*tetrominoes.length)
  let current = tetrominoes[randomNumber][0]

  // desenhando o tetraminó

  function draw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino')
    })
  }

  // apagando o tetraminó

  function undraw () {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino')
    })
  }

  // funções para keycode

  function control (e) {

    if (e.keyCode === 37) {
      moveLeft()
    }
    else if (e.keyCode === 38) {
      rotate()
    }
    else if (e.keyCode === 39) {

      moveRight()
    }
    else if (e.keyCode === 40) {
      moveDown()
    }
  }
  document.addEventListener('keyup', control)


  // movendo o tetraminó para baixo a cada 1 segundo
  timerId = setInterval(moveDown, 1000)
  function moveDown () {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  // função auxiliar para iniciar um novo tetraminó
  random = Math.floor(Math.random() * tetrominoes.length)
  current = tetrominoes[random][currentRotation]

  function startAgain () {
    random = Math.floor(Math.random() * tetrominoes.length)
    current = tetrominoes[random][currentRotation]
    currentPosition = 4
    draw()
  }

  // função de congelar o tetraminó

  function freeze () {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      startAgain()
    }
  }

  // mover o tetraminó para a esquerda, até o limite do grid

  function moveLeft () {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    if (!isAtLeftEdge) { currentPosition -= 1 }

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()
  }

  // mover o tetraminó para a direita, até o limite do grid
  function moveRight () {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if (!isAtRightEdge) currentPosition += 1
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -= 1
    }
    draw()
  }

  //  função para rotacionar o tretaminó, se chegar ao limite de possibilidades, volta para a primeira
  function rotate() {
    undraw()
    currentRotation++
    if (currentRotation === current.length) {
      currentRotation = 0
    }
    current = tetrominoes[random][currentRotation]
    draw()
  }
})
