# expensetracker

For our first project, Levi, Alfredo and I put together an app that will keep track of your profits and losses for a self determined period of time. It purposely requires your full input in order to require self discipline and accountability so that you can keep track of your expenditures. In this way, anyone can see how they spend their money and decide how best to become more financially responsible.

Acceptance criteria:

* Speak technically about a feature you implemented in your project
* Explain and execute git branching workflow in a collaborative project
* Resolve merge conflicts
* Explain agile software development
* Design, build, and deploy a client-side web application using GitHub Pages
* Prepare a professional presentation and repository README for your project



The final page:
 https://levickane.github.io/expensetracker/

## Visuals

<img src="assets/images/expenseTrackerLargeScreen.png"/>

<img src="assets/images/expenseTrackerModal.png"/>

<img src="assets/images/expenseTrackerSmallScreen.png"/>

## Usage

Click the Add Item button and fill out each section. Choose a date, select a corresponding emoji to the event, add a description, select whether it's a profit or a loss and enter the amount receieved or spent. Submit, and all your information will be entered on the page in order of earliest to latest date. If desired, delete any item line as necessary or clear via clear button to start again.

Behind the scenes, once the page is loaded, the modal, dropdown menus and datepicker are ready to go. When the button to add an item is clicked, the modal is pulled up with our form inserted there. The fields are set up to require inputs, specifically numbers or text where appropriate, and won't be submittable until everything is filled out. The api is called in the process on click, loops through all data pulled and populates the emoji dropdown menu. On submit button click, everything from the form is passed into their own function by loop in order to append each piece to the corresponding row on the main page, ordering them by date as they're passed into local storage and pulled back out for creation of the line and appending in their correct order. Background color of each line is determined by diving into the document and checking whether it was set to profit or loss. The item total is put into an array and then added to the title area in order to show total profit or loss for every item added as they are input. Each line has its own clear button that can be clicked to remove them seperately from the page and local storage, if desired. Finally, the clear button removes all lines and clears local storage on click to start over.

A bit part of this project in general, and as a group, was the learning process involved in the collaborative group github. Working with each other to keep one instance updated and everyone on the same page. 


