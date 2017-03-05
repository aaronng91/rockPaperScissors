#!/bin/bash

# Install local http-server and Angular CLI
npm install -g http-server @angular/cli@1.0.0-rc.1

# Install project dependencies
npm install

# Build app
ng build --prod

# Serve up built app
http-server dist/
