# book-record-management-10567

This is a book record managemnt API Backend for the management of records and books

# API Documentation link

https://documenter.getpostman.com/view/24752856/2s8YzMXQYY

# Routes and Endpoints

## /users

POST: Create a new user [X]
GET: Get all list of users [X]

## /users/{id}

GET: Get a user by ID [X]
PUT: Update a user by Id [X]
DELETE: Delete a user by id (check if he/she still has a issued book) (is there any fine to be paid) [X]

## /users/subscription-details/{id}

GET: Get user subscription details [X]

1. Date of subscription
2. valid till
3. fine if any

## /books

GET: Get all books [X]
POST: Create/Add a new book[X]

## /books/{id}

GET: Get a book by id [X]
PUT: Update a book by id [X]

## /books/issued/by-user

GET: Get all issued books [X]

## /books/issued/withfine

GET: Get all issued books with fine [X]

 <!-- get list of user with issued books
 then find list of users with fine
 by calculating fine 
 after that
 list fo books with fine -->

## Subscription types

- Basic (3 months)
- Standard (6 months)
- Premiun (12 months)

- # NOTE: dates will be in the format (MM/DD/YYYY)

If the subscription date is 03/12/22
and subscrition type is standard
the valid till date will be 03/06/23

If he has an issued books and the issued boooks is to be returned at 01/01/23
and he missed the date of return , the he gets a fine of Rs.100

If he has an issued books and the issued boooks is to be returned at 01/01/23
If he missed the date of return , and his subscription also expires, the he will get a fine of Rs.200
