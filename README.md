# How to use
Replace contents of app.js with file of choice then comment out globals in index.js.
Ensure project is setup:
```shell
yarn
yarn lerna:prepare
yarn tests:ios:pod:install
brew tap wix/brew
brew install applesimutils xcbeautify
```

Build each app:
```shell
yarn tests:ios:build
yarn tests:android:build
```
Then run in one terminal:
```shell
yarn tests:packager:jet-reset-cache
```
Then run either on a terminal:
```shell
yarn tests:ios:test
yarn tests:android:test
```
