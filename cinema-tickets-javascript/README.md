# DWP Ticket Service

## About DWP Ticket Service

DWP Ticket Service is my solution to the coding exercise for Senior JavaScript/Node.JS Engineer - 368194.

Project status: <span style="color:green">Active</span>

[![codecov](https://codecov.io/github/fatherjim/dwp-cinema-tickets/graph/badge.svg?token=B8MPM2GD2C)](https://codecov.io/github/fatherjim/dwp-cinema-tickets)

## Table of contents

> -   [DWP Ticket Service](#dwp-ticket-service)
>     -   [About DWP Ticket Service](#about-dwp-ticket-service)
>     -   [Table of contents](#table-of-contents)
>     -   [Requirements](#requirements)
>     -   [Installation](#installation)
>     -   [Usage](#usage)
>     -   [Notes](#notes)

## Requirements

 Find the requirements [here](./requirements.md).

## Installation

Follow the steps below to get the project up and running:

1. Clone the repo
    ```sh
    git clone https://github.com/fatherjim/dwp-cinema-tickets.git
    ```
2. Install NPM packages
    ```sh
    npm install
    ```

## Usage

Ensure the machine is running NodeJS 20 or later, or simply run ```nvm use``` to use NodeJS 20.

Change directory to cinema-tickets-javascript.

Run the service with ```npm start```.

## Notes

No external dependencies, other than devDependencies, have been used.

The business rules which could be translated into configs, such as the maximum number of tickets per purchase, are all centralised under ```config/```.
This facilitates future changes, makes them easier to receive from elsewhere (such as .env files or a database), and eliminates magic numbers in the code.

I've added a couple of simple extra business rules:
1. Only one infant is allowed to set on an adult's lap. This wasn't explicitly stated but I've assumed as such.
2. Only two children are allowed per adult.

There are many, many more improvements that can be implemented to make this functionality simpler and easier to the user, but the important thing is that the business rules have all been satisfied.
