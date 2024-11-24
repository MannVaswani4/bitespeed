# Bitespeed Backend Task: Identity Reconciliation

This project implements a backend service to consolidate customer identities for FluxKart.com. The service links customer records based on shared emails or phone numbers across multiple transactions, maintaining database consistency and efficient updates.

---

## Hosted Endpoint

The API is hosted at:
**[https://bitespeed-gah2.onrender.com/identify](https://bitespeed-gah2.onrender.com/identify)**

---

### Example Request

`{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}' `

* * * * *

### Example Response

json

`{
  "contact": {
    "primaryContactId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}`

* * * * *

Features
--------

- **Customer Identity Consolidation**: Merges customer records that share either `email` or `phoneNumber`.
- **Dynamic Updates**: Automatically updates links between contacts as new information is provided.
- **Database Normalization**: Ensures efficient storage with a single primary contact per customer group.

* * * * *

Requirements Fulfilled
----------------------

1. **/identify Endpoint**:
 - Processes `email` and/or `phoneNumber` inputs.
 - Returns a consolidated customer record.

2. **Response Includes**:
 - Primary contact ID.
 - Associated emails and phone numbers.
 - IDs of secondary contacts.

3. **Handles Edge Cases**:
 - Creates new primary records for unknown contacts.
 - Links existing contacts appropriately.

* * * * *

Tech Stack
----------

- **Backend Framework**: Node.js
- **ORM**: Prisma
- **Database**: MySQL
- **Hosting**: Render.com

* * * * *

Database Schema
---------------

`model Contact {
  id              Int      @id @default(autoincrement())
  phoneNumber     String?  @unique
  email           String?  @unique
  linkedId        Int?     // Links to another Contact's ID
  linkPrecedence  String   // "primary" or "secondary"
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  deletedAt       DateTime?
}`

* * * * *

How to Run Locally
------------------

### Clone the Repository


`git clone <repository-url>
cd <repository-folder>`

### Install Dependencies


`npm install`

### Set Up Environment Variables

Create a `.env` file with the following content:


`DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database>"`

### Apply Migrations

`npx prisma migrate deploy`

### Start the Application

`npm start`

* * * * *

Example Scenarios
-----------------

### Scenario 1: New Contact

**Request**:

`curl -X POST https://bitespeed-gah2.onrender.com/identify\
-H "Content-Type: application/json"\
-d '{
  "email": "docbrown@hillvalley.edu",
  "phoneNumber": "987654"
}'`

**Response**:


`{
  "contact": {
    "primaryContactId": 5,
    "emails": ["docbrown@hillvalley.edu"],
    "phoneNumbers": ["987654"],
    "secondaryContactIds": []
  }
}`

* * * * *

### Scenario 2: Linking Existing Contacts

**Request**:

`curl -X POST https://bitespeed-gah2.onrender.com/identify\
-H "Content-Type: application/json"\
-d '{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}'`

**Response**:

`{
  "contact": {
    "primaryContactId": 1,
    "emails": ["lorraine@hillvalley.edu", "mcfly@hillvalley.edu"],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}`

* * * * *

Submission Details
------------------

`- **Repository**: [GitHub Repo URL](#)
- **Hosted Endpoint**: [https://bitespeed-gah2.onrender.com/identify](https://bitespeed-gah2.onrender.com/identify)`
