# Status:

#### Usable / Complete-ish

### Am I working on this?

##### Not currently, but I do plan to add more functionality eventually.

# Project info:

### Date created:

##### 6/25/22

### Goal:

##### Reminder to do work with a text every night so the reminder is on phone in the morning.

### Requirements:

- ##### Node.js in order to run program with npm
- ##### Valid email address that allows external use to send texts (optional)

### Uses:

##### This program uses React.js and Electron.js with html/js/css

### How to change email:

##### You must change the email with password and phone number (email) in

> Calendar\test\electron_react\public\main.js

```
var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: 'example@outlook.com',
    pass: 'password'
  }
});

function send_text(text){
console.log(text)
var mailOptions = {
  from: 'Calendar <example@outlook.com>',
  to: '1234567890@vtext.com',
  subject: '',
  text: text
};
```

### How to pin shortcut:

##### [Article with Steps](https://www.digitalcitizen.life/how-pin-any-folder-windows-7-taskbar/)

##### app.bat will fully start the program when clicked. Create the shortcut with it.

![Example of project](https://github.com/coltonk1/Code/blob/main/Calendar/example-image.png)
