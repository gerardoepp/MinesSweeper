/**
 * Created by gpuche on 6/7/17.
 */
let fs = require('fs')

function readFile (file, encode) {
  let board = []
  let input = fs.readFileSync(file, encode).toString().split("\n");
  for (let i of input) {
    board.push(i.split(""))
  }
  let formatedBoard = mineSwiper(board).join("\n").replace(/,/g, ' ')
  console.log(formatedBoard +"\n")
}

function mineSwiper (board, opts = {}) {
  opts = Object.assign({
    mineChar: '*'
  }, opts)

  return board.map((row, x) => {
    return row.map((item, y) => {
      let mineCount = mineCounter(board, x, y, opts.mineChar)
      if (mineCount >= 0) return mineCount.toString()
      return opts.mineChar
    })
  })
}

function mineCounter (board, x, y, mineChar = '*') {
  let ady = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1]
  ]
  let c = board[x][y]
  let count = 0
  if (c !== mineChar) {
    for (let i = 0; i < ady.length; i++) {
      let dx = ady[i][0]
      let dy = ady[i][1]
      let x2 = x + dx
      let y2 = y + dy
      if (x2 < 0 || y2 < 0) continue
      if (x2 >= board.length || y2 >= board[0].length) continue
      let item = board[x2][y2]
      if (item == mineChar) count++
    }
    return count
  }
  return -1
}
readFile('input.txt', 'utf8')
readFile('input2.txt', 'utf8')