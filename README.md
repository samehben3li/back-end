# Iunu Tomato Trolley Backend

## Prerequisites

To build and run this project, you need Node.js version 19.x or later and
a compatible version of NPM (Node Package Manager) installed. For 
information on how to check your version of Node and NPM, see the [NPMJS
page on downloading and installing Node.js and
npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

# Getting Started

The following instructions explain how to get your project connected to your 
instance of MongoDB Atlas.

### 1. Download the Repository

To get started with this project, download this repository to your
programming environment. You can clone this project using Git version control:

```
git clone https://gitlab.com/ranadev/iunu-tomato-trolley/iunu-tomato-trolley-backend.git
```

Or you can download the ZIP archive using your browser. If you download
this project as a ZIP archive, 
[unzip the archive](https://www.wikihow.com/Unzip-a-File) before proceeding.

### 2. Install Depedencies

Navigate to the directory containing the project in your shell or open it
in your preferred IDE.

Then, use the NPM dependency file that we included in the project
directory called `package.json` to download and install your dependencies:

```shell
npm install
```

This command reads the `package.json` file and downloads and saves the
dependencies defined within it to a directory called `node_modules`. It
also creates a `package-lock.json` file that sets the version information for
each of the modules required to build your project.

At this point, you should have appropriate versions of Node.js and NPM 
installed as well as a project directory that contains the dependencies you 
need to use the Node.js.

### 3. Configure your environnement variables

1. create `.env` file.

2. You can follow the [Getting Started with Atlas](https://docs.atlas.mongodb.com/getting-started/) guide, to learn how to create a free Atlas account, create your first cluster and get your Connection String to the database.
```
MONGO_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/tomatoTrolley?retryWrites=true&w=majority
```

3. add and configure the following variables (view sample.env file)

```
MONGO_URI = mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/tomatoTrolley?retryWrites=true&w=majority
ACCESS_TOKEN_SECRET = YOUR_ACCESS_TOKEN_SECRET
PORT = 4000
```

4. Save the changes to your `.env` file.


### 4. Run the Project

If you are running from the shell, you can run the application from the
directory that contains it with the following command:

```shell
npm start
```

visit:  http://localhost:4000. 

### 5. Testing application

```shell
npm test
```