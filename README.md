This is a telephone directory project based on [Ionic](http://ionicframework.com/docs/) framework (v3.7)

## How to use this project

*This template does not work on its own*. You have to install the plugins after clonning this repo to your PC.

### With the Ionic CLI:

After clonning the repo `oagt`, enter the following commands in sequence as shown below :

```bash
$ cd oagt
$ ionic cordova plugin add call-number
$ npm install --save @ionic-native/call-number

```
This is necessary otherwise `call number` plugin will throw an error even if we add it to package.json

Now to add the plugins, run :

```bash
$ npm install
```
and finally run it in browser or an android device using either of these commands : 

```bash
$ ionic serve
$ ionic cordova run android
```
