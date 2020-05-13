
<h1 align="center">
  Simple DApp: ERC20 Ggwp Token Contract
</h1>

Test project to launch a simple App that can widthdraw tokens from ERC20 Contract DApp over Ropsten Test Network.

_Alto.io_
_Jeds Gonzales_

## Pre-requisites
1. Browser with Metamask extension installed or any browser with Ethereum Wallet capability such as Brave.
2. Ethereum Wallet with enough Ether coin balance.
3. NodeJS ^10.16.2 installed

## 🚀 Quick start

1.  **Truffle and Node express**

    Clone repository then open a terminal inside the project directory.

    ```shell
    cd ggwp-contract
    npm install
    ```

    If at some point if you got npm errors, you might need to install build essentials.
    In Windows environment, you can run

    ```shell
    npm install --global windows-build-tools
    npm install
    ```
    
    This will install truffle dependecies and express. Boot up express server by:

    ```shell
    npm start
    ```

    Express will start listening on port 5000.

2.  **React DApp Front-End**

    The front-end app is created with Gatsby.

    Open another terminal and navigate into client app’s directory and start it up.

    ```shell
    cd ggwp-contract/client
    npm install
    npm start
    ```

    Wait for gatsby development console to reach status of 'SUCCESS'. The app then 
    should be accessible at separate port 8000.

1.  **Open your browser and start testing**

    You may either visit `http://localhost:8000` or `http://localhost:5000`. Both should 
    work as it is configured to do so.


## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── index.js
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── truffle-config.js
    ├── test
    ├── node_modules
    ├── client
        ├── node_modules
        ├── src
        ├── .gitignore
        ├── .prettierrc
        ├── gatsby-browser.js
        ├── gatsby-config.js
        ├── gatsby-node.js
        ├── gatsby-ssr.js
        ├── LICENSE
        ├── package-lock.json
        ├── package.json
        └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

3.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

4.  **`.prettierrc`**: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.org/docs/browser-apis/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

6.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.org/docs/gatsby-config/) for more detail).

7.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.org/docs/node-apis/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

8.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

9.  **`LICENSE`**: Gatsby is licensed under the MIT license.

10. **`package-lock.json`** (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. **(You won’t change this file directly).**

11. **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

12. **`README.md`**: A text file containing useful reference information about your project.
