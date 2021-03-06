# Dillon Panther's Capstone Project

## Welcome to our social application: [Live Music Mapper](https://livemusicmapper.herokuapp.com/).

Live Music Mapper is a social application that allows users to search for concerts based on their geo-location, to connect with friends and to see which concerts they are attending. Users can connect their Spotify accounts to get personalized event recommendations based on their music taste.

---

### Set-up

Before starting up for the first time, please run:

```
npm i
npm run start:dev
npm run seed
```

You can then run in a development environment with the `build:dev` and `start:dev` scripts. These will run webpack and nodemon, respectively, with watch flags to catch any changes.

---

### To add users to our beta program:

1. Provide name and email to [Live Music Mapper](https://github.com/DillonPanthers/LiveMusicMapper/issues). Once you provide this information it will take a day for processing.
2. Log into [Spotify's Developer Dashboard](https://developer.spotify.com/dashboard/) to accept terms.

---

### Keeping this repo up-to-date

#### Contributing code & submitting PRs

1. On your development branch `git pull <remote> development`
2. Write new code on a separate branch `git checkout -b <branch>`
3. Commit your code

```
git status
git add .
git commit -m 'semantic commit message`
```

4. Push code on newly created branch to this repo `git push <remote> <branch>`
5. Create a pull create request and assign to an engineer for review. Fix all feedback received from reviewer.
6. Merge code to development when the pull request has been approved. Delete branch.
7. Repeat!

#### Merging development changes while working on a branch

1. Commit any changes in your branch
2. Checkout the development branch `git checkout development`
3. Pull the latest development branch `git pull <remote> development`
4. Checkout the branch you were working on `git checkout <branch>`
5. Merge this branch with the development branch `git merge development`
6. Resolve any merge conflicts, usually you will accept incoming changes
7. Commit the merged changes
