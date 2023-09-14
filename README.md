
### This app implements all CRUD functions and has other interesting features like pagination, NGRX, state management and many more.

# Note: Develop is our main development branch and only confirmed pull-requests would be merged to this branch.

Stack
Frontend: Angular.js
Backend: Nest.js

### General setup (Recommended)

Run the following scripts to have your workplace setup

- Download docker-desktop if you aren't using a Linux system.
  https://www.docker.com/products/docker-desktop/

- npm run setup:new (clone the repo and never worked with angular, installs angular cli globally).

- npm run setup (recommended every time you create a new branch or clone the repo)

### Before Pushing and Merging.

- git add .

- git commit -m "commit message"

- git push

### Extensive Install Guide (Not Recommended)

# How to setup your Front end environment:

1. cd client

2. npm install -g @angular/cli

3. npm run install

4. start the app with: npm start

###########################################


# How to setup your Backend environment:


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

     -f stands for follow

# Run new build:

- cd backend
- docker build -t backend-staffconnect .

