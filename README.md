<b>Calculator App</b> <br>

<img src='mycalciOutput.png'>


<b>Use Cases Covered </b>
1. As a user, I should be able to evaluate an expression using the calculator when the "=" button is clicked.<br>
2. As a user, I should be able to delete a character on the expression using "Back". <br>
3. As a user, I should be able to see an "Invalid Expression" error message on the value field when the expression is malformed. <br>
4. As a user, I should be able to use "+ (add), - (subtract), * (multiply), / (divide), % (modulus)" arithmetic operators to construct the expression. <br>

<b>Functions Used </b>
topScreen(): Draws the outer rectangle of the calculator's top screen. <br>
navigationCircles(): Creates three colored circles in the top-left corner of the calculator. <br>
buttonPanel(): Draws the rectangular area containing buttons.<br>

<b>Buttons </b> br> 
An array named inputButtons defines the buttons, their positions, and colors. <br>
The createButtons() function is used to draw these buttons on the calculator.<br>


<b>Calculator Logic </b><br>
The calculator supports basic arithmetic operations (+, -, *, /, %) and evaluates expressions. <br>
The determineValue(determineNumberArray) function takes an array of symbols and calculates the result. <br>
The createExpression(symbolIdentifiers) function evaluates it. <br>
The showResult(enteredValue) function processes the user's input and displays the result on the screen. <br>


<b>On click event </b><br>
buttonOnClick(event): Handles user interactions when clicking on buttons. It allows users to input numbers and operators and perform calculations. <br>


<b>Instructions to use this app </b> <br>
Open the HTML file in a web browser. <br>
Click on the buttons to input numbers and operators. <br>
Click the "=" button to evaluate the expression and see the result. <br>
Click the "Back" button to delete the last character. <br>
The top screen displays the entered expression and the result. <br>

<b>Insructions to run the App: </b> <br>
1. git clone reporsitory with this link : git@github.com:info-6150-fall-2023/assignment-7-Sanskrutii03.git <br>
2. Open with VS code, navigate to the assignment-7 folder <br>
3. Open calculator.html file in live server <br>

<b>Prepared by</b> : <br>
Sanskruti Manoria <br>
nuid - 002623300 <br>



