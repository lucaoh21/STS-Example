/* Displays fulls Hello World! message */
function helloWorld() {
  document.getElementById('demo').innerHTML = "Hello World!";
}

/* Flips number between 0 and 1 */
function changeNum() {
  var elem = document.getElementById('demo1');
  if(elem.innerHTML == "0") {
    document.getElementById('demo1').innerHTML = "1";
  } else if(elem.innerHTML == "1"){
    document.getElementById('demo1').innerHTML = "0";
  }
}

/* Hides or shows a message */
function showMessage() {
  var x = document.getElementById('demo3');
  if(x.style.visibility == "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
}

/* Adds two numbers together */
function addition() {
  var num1 = document.getElementById('num1').value;
  var num2 = document.getElementById('num2').value;
  var isNum1 = /^\d+$/.test(num1);
  var isNum2 = /^\d+$/.test(num2);
  if(isNum1 && isNum2){
    var num3 = parseInt(num1) + parseInt(num2);
    document.getElementById('answer').value = num3;
    $("#error").hide();

  } else if(!isNum1 && !isNum2){
    document.getElementById('num1').value = "";
    document.getElementById('num2').value = "";
    $("#error").show();

  } else if(!isNum1){
    document.getElementById('num1').value = "";
    $("#error").show();
  } else {
    document.getElementById('num2').value = "";
    $("#error").show();
  }

}

/* Checks to make sure user input fields are valid*/
function checkFields(fn, ln, ag) {
  var msg;
  var isFN = /^[^0-9]+$/.test(fn);
  var isLN = /^[^0-9]+$/.test(ln)
  var isAG = /^[0-9]+$/.test(ag);
  if(isFN && isLN && isAG) {
    return null;
  }
  else if(!isFN) {
    msg = "first name.";
    document.getElementById('fname').value = "";
  }
  else if(!isLN) {
    msg = "last name.";
    document.getElementById('lname').value = "";
  }
  else if(!isAG) {
    msg = "age.";
    document.getElementById('age').value = "";
  }
  return "Please enter a valid " + msg;
}


/* solves an equation for the user:
*  user can input an equation using keyboard or
*  calculator and solve() will take input and use
*  PEMDAS to return answer
*/
function solve(x){
  console.log("current equation: " + x);
  /* makes sure something entered */
  if(x == "") {
    return "nothing entered";
  }

  /* checks if we're down to one number */
  var sindex = x.search(/^\-?\d+\.?\d*$/);
  if(sindex > -1) {
    console.log("hit base case");
    return x;
  }

  /* searches for parentheses */
  sindex = x.search(/\(.+\)/);
  if(sindex > -1){
    var oldX = parentheses(x, sindex);
    var newX = oldX.slice(1, -1);
    var answer = solve(newX);
    return solve(x.replace(oldX, answer));
  }

  /* checks whether multiplication or division happens first */
  var counter = 0;
  for(var i = 0; i < x.length; i++){
    if(x[i] == "*"){
      counter = 1;
      break;
    } else if(x[i] == "/"){
      break;
    }
  }

  /* searches for exponents */
  sindex = x.search(/\-?\d+\.?\d*\^\-?\d+\.?\d*/);
  if(sindex > -1) {
    var oldX = (x.match(/\-?\d+\.?\d*\^\-?\d+\.?\d*/))[0];
    var ans = exponent(oldX);
    return solve(x.replace(oldX, ans));
  }

  /* searches for multiplication */
  sindex = x.search(/\-?\d+\.?\d*\*\-?\d+\.?\d*/);
  if(sindex > -1 && counter == 1) {
    var oldX = (x.match(/\-?\d+\.?\d*\*\-?\d+\.?\d*/))[0];
    var ans = multiply(oldX);
    return solve(x.replace(oldX, ans));
  }

  /* searches for division */
  sindex = x.search(/\-?\d+\.?\d*\/\-?\d+\.?\d*/);
  if(sindex > -1) {
    var oldX = (x.match(/\-?\d+\.?\d*\/\-?\d+\.?\d*/))[0];
    var ans = divide(oldX);
    return solve(x.replace(oldX, ans));
  }

  /* checks whether addition or subtraction happens first */
  counter = 0;
  for(var i = 0; i < x.length; i++){
    if(x[i] == "+"){
      counter = 1;
      break;
    } else if(x[i] == "-" && /\d/.test(x[i-1])){
      break;
    }
  }

  /* searches for addition */
  sindex = x.search(/\-?\d+\.?\d*\+\-?\d+\.?\d*/);
  if(sindex > -1 && counter == 1) {
    var oldX = (x.match(/\-?\d+\.?\d*\+\-?\d+\.?\d*/))[0];
    var ans = add(oldX);
    return solve(x.replace(oldX, ans));
  }

  /* searches for subtraction */
  sindex = x.search(/\-?\d+\.?\d*\-\-?\d+\.?\d*/);
  if(sindex > -1) {
    var oldX = (x.match(/\-?\d+\.?\d*\-\-?\d+\.?\d*/))[0];
    var ans = subtract(oldX);
    return solve(x.replace(oldX, ans));
  }

  /* the inputted equation has an error */
  $("#error2").show();
  return "error";
}

/* called if parentheses in equation */
function parentheses(x, sindex) {
  var findex;
  var bracket = 1;

  /* searches for index of closing bracket */
  for(var i = sindex + 1; i < x.length; i++){
    if(x[i] == "("){
      bracket ++;
    } else if(x[i] == ")"){
      bracket --;
    }
    if(bracket == 0){
      findex = i;
      break;
    }
  }
  return x.slice(sindex, findex+1);
}

/* called if exponent is in equation */
function exponent(oldX) {
  var a = parseFloat((oldX.match(/^\-?\d+\.?\d*/))[0]);
  var b = parseFloat((oldX.match(/\-?\d+\.?\d*$/))[0]);
  var c = Math.pow(a, b);
  return c;
}

/* called if multiplication in equation */
function multiply(oldX) {
  var a = parseFloat((oldX.match(/^\-?\d+\.?\d*/))[0]);
  var b = parseFloat((oldX.match(/\-?\d+\.?\d*$/))[0]);
  var c = a * b;
  return c;
}

/* called if division in equation */
function divide(oldX) {
  var a = parseFloat((oldX.match(/^\-?\d+\.?\d*/))[0]);
  var b = parseFloat((oldX.match(/\-?\d+\.?\d*$/))[0]);
  var c = a / b;
  return c;
}

/* called if addition in equation */
function add(oldX) {
  var a = parseFloat((oldX.match(/^\-?\d+\.?\d*/))[0]);
  var b = parseFloat((oldX.match(/\-?\d+\.?\d*$/))[0]);
  var c = a + b;
  return c;
}

/* called if subtraction in equation */
function subtract(oldX) {
  var a = parseFloat((oldX.match(/^\-?\d+\.?\d*/))[0]);
  var temp = (oldX.match(/\-\-?\d+\.?\d*$/))[0];
  temp = temp.slice(1);
  var b = parseFloat(temp);
  var c = a - b;
  return c;
}

/* checks if input is a palindrome */
function palindrome(x) {
  x = x.toLowerCase().replace(/ /g, "");
  var arr = x.split("");
  var y = (arr.reverse()).toString();
  y = y.replace(/\,/g, "")
  if(!x.localeCompare(y)){
    return " is a palindrome!";
  }
  return " is not a palindrome."

}

/* function linked to sudoku grid
 * solves the puzzle and returns answer */
 function sudoku() {
   var board = checkPuzzle(0);

   console.log("the puzzle is: " + board);

   if(board == null){
     document.getElementById('sudError1').innerHTML = "This puzzle is not solvable."
     $("#sudError").show();
   }

/*
   var board = new Array(9);
   for(var i = 0; i < 9; i++){
     board[i] = new Array (9);
   }

   parser(board);*/
   sudokuSolve(board);
   filler(board);

 }

/* gets values from user table and stores in board array */
 function parser(board) {
   for(var i = 0; i < 9; i++){
     for(var j = 0; j < 9; j++){
       board[j][i] = parseInt(document.getElementById(j.toString() + i.toString()).value);
       if(!board[j][i]){
         board[j][i] = 0;
       }
     }
   }
 }

/* fills the user table with the elements from the board */
 function filler(board){
   for(var i = 0; i < 9; i++){
     for(var j = 0; j < 9; j++){
       document.getElementById(j.toString() + i.toString()).value = board[j][i];
     }
   }
 }

/* recursive function which determines sudoku solution */
 function sudokuSolve(board) {
   //filler(board);
   for(var i = 0; i < 9; i++){
     for(var j = 0; j < 9; j++){
       if(board[j][i] == 0){
         for(var k = 1; k <= 9; k++){
           board[j][i] = k;

           if(isValid(board, i, j) && sudokuSolve(board)){
             return true;
           }

         }
         board[j][i] = 0;
         return false;
       }
     }
   }
   return true;
 }

/* tests if requirements of sudoku are met */
 function isValid(board, i, j) {
   if(isRow(board, i) && isCol(board, j) && isBox(board, j, i)){
     return true;
   }
   return false;
 }

/* checks if row requirement is met */
 function isRow(board, j){
   for(var i = 0; i < 9; i++) {
			for(var k = i + 1; k < 9; k++) {
				if(board[i][j] != 0 && board[i][j] == board[k][j]) {
					return false;
				}
			}
		}
		return true;
 }

/* checks if col requirement is met */
 function isCol(board, i){
   for(var j = 0; j < 9; j++) {
			for(var k = j + 1; k < 9; k++) {
				if(board[i][j] != 0 && board[i][j] == board[i][k]) {
					return false;
				}
			}
		}
		return true;
 }

/* checks if box requirement is met */
function isBox(board, i, j){
  var row = Math.trunc(i / 3) * 3;
	var col = Math.trunc(j / 3) * 3;
	for(var a = row; a < row + 3; a++) {
		for(var b = col; b < col + 3; b++) {
			if(board[i][j] != 0 && board[a][b] == board[i][j] && (i != a && j != b)) {
				return false;
			}
		}
	}
	return true;
}

/* user can choose and upload sudoku file into browser */
function loadBoard(files){
  var file = files[0];
  var reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function(e) {
    var data = e.target.result;

    var counter = 0;
    for(var i = 0; i < 9; i++){
      for(var j = 0; j < 9; j++){
        while(/[^0-9]/.test(data[counter])){
          counter ++;
        }
        if(data[counter] != "0"){
              document.getElementById(j.toString() + i.toString()).value = data[counter];
        }
        counter ++;
      }
    }
  };
}

/* once user has filled out the sudoku table, this tests
 * to make sure the input is correct */
function checkPuzzle(finalCheck){
  document.getElementById('sudError1').innerHTML = "This puzzle is incorrect."

  var board = new Array(9);
  for(var i = 0; i < 9; i++){
    board[i] = new Array (9);
  }

  parser(board);

  /* checks the three requirements of sudoku boards */
  for(var i = 0; i < 9; i++){
    for(var j = 0; j < 9; j++){
      if(/[^1-9]/.test(board[j][i]) && finalCheck == 1){
        $("#sudError").show();
        $("#sudSuccess").hide();
        return null;
      }
      else if(!isValid(board, i, j)){
        $("#sudError").show();
        $("#sudSuccess").hide();
        return null;
      }
    }
  }
  if(finalCheck){
    $("#sudError").hide();
    $("#sudSuccess").show();
  }
  return board;
}

/* this clears out the puzzle table to be reused */
function clearPuzzle(){
  var board = new Array(9);
  for(var i = 0; i < 9; i++){
    board[i] = new Array (9);
    for(var j = 0; j < 9; j++){
      board[i][j] = "";
    }
  }
  filler(board);
  $("#sudError").hide();
  $("#sudSuccess").hide();
}


/* ----------------------------------------------------------
*  ---------------------------------------------------------- */

/* waits for page to be loaded */
$(document).ready(function(){
  $("#clearbtn").click(function(){
    document.getElementById('mathInput').value = "";
    document.getElementById('mathAns').value = "";
  })

  /* addition example */
  $(".custombtns").click(function(){
    var input = this.innerHTML;
    document.getElementById('mathInput').value += input;

  })

  /* Adds a row to the table */
  $("#setRow").click(function(){
    var fn = document.getElementById('fname').value;
    var ln = document.getElementById('lname').value;
    var ag = document.getElementById('age').value;
    var msg = checkFields(fn, ln, ag);

    if(msg == null){
      var x = "<tr><td>" + fn + "</td><td>" + ln + "</td><td>" + ag + "</td></tr>";
      $("#tab").append(x);
      document.getElementById('fname').value = "";
      document.getElementById('lname').value = "";
      document.getElementById('age').value = "";
      $("#error1").hide();
    } else{
      document.getElementById('fieldError').innerHTML = msg;
      $("#error1").show();
    }

  });

  /* Solves user inputted equation */
  $("#solvebtn, #equalbtn").click(function(){
    var x = document.getElementById('mathInput').value;
    var y = x.replace(/\s+/, "");
    x = solve(y);
    document.getElementById('mathAns').value = x;

  })

  /* determines if user inputted a palindrome */
  $("#palibtn").click(function(){
    var x = document.getElementById('pali').value;
    var y = palindrome(x);
    document.getElementById('palians').innerHTML = x + y;
    document.getElementById('pali').value = "";
  })

  /* determines if user inputted a palindrome */
  $("#sudbtn").click(function(){
    $("#sudError").hide();
    $("#sudSuccess").hide();
    sudoku();
  })

  $("#sudCheck").click(function(){
    checkPuzzle(1);
  })

  $("#sudClear").click(function(){
    clearPuzzle();
  })

});
