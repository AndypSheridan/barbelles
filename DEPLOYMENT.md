# Deployment

## Table of Contents

---

### Setting up a basic Django project and deploying to Heroku

-   [**Deployment**](#deployment)
    -   [**_Initial Deployment_**](#initial-deployment)
    -   [**_Create Repository_**](#create-repository)
    -   [**_Setting up the Workspace_**](#setting-up-the-workspace-to-be-done-locally-via-the-console-of-your-chosen-editor)
    -   [**_Deploying the app to Heroku_**](#deploying-the-app-to-heroku)
        -   [**_Create Heroku App_**](#create-heroku-app)
        -   [**_Connect to the API_**](#connect-to-the-api)
        -   [**_Final Deployment_**](#final-deployment)

## Initial Deployment

I took the following steps to deploy the site to Heroku as early as possible, and have listed any console commands required to initiate it. My aim was to ensure this process was completed as early as possible in the project, to avoid complications or issues as it progressed.


### Create repository:

*  Create a new repository in GitHub based on [this](https://github.com/Code-Institute-Org/react-ci-template/generate) template from Code Institute.

### Setting up the Workspace (To be done locally via the console of your chosen editor):

* Enter `npm install` in the terminal and wait for all packages to install. This will install all dependencies required for the project.


### Deploying the App to heroku

### Create Heroku App:

The below works on the assumption that you already have an account with [Heroku](https://id.heroku.com/login) and are already signed in.

1. Create a new Heroku app:
    - Click "New" in the top right-hand corner of the landing page, then click "Create new app."
1. Give the app a unique name:
    - It will form part of the URL (in the case of this project, I called the Heroku app sci-fi-portal)
1. Select the nearest location:
    - For me, this was Europe.
1. Connect to GitHub:
    - From the deploy tab, click on "GitHub" in the "Deployment Method" section.
    - Enter the name of the repository and click "connect".
    - Click "deploy branch".

### Connect to the API

1. In *Heroku barbelles-api*:
    * In the settings tab, add new config vars:
    - Key: CLIENT_ORIGIN, Value: https://barbelles.herokuapp.com
    - Key: CLIENT_ORIGIN_DEV, Value: https://3000-andypsheridan-barbelles-ryr4f1dwtjm.ws-eu100.gitpod.io
    * *IMPORTANT:* remove trailing slash at the end of each link.
    * Install the Axios package and create axiosDefaults.js in api folder.
    - In *axiosDefaults.js*, set baseURL, content-type header, withCredentials.
    - Import axiosDefaults in *App.js*.

### Final Deployment




**[Back to Readme](README.md)**