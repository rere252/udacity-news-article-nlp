# Udacity Front End Web Developer Nanodegree Program Project #4: Evaluate a news article with Natural Language Processing

A news article sentiment analyzer app. Uses [Meaning Cloud](https://www.meaningcloud.com/developer/sentiment-analysis)'s API for getting the sentiment. App is created specifically for [ERR news](https://news.err.ee).

## To Run The Project

You need a [Meaning Cloud](https://www.meaningcloud.com) API key to run the project. Add the key to the .env (you need to create the file) file in project's root directory or provide from the command line like `MEANING_CLOUD_API_KEY=your_key_here npm start`.

To resolve dependencies run `npm install`. To launch the production build run `npm start`. The server will be started on port `8081`. To start the app in development configuration run `npm run start-dev`. The client app will then be accessible from port `8080` while backend is running on port `8081`. In this case the API requests are proxied to the backend server.
