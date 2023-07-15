# Welcome to Notec!

For now, in this section, there will only be instructions to run basic proof of concept app.


## App structure

**./server**  - Server
**./app/notec** - Application


# Instructions

**Server:**

**!IMPORTANT!**
you need to create .env file in .\server\ folder and 
add the environment variables in order for server to properly work.

    $ cd .\server\
    $ yarn install
    $ yarn dev

In the console, there should be a message that the DB is connected and server is running at port 8000.


**App:**

    $ cd .\app\notec\
    $ yarn install
    $ yarn dev

Open the browser and go to http://localhost:3000/ where the app should be running. 


You can modify server port if needed in .env file by "SERVER_PORT"  variable


