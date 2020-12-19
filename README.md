
# Chat application - final project

*presentation, introduction, ...*

## Usage

*how to start and use the application, run the tests, ...*

* Clone this repository, from your local machine:
  ```
  git clone https://github.com/adaltas/ece-2020-fall-webtech-project.git webtech
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
  # Optional, fill the database with initial data
  bin/init
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
  *place your comments*
* Project structure   
  *place your comments*
* Code quality   
  *place your comments*
* Design, UX   
  *place your comments*
* Git and DevOps   
  *place your comments*

Application development

* Welcome screens   
  * The user when he connect to the plateform is redirect to a welcome page 
  * He can see his email address at the top along with his gravatar
  * Multiple settings are available (WIP)
* New channel creation   
  * The user _can_ create new channels, name them as he wants and write in them
* Channel membership and access   
  * (WIP)
* Ressource access control   
  *
* Invite users to channels   
  *place your comments*
* Message modification   
  *place your comments*
* Message removal   
  *place your comments*
* Account settings   
  * The user can choose between a set of themes
  * The user can change his username (set as default to his email address)
* Gravatar integration   
  *place your comments*
* Avatar selection   
  *place your comments*
* Personal custom avatar   
  *place your comments*

## Bonus

*place your comments*
