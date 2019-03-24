module.exports = function solveSudoku(matrix) {
  recursiveSolve(matrix, 0, 0);
  return matrix;
}

//рекурсивный алгоритм с использованием backtracking
function recursiveSolve(table, x, y) {
  var cell = findUnmark(table, x, y);
  x = cell[0];
  y = cell[1];

  // если нет пустых ячеек, завершить выполнение функции
  if (x == -1) {
    console.log("solved");
    return true;
  }

  for (var num = 1; num <= 9; num++) {

    if (isOk(table, x, y, num)) {
      table[x][y] = num;

      if (recursiveSolve(table, x, y)) {
        return true;
      }

      // пометить ячейку как пустую
      table[x][y] = 0;
    }
  }
  //если есть конфликт выполняем backtracking
  return false;
}


function findUnmark(table, x, y) {
  for (; x < 9; y = 0, x++)
    for (; y < 9; y++)
      if (table[x][y] == 0)
        return [x, y];
  return [-1, -1];
}

function isOk(table, x, y, num) {
  return isRowOk(table, x, num) && isColOk(table, y, num) && isPartOk(table, x, y, num);
}

function isRowOk(table, x, num) {
  for (var y = 0; y < 9; y++)
    if (table[x][y] == num)
      return false;

  return true;
}

function isColOk(table, y, num) {
  for (var x = 0; x < 9; x++)
    if (table[x][y] == num)
      return false;

  return true;
}

function isPartOk(table, x, y, num) {
  x = Math.floor(x / 3) * 3; //округляем до целого
  y = Math.floor(y / 3) * 3;

  for (var q = 0; q < 3; q++)
    for (var z = 0; z < 3; z++)
      if (table[x + q][y + z] == num)
        return false;

  return true;
}