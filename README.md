# About DanceFam

DanceFam is a web application inspired by Meetup, that provides an a central location for social dancers to organize events and classes. [Click here to view the DanceFam Live Site](https://dancefam.herokuapp.com/)

### Please see links below to project Wiki:
[Database Schema](https://github.com/fisjac/DanceFam.io/wiki/Database-Schema)<br>
[Frontend Routes]()<br>
[Feature List](https://github.com/fisjac/DanceFam.io/wiki/Features-List)<br>
[Redux State Shape](https://github.com/fisjac/DanceFam.io/wiki/Redux-State-Shape)<br>

The web application was built by [Jack Fisher](https://www.linkedin.com/in/jackson-fisher-8631a7a1/) using:

### Frameworks:
![javascript](https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![react](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white)<br>
![redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white)

![express](https://img.shields.io/badge/ExpressJS-000000?style=for-the-badge&logo=Express&logoColor=white)
![css3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white)
![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white)
### Database:
![SQLite3](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) ![postgresql](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white)


## Features Directions:

### Home Page Demo User:
You will be able to test the features of this site without sign up by clicking the join the fam button on the splash page, then clicking log in. This will prompt a modal popup window with an option to sign in as the demo user.
![landing-page]

[landing-page]: ./assets/landingpage.png


While logged in, users can view their communities and events on the home page.

![browser](https://user-images.githubusercontent.com/41238731/200251961-0efd98de-9243-491b-bae4-9ba6c89d9851.png)


By clicking on an event or community card, the user will be redirected to that event or community's page.

### RoadMap
- add functionality to remove images from a listing
- add functionality to add/remove images from reviews
- allow users to edit their reviews
- add CRUD operations for bookings, enabling them to book a listing
- add a page to allow a user to view their bookings
- add a page to allow a user to view of all their listings


### Cloning instructions

For developers looking to clone the FlairBnB, after cloning the repo, first navigate to the backend folder, and install the dependencies within node by running
```npm install```. Then repeat the same process in the front-end folder. The developer should then be able to run ```npm start``` in both the frontend and backend directories to launch the application.

The developer can then access the app by navigating to http://localhost:3000/
or any other port the developer specifies in the .env file.
