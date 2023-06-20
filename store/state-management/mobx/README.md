# Mobx

MobX is a state management library that manage the state of your application by providing a simple and efficient way to create observable state objects, and automatically updating the user interface when the state changes.

The basic idea behind MobX is that you create observable objects that represent the state of your application. These objects can be simple JavaScript objects, or more complex data structures like arrays or maps. When you make changes to the state, MobX automatically tracks those changes and updates any components that depend on that state.

## Installation

Follow the installation guide for Mobx working with Typescript (here)[https://mobx.js.org/installation.html]

## How to use Mobx

If you have never used Mobx before, we recommended that you start by reading (the gist of Mobx)[https://mobx.js.org/the-gist-of-mobx.html]

To set up redux on the fly, you can see all the files below and read the comments.

(Its best to read in the following order)

**Setting up the store**
`store/state-management/mobx/post-store.ts`