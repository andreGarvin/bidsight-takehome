# Bidsight

- [Prerequisites](#Prerequisites)
- [Getting Started](#getting-started)
## Prerequisites

Before You get start this project make sure you have these tools installed. For this project you will need to nvm [Here is the documentation to install nvm](https://github.com/nvm-sh/nvm#installing-and-updating), there is `.nvmrc` file to install the correct version for this project

- node v18.15.0
## Getting Started

Make sure to create a `.env.local` file for all your secrets need for the application, just copy and paste whats in the `.env` file.

Highly recommended that you use Visual Studio Code to work on this project.

1. Clone the repository.
1. Switch to the `develop` or `feat/<branch name>` branch.
1. Install dependencies using `npm install` for this project
1. Then run `npm run build` to get a build output of the project

# BidSight FE Take-Home Assignment

This is a small assignment for us to get a sense of what you can produce on your own. It should take you 2-3 hours to complete. We are mainly assessing your ability to create an intuitive interface from an ambiguous data model.

## The Assignment

We would like you to create an invoicing dashboard. The dashboard can look however you'd like, but it should include the following features:

- View all invoices including status (paid, outstanding, etc.)
- Create a new invoice. Invoice charges may include work-related expenses, materials, labor, etc.
- Edit an invoice - add charges, update status, etc.
- Filter or search invoices
- Easy way to identify late invoices

For fetching the list of current invoices, please use the endpoint we've provided:

https://takehome.api.bidsight.io/v2/invoices

For creating or updating an invoice, you don't have to write anything to the backend. You can simply update state locally (state does not have to persist when the page is refreshed).

## Requirements

You should use React as your frontend framework. If you have any questions at all, please ask.

To complete the assignment, please fork this repo and commit your work to your fork. When you are done, give us access to your fork so we can review and run it.
