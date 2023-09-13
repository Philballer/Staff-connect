This app implements all CRUD functions and has other exciting features like pagination, NGRX, state management, etc.


Note: Develop is our main development branch and only confirmed pull-requests would be merged to this branch.

How to setup your Front end environment:

1. cd client

2. npm install -g @angular/cli

3. npm run install

4. start the app with: npm start

###########################################

How to setup your Backend environment:

1. Download Docker

2. Navigate to the backend folder and load docker images.

   - cd backend
   - docker build -t backend-staffconnect .

   To run the backend server:

   - ..cd
   - cd builds
   - docker-compose up -d

   Note to access inside the container run this:

   - docker exec -it backend-staffconnect bash

   To log the backend container

   - docker logs -f backend-staffconnect

   ## -f stands for follow

   Before Pushing and Merging.

   1. Run new build:

      - cd backend
      - docker build -t backend-staffconnect .

   2. Update the Tar file in builds

      - docker save -o ../builds/backend-staffconnect.tar backend-staffconnect

   3. - git add .

   4. - git commit -m "commit message"

   5. - git push



