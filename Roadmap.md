# Roadmap: Numenera Utils

**Last modified**: 2025-03-01 16:01

**Repo:** [GitHub](https://github.com/Tafkae/numenera-utils)

**Abstract:** I plan to develop a web companion app for my favorite tabletop role-playing game, "Numenera." In Numenera, each player uses a character sheet to keep track of their character's health, abilities, items they're carrying, and so on. My app will function as a **digital character sheet** with its values stored locally and in the cloud. It will also feature a simple **crafting calculator** to help players determine the difficulty rating for crafting their own items.

**Architecture:** Client-server.
- View: HTML/CSS/JS inside web browser
- Controller: JS Express server / API
- Model: RxDB database, or plain JSON datastore if I can't make that work

```table-of-contents
# This bit is for Obsidian
title: **Contents**
style: nestedOrderedList # TOC style (nestedList|nestedOrderedList|inlineFirstLevel)
minLevel: 2 # Include headings from the specified level
maxLevel: 4 # Include headings up to the specified level
includeLinks: true # Make headings clickable
hideWhenEmpty: true # Hide TOC if no headings are found
debugInConsole: false # Print debug info in Obsidian console
```

## Milestones & Tasks
*Think about: What will take the longest? The shortest? What's critical to the MVP, and what's a stretch goal?*

### Skeleton
- [ ] Folder hierarchy + placeholder files for front-end #view 🔺
- [ ] Basic server.js in Express #controller 🔺
    - [ ] Defines routes for front-end navigation #controller 🔺
    - [ ] Defines routes for [[#The Database]] API #controller ⏫
        - *(Note: No main database at this point, so these don't need to do anything yet.)*

**Requirement met:** 3.1

### Unit tests
- [ ] Jest setup & running #testing 🔺
- [ ] Document how to run unit tests #docs #testing
- [ ] Begin TDD process #testing 🔺
    - Write test. Test fails. Tweak code so the test passes. Rinse and repeat.
    - Arrange, Act, Assert
- [ ] Continue unit testing at all phases of development #testing

**Requirement met:** 1.7, B.1

### Character sheet - Layout
- [ ] Layout ONLY - don't worry about styling or populating values. #view 🔺
- [ ] Responsive, mobile-first #view
- [ ] Two views: one for character creation, one for play #view #stretch
    - [ ] Creation view allows editing of all fields #view ⏫
    - [ ] Play view allows editing of only some fields #view #stretch
- [ ] Toggleable option of tri-fold layout #view #stretch

**Requirement met:** A.3 (?)

### Character sheet - Storage & Retrieval
- [ ] Populate **NumeneraCharacter** object - form input #view
- [ ] Populate **NumeneraCharacter** object - JSON input #view
- [ ] Maintain change history; allow user to quickly Undo changes #view #stretch
- [ ] Allow saving multiple characters #view #stretch

#### Local Storage
- [ ] Manually save character data to LocalStorage #view
- [ ] Load character data from LocalStorage #view
- [ ] Auto-save character data to LocalStorage anytime a field loses focus #view #stretch

#### Cloud storage
- [ ] Manually save character data to cloud #view #controller
- [ ] Load character data from cloud #view #controller
    - [ ] WARN that local changes will be overwritten! #view
        - [ ] Warn only if there have *been* local changes since last cloud sync #controller #stretch
    - [ ] Authentication? How to pull down only your *own* characters? #controller #stretch

**Requirements met:** 2.2, 2.3

### Character sheet - Rendering
- [ ] Wrap DOM changes in a more intuitive interface #view ⏫
- [ ] Populate DOM with current character info from **NumeneraCharacter** object #view

**Requirements met:** A.3, 1.1, 1.2

### Model character as a JavaScript class/object
- [ ] **NumeneraCharacter** class - represents character stats, inventory, etc #view 🔺
    - [ ] Can receive data from form, LocalStorage, or cloud #view #controller
- [ ] Calculate value adjustments based on descriptor/type/focus/abilities/equipment #view
- [ ] Conditional warnings (e.g. when above cypher limit, when equipped with a weapon you have an inability in, etc.) #view #stretch

**Requirements met:** 1.1, 1.2

### Character options data
- [ ] Generate well-formed, consistent JSON data re: character options for testing & production #model 🔺
    - Lists of Types, Descriptors, Foci etc., including what effects they have on character stats
    - [ ] Start with options from *Numenera: Discovery* only #model
    - [ ] Add additional sources if time permits #model #stretch
    - [ ] Generate test data: representative subset of *Discovery* options #model #testing 🔺
        - Types: all 3 is fine
        - Descriptors: like 10 - include samples that modify Might, Speed, Intellect, Edge, skills, abilities
        - Foci: like 10 - same criteria as Descriptors
        - Abilities: Tier 1 abilities for sample types, foci, descriptors
        - Cyphers: just include default cyphers for each Type
    -  ⚠️⚠️ Remember, follow the [Fan Use Policy](https://www.montecookgames.com/fan-support/fan-use-policy/)! ⚠️⚠️  #view
- [ ] Clearly document API for these objects - what properties are available etc. #docs #model
- [ ] Wrap data in a class, thus adding methods to interact with the data #view

This stuff will be stored server-side in a database (see [[#The Database]])
**Requirements met:** 1.1

### The Database
- [ ] Server-side database implemented with [RxDB](https://rxdb.info/nodejs-database.html) (it's like SQLite, only NoSQL) #model
- [ ] API implemented in controller - database is read-only for end users #controller
    - [ ] Keep interface abstract so that DB implementation can be swapped out later if needed #controller

**Requirements met:** 3.2, B.2

### Crafting calculator
- [ ] Mobile-first layout of course #view
- [ ] Input (form): Parameters of crafting task #view
    - [ ] Validate input parameters using regex #view
    - [ ] Import crafting modifiers from chosen character sheet #view #stretch
    - [ ] Import crafting recipes from DB #controller #model #stretch
        - *BIG* stretch - would require JSON of ingredient lists for all craftable items!!
        - But cypher / artifact recipes are genericized, so that wouldn't be too hard
- [ ] Output: final Assessed Difficulty + time breakdown + Effort restrictions #view
    - [ ] Include Time & Effort info in the DB #model
    - [ ] API routes to retrieve crafting info (time, Effort) #controller

**Requirements met:** 1.3, 1.5, 1.6<sup>(?)</sup>, 3.2

### Styling - make it pretty
- [ ] Research industry style standards & trends, what people like websites to look like #office ⏫
    - [ ] Research existing character creation tools (any RPG) - DnD Beyond, Pathfinder, Cypher System, etc. #office
        - *Granted, these tend to be "substance over style," so...*
- [ ] Proofread all text #view #model
- [ ] Attractive & consistent color palette #view
    - [ ] Ensure accessible contrast ratios, colorblindness workarounds #view
- [ ] Consistent, legible, cool looking font stack #view
    - [ ] Option to use a different font stack if you want #view #stretch
- [ ] Use images from fan kit #view
    -  ⚠️⚠️ Remember, follow the [Fan Use Policy](https://www.montecookgames.com/fan-support/fan-use-policy/)! ⚠️⚠️ #view
    - [ ] Automatically embed copyright notice into other images #view #stretch
        - [npm jimp](https://www.npmjs.com/package/jimp)  ? (see [this article](https://www.slingacademy.com/article/how-to-add-watermark-to-images-nodejs/))

**Requirements met:** A.3.1, A.3.2, A.3.3, A.3.4, A.3.5

-----

## Grouped task list

```tasks
# This bit is for Obsidian
short mode
not done
path includes {{query.file.path}}
sort by priority
group by tags
tags do not include #stretch
```


-----
## Requirements (from Brainstorming sesh)

### Overall requirements

| ID    | FEATURE                                                       | DETAILS                                                                                                                                                                           |
| ----- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A.1   | [GitHub repository](https://github.com/Tafkae/numenera-utils) | At least 10 meaningful, distinct commits that demonstrate ongoing progress                                                                                                        |
| A.2   | README file                                                   | Explain project in 1+ paragraphs<br>Identify & describe 3+ features from lists 1-3<br>Include setup instructions                                                                  |
| A.3   | Visual appeal                                                 | Engaging, visually cohesive, & aligned with industry standards                                                                                                                    |
| A.3.1 | Visually appealing                                            | Follow current industry standards & trends                                                                                                                                        |
| A.3.2 | Proofreading                                                  | Text should be correctly spelled, legible, & consistent in appearance                                                                                                             |
| A.3.3 | Design consistency                                            | Clear & consistent design for headings, buttons, forms, interactive elements                                                                                                      |
| A.3.4 | Research                                                      | Emulate styles & functionalities from other websites, to enhance usability & appeal.                                                                                              |
| A.3.5 | Colors and fonts                                              | Stick to a consistent color palette (note: contrast ratios!!) & font stack                                                                                                        |
| B     | Testing                                                       | Share project, test & solicit feedback                                                                                                                                            |
| B.1   | Thoroughly tested                                             | Test thoroughly throughout development<br>Provide clear instructions for setup                                                                                                    |
| B.2   | Modular                                                       | Maintain modularity & portability; avoid hard database dependencies.<br>Use portable solutions like SQLite (or [RxDB](https://rxdb.info/nodejs-database.html) for NoSQL) instead. |

### List 1 (choose at least 2)

| ID  | FEATURE                                                                                                                                                                                 | numa.JS                                                       |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1.1 | Use arrays, objects, sets or maps to store and retrieve information that is displayed in your app.                                                                                      | Character would be represented as object                      |
| 1.2 | Analyze data that is stored in arrays, objects, sets or maps and display information about it in your app.                                                                              | Character stats                                               |
| 1.3 | Use a regular expression to validate user input and either prevent the invalid input or inform the user about it (in all cases prevent invalid input from being stored or saved).       | Keep invalid symbols out of text fields                       |
| 1.4 | Analyze text and display useful information about it. (e.g. word/character count in an input field)                                                                                     | Word count in text field                                      |
| 1.5 | Create a function that accepts two or more input parameters and returns a value that is calculated or determined by the inputs.  Basic math functions don’t count (e.g. addition, etc). | Salvage/crafting calculators 😈                               |
| 1.6 | Visualize data in a user friendly way. (e.g. graph, chart, etc)                                                                                                                         | one of those 3-axis triangle charts for might/speed/int       |
| 1.7 | Create 3 or more unit tests for your application (and document how to run them)                                                                                                         | ok                                                            |
| 1.8 | Convert user input between two formats and display the result. (e.g. Fahrenheit to Celcius, kilograms to pounds, etc)                                                                   | Convert imperial <-> metric units in ability descriptions etc |
| 1.9 | Calculate and display data based on an external factor (ex: get the current date, and display how many days remaining until some event)                                                 |                                                               |

### List 2 (choose at least 1)

| ID  | FEATURE                                                                                                           | numa.JS                                  |
| --- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 2.1 | Retrieve data from a third-party API and use it to display something within your app.                             |                                          |
| 2.2 | Create a form and store the submitted values using an external API (e.g. a contact form, survey, etc).            | Character sheet (store on Pantry or w/e) |
| 2.3 | Persist data to an external API and make the stored data accessible in your app (including after reload/refresh). | Load character sheet from Pantry or w/e  |

### List 3 (choose at least ???)

| ID  | FEATURE                                                                                                                                                                           | numa.JS                                                                                         |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 3.1 | Create a node.js web server using a modern framework such as Express.js or Fastify.  Serve at least one route that your app uses (must serve more than just the index.html file). | index<br>character maker<br>calculators<br>etc                                                  |
| 3.2 | Interact with a database to store and retrieve information (e.g. MySQL, MongoDB, etc).                                                                                            | Database of character options (types, abilities, cyphers, etc.)                                 |
| 3.3 | Implement modern interactive UI features (e.g. table/data sorting, autocomplete, drag-and-drop, calendar-date-picker, etc).                                                       | Autocomplete for valid descriptors, types, foci; drag-and-drop equipment on/off; sort inventory |
| 3.4 | Develop your project using a common JavaScript framework such as React, Angular, or Vue.                                                                                          | Vue or Svelte maybe?                                                                            |

