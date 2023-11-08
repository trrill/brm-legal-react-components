
## App Throuple, Shared Components... in progress

In /src/apps are two (soon three) similar but different apps. They're all built around the same concepts—fetching entity (products for law practices), taxonomy (type, audience), and meta data (features) from custom WordPress REST API endpoints, and using the interface built on that data to filter those entities by combinable attributes.

For now I like to just switch the app and Redux store paths in index.js depending on the app I'm working with.

## Available Scripts

Sorta normal—just named per app.

### `npm run start:providers`
### `npm run start:transparency`

and

### `npm run build:providers`
### `npm run build:transparency`

Both scripts run an intermediate step that builds the Tailwind CSS package relevant to each app.





This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).