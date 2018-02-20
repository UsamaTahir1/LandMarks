# LandMarks
# 1.	Outline

Given the requirements, the very basic things I implied were user management, and data persistence. I wanted to use simple user management with authentication. Data persistence was handled by  sql Localdb.
# 1.1 Backend
Technology Stack: 
* .NET Famework 4.6.1
*	ASP .NET Core 2.0
*	localdb
*	Entity Framework Core
*	Visual Studio 2017
Time Spent: 5 hours
I chose Asp.net Core 2.0 due to its platform independent nature, simple file structure and Nuget approach for dependencies.
Implemented user management using Jwt bearer authentication. Used common repository pattern to centralize the data persistence approach. Created Web Apis for user authentications and landmark creation. Implemented services to segregate the business layer.
# 1.2 Frontend
Technology Stack:
*	ReactJS
*	Redux
*	react-google-maps package
*	Bootstrap
*	VScode
Time Spent: 12 hours
Most time and energy was used for front end side. Being a more backend oriented developer I have to go through a bit of learning curve for ReactJs and Redux to revise the concepts. It took me a little time.
Once I got the basic structure cleared in my mind, I implemented user authentication and then created component to manage google maps Api. I used react-google-maps just not re invent all the basic cases which might take little energy but more time. Implemented the Redux strategy with Components Actions, Reducers and helping services.

# 2.	Timeline
Most time was spent on front end with ReactJs (12 hours). Backend process was smooth (5 hours). Overall time spent is around 17 hours.

# 3.	Limitations
* For some reason I am only able to edit markers which are in the bottom half of the map. It might be an issue with the offsets with respect to map.
* First time Adding the comment appears without username. 
* Searching in handled on front end as I was trying to play around with sate manipulations in Reactjs. It sometimes shows more markers on map than necessary. (resolved)

# 4.	Running the Solution
*	Clone the Git repository in some folder OR download the zip folder and extract it.
*	Got to Api folder and open the Api.sln file in Visual Studio 2017.
*	Run following from the Package Manager Console to generate the localdb databse.
      * Add-Migration StartTheBuilding
      * Update-Database
*	Start the project by pressing F5 for debugging Or Ctrl+ F5 without debugging. If this does not start the project, then go to the folder containing Api.sln. Go to Api folder. Now open Command line tool in this folder and run following commands one by one:
    *	dotnet build
    *	dotnet run
    
  this will launch the Api project.
*	Go to ‘client’ folder from the root directory. Open the folder in Visual Studio Code OR just open Command line tool
*	Open Terminal in VS Code and run following commands
    *	npm install
    *	npm start
    
  same commands will be used if you are using Command line tool. This will launch the project at port 8080 on localhost.  
  
