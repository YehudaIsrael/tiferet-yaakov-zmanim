# Zmanim for Tiferet Yaakov

## Installation

- `run yarn`

## Scripts

- `yarn start` - locally runs the React app inside an Electron app
- `yarn package` - creates an Electron build file
- `yarn release` - creates an React app production build and an Electron build file

## Steps to locally run the application and enable automatic reload

- install `pm2` by `npm i -g pm2`
- `cd /path/to/the/project`
- `pm2 start "sleep 30 && npm start" --name my-electron-app --watch`
- `pm2 startup`
- This will generate a command based on your system. Run the generated command to configure PM2 as a service
- `pm2 save`
