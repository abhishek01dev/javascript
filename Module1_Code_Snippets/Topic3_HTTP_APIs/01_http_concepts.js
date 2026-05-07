// ============================================================
// HTTP & APIs — Concepts
// ============================================================
// HTTP = HyperText Transfer Protocol
// The language browsers and servers use to communicate.
// Every website visit, API call = HTTP request + response.

// ============================================================
// HTTP METHODS (CRUD Mapping)
// ============================================================
//
//  Method   | CRUD   | Purpose                    | Has Body?
//  ---------|--------|----------------------------|----------
//  GET      | Read   | Retrieve data, no change   | No
//  POST     | Create | Send new data to server    | Yes
//  PUT      | Update | Replace entire resource    | Yes
//  PATCH    | Update | Update PART of a resource  | Yes
//  DELETE   | Delete | Remove a resource          | No
//  HEAD     | Read   | Like GET, headers only     | No
//  OPTIONS  | Meta   | Get allowed methods (CORS) | No
//
//  IDEMPOTENT = calling multiple times has same effect as once
//  GET, PUT, DELETE are idempotent
//  POST is NOT (each POST may create a new resource)

// ============================================================
// HTTP STATUS CODES
// ============================================================
//
//  Range | Category      | Meaning
//  ------|---------------|------------------------------------
//  1xx   | Informational | Request received, still processing
//  2xx   | Success       | All good!
//  3xx   | Redirect      | Resource has moved
//  4xx   | Client Error  | You sent something wrong
//  5xx   | Server Error  | Server had a problem
//
//  Common codes to MEMORIZE:
//
//  200 OK              — Request succeeded
//  201 Created         — New resource created (after POST)
//  204 No Content      — Success, nothing to return (after DELETE)
//  301 Moved Perm.     — URL changed permanently
//  400 Bad Request     — Invalid data in request
//  401 Unauthorized    — Not logged in / invalid token
//  403 Forbidden       — Logged in but not allowed
//  404 Not Found       — Resource doesn't exist
//  409 Conflict        — Duplicate / state conflict
//  422 Unprocessable   — Validation failed
//  500 Internal Error  — Server crashed
//  503 Unavailable     — Server overloaded / down

// ============================================================
// REST API URL STRUCTURE
// ============================================================
//
//  GET    /students         → get all students
//  GET    /students/5       → get student with id=5
//  POST   /students         → create a new student
//  PUT    /students/5       → replace student 5 entirely
//  PATCH  /students/5       → update part of student 5
//  DELETE /students/5       → delete student 5
//
//  PATH PARAMETER  = /students/5      (id embedded in URL)
//  QUERY PARAMETER = /students?course=BTech&page=2

// ============================================================
// ANATOMY OF AN HTTP REQUEST (Text representation)
// ============================================================
const httpRequestExample = `
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{
  "name": "Aman",
  "email": "aman@mail.com"
}
`;

// ============================================================
// ANATOMY OF AN HTTP RESPONSE (Text representation)
// ============================================================
const httpResponseExample = `
HTTP/1.1 201 Created
Content-Type: application/json
Content-Length: 52

{
  "id": 5,
  "name": "Aman",
  "email": "aman@mail.com"
}
`;

console.log("HTTP Request Example:", httpRequestExample);
console.log("HTTP Response Example:", httpResponseExample);

// ============================================================
// HEADERS — metadata sent with every request/response
// ============================================================
//
//  Common REQUEST headers:
//    Content-Type: application/json   — "I'm sending JSON"
//    Accept: application/json         — "I want JSON back"
//    Authorization: Bearer <token>    — authentication token
//    Cookie: session=abc123           — session data
//
//  Common RESPONSE headers:
//    Content-Type: application/json   — "I'm returning JSON"
//    Cache-Control: max-age=3600      — how long to cache
//    Set-Cookie: session=abc; ...     — set a cookie

// ============================================================
// WHAT IS A REST API?
// ============================================================
// REST = Representational State Transfer
// An architectural STYLE (not a protocol) for building APIs.
//
// REST principles:
//   1. Use HTTP methods (GET/POST/PUT/DELETE) correctly
//   2. Resources identified by URLs (/users, /products/5)
//   3. Stateless — each request is self-contained
//   4. Return standard status codes
//   5. Data in JSON (usually)
