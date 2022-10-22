const express = require('express');
const cors = require('cors');
const divisionData = require('./data/divisionData.json');
const placeData = require('./data/placeData.json');
const hotelData = require('./data/hotelData.json');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// API Test
app.get("/", (req, res) => {
    res.send("This server is working fine.");
});

// Division Data
app.get("/divisions", (req, res) => {
    res.send(divisionData);
});

app.get("/division/id/:division_id", (req, res) => {
    const id = req.params.division_id;
    const division = divisionData.find(div => div.division_id === id) || [];
    res.send(division);
});

app.get("/division/title/:division_title", (req, res) => {
    const title = req.params.division_title;
    const division = divisionData.find(div => div.division_title.toLowerCase() === title.toLocaleLowerCase()) || [];
    res.send(division);
});

// Place Data
app.get("/places", (req, res) => {
    res.send(placeData);
});

app.get("/place/id/:place_id", (req, res) => {
    const id = req.params.place_id;
    const place = placeData.find(place => place.place_id === id) || [];
    res.send(place);
});

app.get("/places/division_id/:division_id", (req, res) => {
    const id = req.params.division_id;
    const places = placeData.filter(place => place.division_id === id) || [];
    res.send(places);
});

app.get("/places/division_title/:division_title", (req, res) => {
    const title = req.params.division_title;
    const places = placeData.filter(place => place.division_title.toLowerCase() === title.toLowerCase()) || [];
    res.send(places);
});

// Hotel Data
app.get("/hotels", (req, res) => {
    res.send(hotelData);
});

app.get("/hotel/id/:hotel_id", (req, res) => {
    const id = req.params.hotel_id;
    const hotel = hotelData.find(hotel => hotel.hotel_id === id) || [];
    res.send(hotel);
});

app.get("/hotels/place_id/:place_id", (req, res) => {
    const id = req.params.place_id;
    const hotels = hotelData.filter(hotel => hotel.place_id === id) || [];
    res.send(hotels);
});

app.get("/hotels/division_title/:division_title", (req, res) => {
    const title = req.params.division_title;
    const hotels = hotelData.filter(hotel => hotel.division_title.toLowerCase() === title.toLowerCase()) || [];
    res.send(hotels);
});

// Listen Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});