## Steps to run the project in local:

1. Create .env file inside project folder with the following contents:
   ```
      PORT=
      POSTGRES_HOST=
      POSTGRES_PORT=
      POSTGRES_USERNAME=
      POSTGRES_PASSWORD=
      POSTGRES_DATABASE=
   ```
2. Run "npm i" to install all the dependencies
3. Run "npm run nodemon-dev" - this will start the index.ts file as the starting point for the server using nodemon
4. typeorm migration scripts can be found in the package.json file

## API end-point hosted on render: 
   #### POST https://fluxcart-x94t.onrender.com/api/v1/identify
