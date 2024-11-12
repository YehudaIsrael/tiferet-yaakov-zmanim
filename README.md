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


## Error handling

If get the following error:

```
[1] [129835:1112/205854.253064:FATAL:setuid_sandbox_host.cc(158)] The SUID sandbox helper binary was found, but is not configured correctly. Rather than run without sandboxing I'm aborting now. You need to make sure that node_modules/electron/dist/chrome-sandbox is owned by root and has mode 4755.
```

Run the following code:

- `sudo chown root node_modules/electron/dist/chrome-sandbox`
- `sudo chmod 4755 node_modules/electron/dist/chrome-sandbox`