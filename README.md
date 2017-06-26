# leave-app
A NodeJS application for a leave application submission and approval.

**Requirements**

Node.js MongoDB

**Installation**

npm install

**Running**

node app.js

### API Documentation

### Login
  
   Login (for both manager and employee)
* **URL**

  /login
* **Method:**

  `POST`
*  **URL Params**

    None
   
* **Data Params**

  `{ "username" : "manager1", "role" : "manager" }`
  
  OR
  
  `{ "username" : "emp1", "role" : "employee" }`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ result : "successful" }`
    
* **Error Response:**

  * **Code:** 200 <br />
    **Content:** `{ result : "unsuccessful" }`
    
* **Sample Call:**

  ```javascript
     $.ajax({
            url: 'login',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json; charset=UTF-8'
        })
  ```
  
  
### Create leave 

  Create a new leave request (for employee)
* **URL**

  /createLeave
* **Method:**

  `POST`
*  **URL Params**

    None
   
* **Data Params**

  `{ "startDate" : 01012016, "endDate" : 01022016, "leaveType" : "sick leave", "reason" : "flu" }`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ result : "successful" }`
    
* **Error Response:**

  * **Code:** 200 <br />
    **Content:** `{ result : "invalid leave type" }`

  * **Code:** 400 <br />
    **Content:** `{ result : "invalid data parameters" }`

  * **Code:** 401 <br />
    **Content:** `{ result : "unauthorized access" }`
    
* **Sample Call:**

  ```javascript
     $.ajax({
            url: 'createLeave',
            data: JSON.stringify(data),
            type: 'POST',
            contentType: 'application/json; charset=UTF-8'
        })
  ```
  
  
### Get leave 

  See all leave requests (for both manager and employee)
* **URL**

  /getLeave
* **Method:**

  `GET`
*  **URL Params**

    None
   
* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[ { "_id" : "594fbab5dd6fdb60c0b5022b", "startDate" : "01012016", "endDate" : "01022016", "leaveType" : "sick leave",
    "reason" : "flu", "requestBy" : "emp1", "requestedAt" : "Sun Jun 25 2017 18:59:25 GMT+0530 (IST)",
    "approvalStatus" : "approved", "approvedAt" : "Sun Jun 25 2017 19:00:44 GMT+0530 (IST)" } ]`
    
* **Error Response:**

  * **Code:** 401 <br />
    **Content:** `{ result : "unauthorized access" }`
    
* **Sample Call:**

  ```javascript
        $.ajax({
            url: 'getLeave',
            type: 'GET',
        })
  ```
  
### Approve leave 

Approve leave request (for manager)
* **URL**

  /approveLeave
* **Method:**

  `PUT`
*  **URL Params**

    None
   
* **Data Params**

  `{ "objectId" : "594fbab5dd6fdb60c0b5022b" }`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ result : "successful" }`
    
* **Error Response:**

  * **Code:** 200 <br />
    **Content:** `{ result : "invalid objectId" }`

  * **Code:** 400 <br />
    **Content:** `{ result : "invalid data parameters" }`

  * **Code:** 401 <br />
    **Content:** `{ result : "unauthorized access" }`
    
* **Sample Call:**

  ```javascript
        $.ajax({
            url: 'approveLeave',
            data: JSON.stringify(data),
            type: 'PUT',
            contentType: 'application/json; charset=UTF-8'
        })
  ```
  
  
