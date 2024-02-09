//fetching canvas html tag to work on it
const canvas = document.getElementById('calculator');
const ctx = canvas.getContext('2d');

//Setting full dimensions to canvas area
canvas.width = innerWidth;    
canvas.height = innerHeight;   


//ctx.fillRect(x,y,w,h); Make a rectangle filled with a color
//color the rectangle

//ctx.strokeRect(x,y,w,h); Makes an outline of the rectangle
//ctx.strokeStyle="red" ; Changes the color of outline to red
//ctx.clearRect(x,y,w,h);


// Same rectangle drawn backwards curves - references mdn docs
// ctx.strokeStyle = "magenta";
// ctx.beginPath();
// ctx.roundRect(400, 150, -200, 100, [0, 30, 50, 60]);
// ctx.stroke();


//---------------------------------------------------------------UI of calci-----------------------------------------------------------

//to create outer rectangle of calci
topScreen = () => {
  ctx.beginPath();
  ctx.fillStyle = '#484848';
  ctx.strokeStyle  = '#939596';
  ctx.roundRect(20, 20, 400, 150, [20,20,0,0]);
  ctx.fill();
  ctx.stroke();
}

//to create three circles in top left of recatngle
navigationCircles = () => {
    ctx.beginPath();
    ctx.arc(40, 35, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(65, 35, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(90, 35, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    }

//to create button area rectangle
buttonPanel = () => {
  ctx.beginPath();
  ctx.fillStyle = '#939596';
  ctx.fillStroke = '#939596';
  ctx.roundRect(20, 170, 400, 400, [0,0,20,20]); //x cordinate and curve same as top container
  ctx.fill();
  ctx.stroke();
}


// Now inside input container, there are 5 rows of cells > rectangular buttons with text of numbers and operators
const inputButtons = [
{ text:'', x:20, y: 170, color: '#5F6067'},
{ text:'', x:100, y: 170, color: '#5F6067'},
{ text:'', x:180, y: 170, color: '#5F6067'},
{ text:'%', x:260, y:170, color: '#5F6067'},
{ text:'/', x:340, y:170, color: 'orange'},

{ text:'(', x:20, y:250, color: '#939596'},
{ text:'7', x:100, y:250, color: '#939596'},
{ text:'8', x:180, y:250, color: '#939596'},
{ text:'9', x:260, y:250, color: '#939596'},
{ text:'X', x:340, y:250, color: 'orange'},

{ text:')', x:20, y:330, color: '#939596' },
{ text:'4', x:100, y:330, color: '#939596'},
{ text:'5', x:180, y:330, color: '#939596'},
{ text:'6', x:260, y:330, color: '#939596'},
{ text:'-', x:340, y:330, color: 'orange' },

{ text:'Back', x:20, y:410, color: '#939596'},
{ text:'1', x:100, y: 410, color: '#939596'},
{ text:'2', x:180, y: 410, color: '#939596' },
{ text:'3', x:260, y: 410, color: '#939596'},
{ text:'+', x:340, y: 410, color: 'orange' },

{ text:'0', x:20, y: 490, color: '#939596' },
{ text:'.', x:260, y: 490, color: '#939596'},
{ text:'=', x:340, y: 490, color: 'orange' },
];


// to print the rectangular buttons
createButtons = () => {
  //for loop for each cell (button value, create the button with mentnioned properties)
  inputButtons.forEach((cell) => {
      ctx.fillStyle = cell.color;
      ctx.strokeStyle = '#484848'
  
      if (cell.text == '0') { //if button =0
        ctx.beginPath();
        ctx.roundRect(cell.x, cell.y, 240, 80, [0,0,0,20]);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '23px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cell.text, cell.x + 120, cell.y + 40);
      }
      else if (cell.text == '=') { //if button = '='
        ctx.beginPath();
        ctx.roundRect(cell.x, cell.y, 80, 80, [0,0,20,0]);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '23px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cell.text, cell.x + 40, cell.y + 40);
      }
      else { //remaining button because they are of same size
        ctx.beginPath();  
        ctx.roundRect(cell.x, cell.y, 80, 80, 0);
        ctx.stroke();
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '23px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cell.text, cell.x + 40, cell.y + 40);

      }
  });
}




//-----------------------------------------------------------JS functioning--------------------------------------------------------------




let enteredValue = ''; 
let resultValue = ''; 
const operatorNumbering  = {"+": 1,"-": 1,"*": 2,"/": 2,"%": 2,}; 
const operatorsArray = ['+', '-', '*', '/', '%']; 

 //to display the expression 
 displayExpression = (x,y) => {
  ctx.clearRect(20, 20, 400, 150);
  topScreen();
  navigationCircles();
  ctx.fillStyle = 'white';
  ctx.textAlign = 'right';
  ctx.fillText(enteredValue, 400, 60);
  ctx.fillText(resultValue, 400, 100);
}




// As a user, I should be able to use "+ (add), - (subtract), * (multiply), / (divide), % (modulus)" arithmetic operators to construct the expression.
// As a user, I should be able to see an "Invalid Expression" error message on the value field when the expression is malformed.

determineValue = (determineNumberArray) => {
  // for loop to check if its and number, if yes then add to the number array
    let numberArray = [];
    for (let i = 0; i < determineNumberArray.length; i++) {
      let symbolIdentifier = determineNumberArray[i];
      if (typeof symbolIdentifier === "number") { //if number then add to array
        numberArray.push(symbolIdentifier);
        
      } else if (symbolIdentifier === "+") {  //if operator, pop out and caluclate
        let b = numberArray.pop();
        let a = numberArray.pop();
        if (a== null || b==null) {
           return 'Invalid expression'
        }
        else if (!operatorsArray.includes(a) || !operatorsArray.includes(b)) {
          numberArray.push(a + b);
        }
        else {return 'Invalid expression'}
        
      } else if (symbolIdentifier === "-") { //if operator, pop out and caluclate it
        let b = numberArray.pop();
        let a = numberArray.pop();
        if (!operatorsArray.includes(a) || !operatorsArray.includes(b)) {
          numberArray.push(a - b);
        }
        else {return 'Invalid expression'}
         
      } else if (symbolIdentifier === "*") { //if operator, pop out and caluclate 
        let b = numberArray.pop();
        let a = numberArray.pop();
        if (a== null || b==null) {
          return 'Invalid expression'
       }
       else if (!operatorsArray.includes(a) || !operatorsArray.includes(b)) {
        numberArray.push((a * b));
          
        }
        else {return 'Invalid expression'}
         
      } else if (symbolIdentifier === "/") { //if operator , pop out and caluclate
        let b = numberArray.pop();
        let a = numberArray.pop();
        if (a== null || b==null) {
          return 'Invalid expression'
       }
       else if (!operatorsArray.includes(a) || !operatorsArray.includes(b)) {
        numberArray.push(parseFloat((a / b).toFixed(2)));
        }
        else {return 'Invalid expression'}
      }
      
      else if (symbolIdentifier === "%") {  //if operator, pop out and calculate
        let b = numberArray.pop();
        let a = numberArray.pop();
        if (a== null || b==null) {
          return 'Invalid expression'
       }
       else if (!operatorsArray.includes(a) || !operatorsArray.includes(b)) {
        numberArray.push(a%b);
        }
        else {return 'Invalid expression'}
      }
      else {
        return 'Invalid expression'
      }
    }
    
    let value = numberArray.pop();
    return value; // the final value
  }


  createExpression = (symbolIdentifiers) => {

      let determineNumberArray = [];
      let operatorArray = [];
      let symbolIdentifier =  [];

      for (let i = 0; i < symbolIdentifiers.length; i++) {
        symbolIdentifier = symbolIdentifiers[i];
        
        // If the symbolIdentifier is a number then add to array
        if (/^(\d+\.?\d+)|\d+$/.test(symbolIdentifier)) {
          determineNumberArray.push(parseFloat(symbolIdentifier));
        }
        // If symbolIdentifier is an operator, add to the array
        else if (symbolIdentifier in operatorNumbering) {
          while (
            operatorArray.length > 0 &&
            operatorArray[operatorArray.length - 1] in operatorNumbering &&
            operatorNumbering[operatorArray[operatorArray.length - 1]] >= operatorNumbering[symbolIdentifier]
          ) {
          determineNumberArray.push(operatorArray.pop());
          }
        operatorArray.push(symbolIdentifier);
        }
        // If the symbolIdentifier is a (), add to the array
        else if (symbolIdentifier === "(") {
          operatorArray.push(symbolIdentifier);
        }
        // If the symbolIdentifier is paranthesis, then add to array 
        else if (symbolIdentifier === ")") {
          while (operatorArray.length > 0 && operatorArray[operatorArray.length - 1] !== "(") {
            determineNumberArray.push(operatorArray.pop());
          }
          if (operatorArray.length === 0) {
            return "Invalid expression";
          }
          operatorArray.pop(); //remove parenthesis
        }
        else {
          return "Invalid expression";
      }
    }


    // remove extra operators. push to array
      while (operatorArray.length > 0) {
        if (operatorArray[operatorArray.length - 1] === "(") {
          return "Invalid expression";
        }
        determineNumberArray.push(operatorArray.pop());
      }
      let returnValue = determineValue(determineNumberArray);
      return returnValue;
  }
  



 

//As a user, I should be able to evaluate an expression using the calculator when the "=" button is clicked.
showResult = (enteredValue) => {
  let symbolIdentifiers = enteredValue.match(/(\d+\.?\d+)|\d+|[+\-*/()%]/g);
  console.log(symbolIdentifiers);
  resultValue = createExpression(symbolIdentifiers);
  return resultValue;

  }

//As a user, I should be able to delete a character on the expression using "Back".
// delete a character
deleteCharacter = (enteredValue) => {
  enteredValue = enteredValue.substring(0, enteredValue.length-1);
  return enteredValue;
  }




//on click event
buttonOnClick = (event) => {
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;
    inputButtons.forEach((button) => {
      if (button.text == '0' && 
      x >= button.x && 
      x <= button.x + 240 && 
      y >= button.y && 
      y <= button.y + 80){
        enteredValue = enteredValue + button.text;
        resultValue = '';
      }
      else if (x >= button.x && 
        x <= button.x + 80 && 
        y >= button.y && 
        y <= button.y + 80){
        if (button.text == 'X') {
            enteredValue = enteredValue + '*';
            resultValue = '';
        }
        //As a user, I should be able to delete a character on the expression using "Back".
        else if (button.text == 'Back') {
          enteredValue= deleteCharacter(enteredValue);
          resultValue = '';
        }
        //As a user, I should be able to evaluate an expression using the calculator when the "=" button is clicked.
        else if (button.text == '=') {
            resultValue = showResult(enteredValue);
        }
        else {
            enteredValue = enteredValue + button.text;
            resultValue = '';
        }
      }
      displayExpression (x,y); 
    });
  }
  

  
  //-----------------------------------------------------------function calling------------------------------------------------
  
  topScreen();
  navigationCircles();
  buttonPanel();
  createButtons();
  canvas.addEventListener('click', buttonOnClick);

                                                               


 
