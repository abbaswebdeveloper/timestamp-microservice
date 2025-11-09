# Timestamp Microservice

FreeCodeCamp Back End Development and APIs Project

## Live Demo
[Add your live URL here after deployment]

## API Endpoints

- `GET /api` - Current timestamp
- `GET /api/:date` - Convert date to timestamp

## Examples

- `/api/2015-12-25` 
- `/api/1451001600000`
- `/api` (current time)

## Response Format

```json
{
  "unix": 1451001600000,
  "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
