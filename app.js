const board = document.getElementById('board')
const start = document.getElementById('start')

let rowNum = 0

for(let i = 0; i < 100; i++){
  const cell = document.createElement('div')
  if(i % 10 === 0){
    rowNum++
  }

  cell.style.width = '50px'
  cell.style.height = '50px'
  cell.style.border = '#cccccc 1px solid'
  // cell.innerText = i
  cell.id = i
  cell.classList.add('cell')
  cell.classList.add(`row-${rowNum}`)
  cell.style.color = 'white'

  board.appendChild(cell)
}

let rowLevel;
const playRow = (rowNum, count, interval) => {
  const row = document.getElementsByClassName(`row-${rowNum}`)
  const rowArr =  Array.from(row)
  let platStart = 0
  let platEnd = count
  let forward = true

  rowLevel = setInterval(() => {
      rowArr.forEach((r) => r.classList.remove('Active'))
      const platform = rowArr.slice(platStart,platEnd)
      platform.forEach((r) => r.classList.add('Active'))

      if(platEnd >= row.length){
          forward = false
      } else if(platStart <= 0){
          forward = true
      }
     if(forward){
          platStart++
          platEnd++
      } else {
          platStart--
          platEnd--
      }
  }, interval)
}


const startGame = () => {
  let levelNum = 10
  let blockCount = 4
  let speed = 600

  playRow(levelNum, blockCount, speed)

  document.addEventListener('keydown', (e) =>{
      if(e.key === ' ' || e.keyCode === 32){
          e.preventDefault()

          clearInterval(rowLevel)

          const checkRow = () => {
              if(levelNum < 10){
                  const rowDom = document.getElementsByClassName(`row-${levelNum}`)
                  const rowVal = Array.from(rowDom)

                  const lastRowDom = document.getElementsByClassName(`row-${levelNum + 1}`)
                  const lastRowVal = Array.from(lastRowDom)

                  for(let i = 0; i < rowVal.length; i++){
                      let cellVal = rowVal[i].attributes?.class?.value.includes('Active')
                      let lastCellVal = lastRowVal[i].attributes?.class?.value.includes('Active')
                      // console.log(`column: ${cellVal}, lastColumn: ${lastCellVal}`, cellVal !== lastCellVal)
                      if(cellVal && !lastCellVal){
                          rowVal[i].classList.remove('Active')
                          blockCount--
                      }
                  }
              }
          }

          if(levelNum > 0){
            checkRow()
              levelNum--

              speed -= 100
              if(speed <= 100){
                speed = 100
              }
              if(levelNum < 3){
                speed = 50
              }
          }
          if(levelNum < 8 && blockCount > 2){
            blockCount = 2
          }
          if (levelNum < 4 && blockCount > 1){
            blockCount = 1
          }

          if(blockCount === 0){
            display('frown')
            // window.location.reload()
          } else if (levelNum === 0){
            // window.alert("Winner!!")
            display('smile')
          }
          else {
              playRow(levelNum, blockCount, speed)
          }
      }
  })

}

const display = (face) => {
  let msgArray
  let color = 'darkred'
    if(face === 'smile'){
        msgArray = [12,13,22,23, 16,26,17,27, 41,52,63,64,65,66,57,48]
        color = 'green'
      document.getElementById('msg').innerText = "🏆 WINNER 🎉"
    }
    if(face === 'frown'){
        msgArray = [12,13,22,23, 16,26,17,27, 61,52,43,44,45,46,57,68]
        color = 'yellow'
      document.getElementById('msg').innerText = "👎 LOSER 😞"
    }
    const cell = document.getElementsByClassName('cell')
    cellArr = Array.from(cell)
    cellArr.forEach((c) => c.classList.remove('Active'))
    msgArray.forEach((c) => {
        cellArr[c].style.background = color
    })

}

const idlecellArr = Array.from(document.getElementsByClassName('cell'))
const randomCellInterval = setInterval(() => {
  const cellPicked = Math.floor(Math.random() * 100)
  const randomColor = `${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)} ${Math.floor(Math.random() * 255)}`
  idlecellArr.forEach((c) => c.style.background = 'none')
  idlecellArr[cellPicked].style.background = `rgb(${randomColor})`
}, 400)

start.addEventListener('click', () => {
  start.disabled = true
  clearInterval(randomCellInterval)
  Array.from(document.getElementsByClassName('cell')).forEach((c) => c.style.background = '')
  startGame()
})

