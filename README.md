
# Chat application - final project

 * "ECE Chat App" has for main goal to propose a channel oriented chat experience to their user.
 *  The User may connect using a Oauth2 secured connection with his github account 
 *  He may then access the main feature of the app 
 *  Create and delete channels, write messages to his friends, invite them into his channels, edit his profile.

 
 
## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/HN1997/Web-Server-Nodejs.git
  cd webtech
  ```
* Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:   
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```
  Note, the provided `.gitignore` file ignore the `dex` folder.
* Make a copy of the Dex configuration to `./dex-config/config-private.yaml`, the project is configured to Git ignore this path:
  ```bash
  cp -rp ./dex-config/config.yaml ./dex-config/config-private.yaml
  ```
* Register your GitHub application, get the clientID and clientSecret from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config-private.yaml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
      clientID: xxxx98f1c26493dbxxxx
      clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
      redirectURI: http://127.0.0.1:5556/dex/callback
  ```
* Inside `./dex-config/config-private.yaml`, the frond-end application is already registered and CORS is activated. Now that Dex is built and configured, your can start the Dex server:
  ```yaml
  cd dex
  bin/dex serve ../dex-config/config-private.yaml
  ```
* Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Do not use the init file
  # Start the back-end
  bin/start
  ```
* Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```

## Authors

* Camugli Pierre, pierre.camugli@edu.ece.fr, PierreC12033
* Navillod Hugo, hugo.navillod@edu.ece.fr, HN1997

## Tasks

Project management

* Naming convention   
  * We tried to follow the guidelines explained during the class for all of the project 
* Project structure   
  * The project has been based on the template project provided the structure is kept 
* Code quality   
  * We tried to follow the guidelines explained during the class for all of the project 
* Design, UX   
  * We used meterial UI to provide a good user experience smooth and self explainatory 
* Git and DevOps   
  * We used GitHub on a daily basis but we didn't used Devops tools or unit test 

Application development

* Welcome screens   
  * The user when he connects to the plateform is redirected to a welcome page where the rules and explanations on how to use the plateform are provided
  * He can see his email address at the top along with his gravatar where he can click to access customisation of his profil
  * He can access and create channels on the left
* New channel creation   
  * The user _can_ create new channels, name them as he wants and write in them
* Channel deletion
  * The user can delete a selected channel using a button linked to it 
* Channel membership and access   
  * Only channels where the user has been invited (and the ones he created) are accessible by him
* Ressource access control   
  * A user can only gain access to channels he was invited to or to the one he created
  * The Apis returns the appropriate channels  
* Invite users to channels   
  * A user may invite a friend to a channel he created or have been invited to already, to do so he can click the button at the bottom of the channel message feed and enter his friend email address.
* Message modification   
  * A user may modify its messages
  * A user may not modify a message that he didn't send
* Message removal   
  * A user may delete its messages
  * A user may not delete a message that he didn't send
* Account settings   
  * The user can change his gravatar 
  * The user can change his username 
  * It is persistent data
* Gravatar integration   
  * The user can use his gravatar by putting the link of his gravatar
* Avatar selection   
  * The user can change his avatar with a set of default images (3) or put a link to a picture
* Personal custom avatar   
  * A user may not upload a jpg (or other) file to the web app, only a link to the image he wants 

## Bonus

* Not implemented 
