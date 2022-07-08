# Card Validation

## Prerequisites to build

- Android Studio ([Download](https://developer.android.com/studio))
  - This is optional, but can be very useful in debugging applications and managing configurations.
- Cocoapods
  - macOS: `brew install cocoapods`
- Flipper ([Installation](https://fbflipper.com/docs/getting-started/index#installation) instructions)
  - macOS: `brew install --cask flipper`
- Node v14.19.0
- Xcode ([Download](https://developer.apple.com/xcode/) or use the [macOS App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12))

## Dependency Installation

```bash
yarn
```

### Linking in iOS

```bash
cd ios && pod install
```

## Running the App

See [Running On Device](https://reactnative.dev/docs/running-on-device)

### Run Project in iOS

To build and open the simulator without opening Xcode.

 The app couldn't be compiled on iOS due to a bug in the latest version of RN, it hasn't been fixed yet,.
https://github.com/facebook/react-native/issues/34106

```bash
yarn ios
```

A custom simulator can be provided as a command line argument as well; see [Running on Simulator](https://reactnative.dev/docs/running-on-simulator-ios).

### Run Project in Android

To build and open the simulator without opening Android Studio.

```bash
yarn android
```

## How to run tests:
- `yarn install` to install all dependencies.
- `yarn test` to start running tests.