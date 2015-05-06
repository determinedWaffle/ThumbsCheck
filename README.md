[![Stories in Ready](https://badge.waffle.io/determinedWaffle/determinedWaffle.png?label=ready&title=Ready)](https://waffle.io/determinedWaffle/determinedWaffle)
# Thumbs Check

> Enhanced real-time classroom interaction and analytics

## Team

  - __Product Owner__: Mike Yao
  - __Scrum Master__: Andy Sponring
  - __Development Team Members__: Austin Liu, David Trinh, Mike Yao, Andy Sponring

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

To view a live hosted instance of the app, visit [this link](https://waffleup.firebaseapp.com/).

You will be asked to login via GitHub. Once you have authorized the application, you will be taken to the main view for a student. When an instructor initiates a poll (either a thumbs check or a mini-quiz), this page will be updated with the poll.

If you would like to use the app as an instructor, you will need to add your GitHub user id to the 'instructors' object in Firebase. Contact the team for details.

## Requirements

- Node 0.10.x
- Express 4.x
- Firebase Instance

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g grunt-cli
npm install
```

### Set up Firebase

Create your own Firebase instance and change the Firebase URL in /app/scripts/angularfire/config.js. The Firebase URL is stored in the constant 'FBURL'.

The only required task in Firebase is to create a key called 'instructors'. The value of this key will be an object with keys in this format: 'github:{github_user_id}' (eg, 'github:123456). The value of this latter key should be a string containing the instructor's display name, eg "Fred Zirdung".

### Start local server

In the root directory:

```sh
node server.js
```

In your browser open 'http://localhost:3000'.

## Roadmap

View the project roadmap [here](https://github.com/determinedWaffle/determinedWaffle/issues)


## Contributing

See [CONTRIBUTING.md](https://github.com/determinedWaffle/determinedWaffle/blob/master/_CONTRIBUTING.md) for contribution guidelines.

