# Numenera Utils

Capstone project for Code:YOU (Web Development Track, Aug 2024 cohort)

**Contents**

- [What it is](#what-it-is)
- [Installation and Getting Started](#installation-and-getting-started)
- [Unit tests](#unit-tests) - *currently inoperative*
- [Usage](#usage)
- [Legal disclaimer](#legal-disclaimer)

## What it is

A companion web app for [Numenera](https://www.montecookgames.com/store/product-line/numenera/) (a science-fantasy TTRPG by Monte Cook Games). It's designed to streamline the character creation process by displaying all available character options from a variety of sourcebooks, and automatically filling in values where possible.

Please note that, in accordance with [MCG's Fan Use Policy](https://www.montecookgames.com/fan-use-policy/), descriptive text for individual options is not provided. However, I've included page references for each item so you can quickly find them in the official sourcebooks. Sorry for the inconvenience. 🙇‍♀️

**Features**
- Digital character creator

**Possible future features**
- Crafting calculator
- Random cypher generator

## Installation and Getting Started

1. [Download & install Node.js](https://nodejs.org/en/download) v22.14.0 or higher.

2. Clone this repository (or download and extract from ZIP).

3. Install dependencies from the command line in your local root folder: `$ npm install`

4. By default, the app runs on port 3000 (http://localhost:3000). However, this setting can cause issues if you're testing other apps on port 3000 that also use LocalStorage. To use a different port, create a file named `.env` in the app's root directory and add the following line:

   ```ini
   PORT=1336  # or use yor own number
   ```
5. Start the app from the command line with `$ npm run start`.

## Unit tests

The app uses [Jest](https://jestjs.io) for unit testing.
**NOTE:** Test suite is currently inoperative.

~~Once you've cloned the repository, you can run the test suite from CLI:~~
```bash
$ npm install
$ npm run test
```
~~It's set up to generate a coverage report as well, which you can view at `/coverage/lcov-report/index.html`. 📊~~

## Usage



## Legal disclaimer

The Monte Cook Games logo, Numenera, the Cypher System, No Thank You, Evil!, Invisible Sun, and their respective logos are are trademarks of Monte Cook Games, LLC in the U.S.A. and other countries. All Monte Cook Games characters and character names, and the distinctive likenesses thereof, are trademarks of Monte Cook Games, LLC. Content on this site or associated files derived from Monte Cook Games publications is © 2013-2024 Monte Cook Games, LLC. Monte Cook Games permits web sites and similar fan-created publications for their games, subject to the policy given at [https://www.montecookgames.com/fan-use-policy/](https://www.montecookgames.com/fan-use-policy/). The contents of this site are for personal, non-commercial use only. Monte Cook Games is not responsible for this site or any of the content, that did not originate directly from Monte Cook Games, on or in it. Use of Monte Cook Games’s trademarks and copyrighted materials anywhere on this site and its associated files should not be construed as a challenge to those trademarks or copyrights. Materials on this site may not be reproduced or distributed except with the permission of the site owner and in compliance with Monte Cook Games policy given at [https://www.montecookgames.com/fan-use-policy/](https://www.montecookgames.com/fan-use-policy/).

