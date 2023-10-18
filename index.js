import express, { response } from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 8000;
const API_URL = "https://restcountries.com/v3.1/";
const API_KEY = "6365e193-26c5-4c70-8ad7-244fdeeda85c";
let apiData;

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

        const response = await axios.get("https://restcountries.com/v3.1/all");

        // const response = await axios.get(API_URL + "countries?key=" + API_KEY);
        // countriesArray = response.data.map(item => item.name);
        // const countryNamesArr = response.data.map(item => item.name.common);
        apiData = response.data;
        // countriesArray.sort();
        res.render("country_list.ejs", {
            content:    apiData,
        });
    } catch (error) {
        res.status(500).send(`Country request error`);
    }
});

app.post("/country_list", (req, res)=>{
    const country = req.body.country;
    res.redirect(`/result?country=${country}`);
});

app.get("/result", async (req, res) => {
    try {
        const countryName = req.query.country;

        // Trova il paese nel tuo array di dati
        const selectedCountry = apiData.find(item => item.name.common === countryName);

        if (selectedCountry) {
            console.log(selectedCountry);
            // Se il paese è stato trovato, puoi accedere alle sue proprietà
            // const capital = selectedCountry.capital[0]; // Ottieni la capitale dal paese selezionato

            res.render("result.ejs", {
                country: selectedCountry, // Passa il nome del paese
                // capital: capital, // Passa il nome della capitale
            });
        } else {
            // Se il paese non è stato trovato nei dati, gestisci l'errore
            res.status(404).send("Country not found");
        }
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});




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
