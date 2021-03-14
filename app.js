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

  // movendo o tetraminó para baixo a cada 1 segundo
  timerId = setInterval(moveDown, 1000)
  function moveDown () {
    undraw()
    currentPosition += width
    draw()
    freeze()
  }

  // função auxiliar para iniciar um novo tetraminó

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
    if (!isAtLeftEdge) currentPosition -= 1

    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition += 1
    }
    draw()

  }
})
