import express, { response } from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 8000;
const API_URL = "http://api.airvisual.com/v2/";
const API_KEY = "6365e193-26c5-4c70-8ad7-244fdeeda85c";
let countriesArray;
let statesArray;
let citiesArray;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/usage", (req, res)=>{
    res.render("usage.ejs");
});

app.get("/country_list", async (req, res)=>{

    try {
        const response = await axios.get(API_URL + "countries?key=" + API_KEY);
        countriesArray = response.data.data.map(item => item.country);
        res.render("country_list.ejs", {
            content: countriesArray,
        });
    } catch (error) {
        res.status(500).send(`Country request error`);
    }
});

app.post("/country_list", (req, res)=>{
    res.render("state_list.ejs", {
        content: req.body.country,
    });
});


app.get("/state_list", async (req, res)=>{
    try {
        const response = await axios.get(API_URL + "states?country=" + req.query.country + "&key=" + API_KEY);
        statesArray = response.data.data.map(item => item.state);
        res.render("state_list.ejs", {
            content : statesArray,
        });
    } catch (error) {
        res.status(500).send(`State request error`);
    }
});

app.post("/state_list", (req, res)=>{
    console.log("RISPSOTA: ", req.query.country);
    res.redirect(`/city_list?country=${country}&state=${req.body.state}`);
});

app.get("/city_list", async (req, res)=>{
    // try {
    //     const response = await axios.get(API_URL + "cities?state=" + req.query.country + "&country=" + country + "&key=" + API_KEY);
    //     statesArray = response.data.data.map(item => item.state);
    //     res.render("state_list.ejs", {
    //         content : statesArray,
    //     });
    // } catch (error) {
    //     res.status(500).send(`State request error`);
    // }
});

// app.post("/country_list", (req, res)=>{
//     res.render("state_list.ejs", {
//         content: req.body.country,
//     });
// });

//     const response = await axios.get(API_URL + "cities?state=" + state + "&country=" + country + "&key=" + API_KEY);

app.get("/search", (req, res)=>{
    res.render("search.ejs");
});



app.post("/", async (req, res)=>{
    // console.log(req.suppCountries);
    /*MILESTONE:
    1.FARE LA RICHIESTA PER OTTENERE TUTTI GLI STATI CHE SUPPORTANO IL SERVIZIO
    2.IN BASE ALLO STATO FARE LA RICHIESTA PER OTTENERE TUTTI I PAESI CHE SUPPORTANO IL SERVIZIO
    3.IN BASE AL PAESE FARE LA RICHIESTA PER OTTENERE I DATI DELLA CITTÀ RICHIESTA
    */
    // http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key={{YOUR_API_KEY}}
    // console.log("URL" + API_URL + "city?city=" + searchNav + "&state=California&country=USA&key=" + API_KEY);
    try {
        const searchNav = req.body.searchNav;
        const response = await axios.get(API_URL + "city?city=" + searchNav + "&state=" + searchNav + "&country=" + searchNav + "&key=" + API_KEY);
        // "&state=California&country=USA&key=" + API_KEY);

        console.log("RISULTATO" + JSON.stringify(response.data));
        res.render("result.ejs");
    } catch (error) {
        console.log("ERRORE");
        res.status(404);
    }
    console.log("BODYPARSER", req.body.searchNav);
    res.render("result.ejs");
});

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});



// app.get("/apiKey", async(req, res) => {
//     //TODO 4: Write your code here to hit up the /filter endpoint
//     //Filter for all secrets with an embarassment score of 5 or greater
//     //HINT: You need to provide a query parameter of apiKey in the request.
//       try {
//           const response = await axios.get(API_URL + "filter?score=5&apiKey=" + yourAPIKey);
//           const jsonData = JSON.stringify(response.data);
//           res.render("index.ejs", {
//               content: jsonData,
//           });
//       } catch (error) {
//           console.log("Failed to make request:", error.message);
//           res.render("index.ejs", {
//               error: error.message,
//           });
//       }
//   });
