## What-To-Watch-On-Emby  

This is (Currently) a Node.js script that pulls lists from the [trakt.tv](https://trakt.tv) official API and matches them against a users Available [Emby Library](https://emby.media/). It then programmatically creates an Emby Collection for viewing that contains all of the content from the trakt.tv list that's also found in your library!


## Examples:

Coming Soon!


---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g



## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install


## Running the project

From the directory that contains the script

    $ node ./main.js

You'll then be presented with an interactive CLI session that'll prompt you for which trakt.tv list you want to add to your Emby Library as a Collection!

## Road Map

I'll be extending the functionality of the project to search through list.

Additionally, I also plan to build this project a front end and dockerize it, so stay tuned!