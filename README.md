# Example App

This is an example app for the article [The Intelligent Tracking Prevention starting with iOS 14 isn't nice](https://thinktecture.com/en/ios/wkwebview-itp-ios-14/).

## Prerequisites

* Xcode
* Homebrew
* mkcert
* Node 14 or later

## Setup

```shell
npm i
brew install mkcert
mkcert -install
```

### Create SSL certificate with mkcert

```shell
npm run certs
```

### Trust Certificate Authority of mkcert in iOS Simulator

Drag & Drop from `~/Library/Application Support/mkcert` the file `rootCA.pem` onto the running simulator. Check in Settings App under "General > About > Certificate Trust Settings" if trusted.

### Start Express webserver

```shell
npm start
```

### Run the Example app

Open Xcode with workspace file and run.
