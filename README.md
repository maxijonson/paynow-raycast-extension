# PayNow Raycast Extension

Unofficial Raycast extension for [PayNow](https://www.paynow.gg) - a Merchant of Record specializing in digital goods.

## Features

- Products
  - List Products
  - View Product Details
- Tags
  - List Tags
  - View Tag Details
- Orders
  - List Orders
  - View Order Details

## Installation

This extension is not currently on the official Raycast Store. If you would like to install it regardless, you can install it manually as a development extension.

1. Clone the repository
   ```bash
   git clone https://github.com/maxijonson/paynow-raycast-extension.git
   # or: gh repo clone maxijonson/paynow-raycast-extension
   ```
2. Install the dependencies
   ```bash
   cd paynow-raycast-extension
   npm install
   ```
3. Build the extension. You'll need to run the development server to use it, which is a script that doesn't exit on its own.
   ```bash
   npm run dev
   # Then press "CTRL + C" to stop the process
   ```
4. Open Raycast, use the "Manage Extensions" command and use the "Import Extension" action. Then, select the repo folder you cloned in step 1.

## Setup

This extension allows you to connect multiple PayNow stores. You can manage your stores in the "Manage Stores" command. If none are configured, you'll be prompted to add one when you try to use any of the commands.

> Note: the API key you use should have at least read access to the features you want to use. Currently, the extension does not handle permission errors gracefully.

## Updating the extension

Because this extension is not on the official Raycast Store, you'll need to manually update it when there are new releases. You won't need to re-import it though.

1. Pull the latest changes
   ```bash
   cd paynow-raycast-extension
   git pull origin main
   ```
2. Install any new dependencies
   ```bash
   npm install
   ```
3. Restart the development server to rebuild the extension.
   ```bash
   npm run dev
   # Then press "CTRL + C" to stop the process
   ```
