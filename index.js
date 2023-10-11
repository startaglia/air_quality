import express, { response } from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 8000;
const API_URL = "http://api.airvisual.com/v2/";
const API_KEY = "6365e193-26c5-4c70-8ad7-244fdeeda85c";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res)=>{
    res.render("index.ejs");
});

app.get("/usage", (req, res)=>{
    res.render("usage.ejs");
});

app.post("/", async (req, res)=>{
    // http://api.airvisual.com/v2/city?city=Los Angeles&state=California&country=USA&key={{YOUR_API_KEY}}
    // console.log("URL" + API_URL + "city?city=" + searchNav + "&state=California&country=USA&key=" + API_KEY);
    try {
        const searchNav = req.body.searchNav;
        const response = await axios.get(API_URL + "city?city=" + searchNav + "&state=California&country=USA&key=" + API_KEY);

        console.log("RISULTATO" + JSON.stringify(response.data));
        // "&state=" + searchNav + "&country=" + searchNav + "&key=" + API_KEY);
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
