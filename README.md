# book-record-management-10567

This is a book record managemnt API Backend for the management of records and books

# Routes and Endpoints

## /users

POST: Create a new user
GET: Get all list of users

## /users/{id}

GET: Get a user by ID
PUT: Update a user by Id
DELETE: Delete a user by id (check if he/she still has a issued book) (is there any fine to be paid)

## /users/subscription-details/{id}

GET: Get user subscription details

1. Date of subscription
2. valid till
3. fine if any

## /books

GET: Get all books
POST: Create/Add a new book

## /books/{id}

GET: Get a book by id
PUT: Update a book by id

## /books/issued

GET: Get all issued books

## /books/issued/withfine

GET: Get all issued books with fine

## Subscription types

- Basic (3 months)
- Standard (6 months)
- Premiun (12 months)

If the subscription date is 03/12/22
and subscrition type is standard
the valid till date will be 03/06/23

If he has an issued books and the issued boooks is to be returned at 01/01/23
and he missed the date of return , the he gets a fine of Rs.100

If he has an issued books and the issued boooks is to be returned at 01/01/23
If he missed the date of return , and his subscription also expires, the he will get a fine of Rs.200
