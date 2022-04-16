const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Akshar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Akshar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Akshar",
    message: "This is some helpful text.",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) return res.send({ error: "You must provide a address!" });

  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({ location, forecast: forecastData, address });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({ products: [] });
});

app.get("*/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Akshar",
    message: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Akshar",
    message: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server running....on port 3000");
});