# finway-coding-challenge
A full stack web developement challenge for Finway
## Running the server
```
cd server
npm install
create .env from .env.example and add set PORT to 1337 and your MONGO_URL (see https://www.mongodb.com/docs/guides/atlas/connection-string/ for more info)
npm run build
npm run dev
```
## Running server tests
```
npm run test
npx jest --coverage for test coverage
```
## Running the client
```
cd client
npm install
npm run start
```
## Running client tests
```
npm run test
npx jest --coverage for test coverage
```