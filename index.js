//import express.js
//import body-parser to handle parameters more easily
import bodyParser from 'body-parser';
import express, { response } from 'express';

//This variable defines the port of your computer where your the API will be available 

const PORT = 3000;

//this variable instatiates the Express.js library

const app = express();

//The following code starts the API parameters:
//1- The PORT where your API will be available
//2-The call back function i.e the function to call whenever your API is ready.

//To fill the function we need to receive the parameters by using "body-parser"
//Body parser is a new npm package that receives the parameter og the app.post parameters efficienlty.
//install body-parser in the terminal
//After installation of the npm body parser package, we need to import it to indicate to express that we are using it
//At the beginning of our file we will go back there and import the body parser package

app.use(bodyParser.urlencoded({extended:true}))

app.listen(PORT, () =>
    console.log(`The Books API is running On: http://localhost:${PORT}.`)
)

//CREATE YOUR FIRST ROUTE
//The code bellow creates a GET ROUTE with these parameter!
//The route where the code will be executed 
//The function containing the code to be executed!

app.get('/', (request, response) => {
    //The string we want to display on http://localhost:3000
    response.send (`Welcome on the books API! Take a breath and start using it!`)
});

//To create a Route to GET all books
//HINTS:
//Route name: '/books'
//Variable: String list
//Return: JSON(The answer format used by almost every APIs)
//API Method: GET, because we want to get all books

let bookList = [
    'Make Time: How to Focus on what Matters Every Day',
  'The Power Of Habit',
]
//Replace the route name

app.get('/books', (request, response) => {

    //The function will return your bookList in a JSON
     // Sample: { allBooks: ["Make Time: How to Focus on what Matters Every Day", "The Power Of Habit"]}
    return response.json({ allBooks: bookList })
});

//5CREATE A ROUTE TO ADD A BOOK
//We have a route to get all books , but how can we do if we want to add one book to it?
//In the API world, the GET POST method is used to add date to.

//What we want to do here is the following:
//Send a book name to the API
//Treat the new book
//Send a result (true or false) 


//1-we now replace the app.get method by app.post
//REMINDER: app.post method in API world is used to add a date 

// app.post('/books', (request, response) =>{
//     //TODO: Fill the function
//     response.json({success:false})
// })

//To fill the function we need to receive the parameters by using "body-parser"
//Body parser is a new npm package that receives the parameter og the app.post parameters efficienlty.
//install body-parser in the terminal
//After installation of the npm body parser package, we need to import it to indicate to express that we are using it
//At the beginning of our file we will go back there and import the body parser package

// app.use(bodyParser.urlencoded({extended:true}))

//now back to our new route

//The first function request will be useful to access the body of the request. hence we can do the folowing to get a parameter
//request.body.parametername...which in this case we use 'name'

app.post('/books', (request, response) => {
    const bookName = request.body.bookName
    //Now we check if the booklist includes the new book
    //if it is, we return 'false'
     //else/otherwise, we add the new book (bookName) to the bookList and retrun 'true'

    if(bookList.includes(bookName)) return response.json({success:false})
   
    bookList.push(bookName) 
    return response.json({success: true})
   
})

//CREATE A BOOK TO DELETE A BOOK
//The process to create a GET and POST METHOD are always the same.
//To create a DELETE Method on books, we will have one name parameter 
//The goal of our function will be to delete a book if it's on the list

app.delete('/books', (request, response) =>{
    //we get the parameter 'name' from the body

    const bookToDelete = request.body.name
    //lets create an array with all the elements different from the book we want to delete.

    bookList = bookList.filter((book) => book !== bookToDelete)

        //we return the new list

        return response.json({ allBooks: bookList })
})

//7-TO CREATE A ROUTE TO UPDATE A BOOK
//The PUT Method allows your to update a data in an API

app.put('/books', (request, response) => {
    //Now we get the parameters 'nameToUpdate' and 'updatedName' from the body

    const bookToUpdate = request.body.nameToUpdate;
    const updatedBook = request.body.updatedName;

    //Now we search if the book to update is in the list

    const indexOfBookToUpdate = bookList.findIndexOf( (book) => book === bookToUpdate)

    //We check if it's not a book from the list, we return 'false'

    if(indexOfBookToUpdate === -1)
    return response.json({ success: false})

    //otherwise we replace the name and return 'true'

    bookList[indexOfBookToUpdate] = updatedBook
   return response.json({success: true})
})