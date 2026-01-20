What is JavaScript ?
JavaScript is a high-level, interpreted programming language that allows you to make web pages
 interactive and dynamic. 
 Alongside HTML and CSS, it is one of the core technologies of web development.
	• HTML → Builds the structure of a webpage (headings, paragraphs, buttons).
	• CSS → Adds style and design (colors, fonts, layouts).
	• JavaScript → Adds behavior and interactivity (clicks, animations, live updates).
Who Created JavaScript?
	• Originally named Mocha, then LiveScript, and finally renamed to JavaScript.
	• Amazingly, the first version was developed in just 10 days.
	• Today, JavaScript is maintained by ECMA International under the standard ECMAScript (ES).
Latest versions (ES6 and beyond) introduced features like let, const, arrow functions, promises, and classes — making JavaScript more powerful and modern.
Why Use JavaScript?
JavaScript is used everywhere — from simple web pages to large-scale applications.
Here’s what you can do with it:
	1. Interactive Web Pages – Respond to user actions like clicks, hover, or form submissions.
	2. DOM Manipulation – Dynamically change HTML content or CSS styles.
	3. Web Applications – Build apps like Gmail, Facebook, or e-commerce websites.
	4. Server-Side Development – Use Node.js for backend tasks like APIs and databases.
	5. Games and Animations – Create browser games and animations.
Event Handling – React to keyboard, mouse, or page events.

Javascript keywords &  reserved words
break, continue, if else, throw
void , class , for , try , cons, let , var 

identifiers : names you are giving to a variable ,
             function , classes etc.

const  - fixed value

student = []

variable names use camelCase, for eg rollNo
to declare the variable we can either let or var
 
 generally we prefer to use let keyword to declare a variable

 let var1  =10;
 const pi = 3.14;


 a company wants to automate monthly salary calculation for employees based on their working days, basic pay and bonus
 . create a script file to 
 a) calculate gross salary
 b) apply tax deduction 
 c) display employee net salary 
 
 
 
 
 __________________________________________________________
 
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
   <h1> A java script program </h1>
   <script src="app.js">
    // alert("Hello", "Everyone"); //it's a built in function
    // console.log(3+5);
   </script>
   
   <script>

   //  var keyword -- belongs to a global scope when you define outside the function
     
    function counter1()
    {

        let counter = 10;
        
    }
    let counter =30;
    

    // var keyword allows you to redeclare a variable 

    //let keyword won't allow you to redeclare a block scoped variable 
   </script>

</body>
</html>


-------------------2.-------------------------

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
   <button type="button" class="btn btn-primary"  onclick="validateForm(userName , age , isSubscribed)" >Click Here</button>
    <button type="button" class="btn btn-danger"  onclick="showMessage()" >Click Here</button>
   <script>

    let userName = prompt("Enter user name");
    let age = prompt("Enter your age")
    let isSubscribed = "true";

    document.writeln("Your Name is : " + userName );
    document.writeln("Your Age is : " + + age );
function validateForm(userName , age , isSubscribed)
{

       let userNameType = typeof userName;
    let ageType = typeof age;
    let isSubscribedType = typeof isSubscribed;

    console.log("User Name : " + userName + "Data type :" + userNameType);
    console.log("Age : " + age + "Data type :" + ageType);
    console.log("isSubscribe : " + isSubscribed + "Data type :" + isSubscribedType);

    //conversion
    age = Number(age);
    isSubscribed = isSubscribed ==="true";

      console.log("User Name : " + userName + "Data type :" + userNameType);
    console.log("Age : " + age + "Data type :" + typeof age);
    console.log("isSubscribe : " + isSubscribed + "Data type :" + typeof isSubscribed);

}

function showMessage()
{
alert ("The event has occured");

}
const user ={
    role: "admin"
}
if(user.role === "admin" && isSubscribed === "true")
{
    let accessLevel = "Full Control"
    console.log("The access level is :" , accessLevel);
}



   </script>
</body>
</html>


------------------------3.---------------------

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1 id="welcome">Hello UserName !</h1>

    <button id ="changeText" > Change the HTML Content</button>
    <script>

            const button = document.getElementById("changeText");

            button.addEventListener("click" ,function()
            {
                    document.getElementById("welcome").innerHTML = " we have changed the Text";
            } );
    </script>

    <!-- DOM -- Document Object Model --  which is used to change the html data dynamically
       getElementById() == used to access the html elements by ID 
       innerHTML  ==  to update the page dynamically without refreshing 
       addEventListener == will wait for a click event 
    -->

    <script>

let day = prompt("Enter the value as  a day name : ")
switch(day)
{
case "Monday" : console.log("Today is :" ,day) ; break;
case "Tuesday" : console.log("Today is :" ,day) ; break;
case "Wednesday" : console.log("Today is :" ,day) ; break;

}
    </script>
</body>
</html>



--------------------------------4----------------------------


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
    <script>

        let student = {}; // It will create an empty object   

        let person={

            firstName : "Niti",
            lastName : " Dwivedi"
        }                                // These are attributes of a Person class object 

        person.firstName = "Jatin"
        person.lastName = " Mehta"

        person.age =78;  // Adding a new attribute to a person class object

        console.log('age' in person);
        console.log("Niti" in person);

        delete person.age;

        console.log(person); // to print the entire object details

        let address = ["tilak nagar" , "delhi"];
        const colorCodes = [4,6,7,4];
        const mixedArray = ["hello" ,45454 , true , {address:"New Delhi"}]; 

        console.log(address[0]);
        console.log(address);

    </script>
</body>
</html>