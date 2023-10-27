import express, { response } from "express"
import axios, { all } from "axios"
import bodyParser from "body-parser"

const app = express();
const port = 8000;
const ALL_API_URL = "https://restcountries.com/v3.1/";
const NAME_API_URL = "https://restcountries.com/v3.1/name/";
const CAPITAL_API_URL = "https://restcountries.com/v3.1/capital/";
const LANGUAGE_API_URL = "https://restcountries.com/v3.1/lang/";
const REGION_API_URL = "https://restcountries.com/v3.1/region/";
const SUBREGION_API_URL = "https://restcountries.com/v3.1/subregion/";
let apiData;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

async function fetchAllValues() {
    try {
        const response = await axios.get(ALL_API_URL + "all");
        const countries = response.data;
        const names = new Set();
        const capitals = new Set();
        const languages = new Set();
        const regions = new Set();
        const subregions = new Set();

        // Itera attraverso la lista dei paesi e estrai regioni e sottoregioni
        countries.forEach(country => {
            if (country.name.common) {
                names.add(country.name.common);
            }
            if (country.capital) {
                if (Array.isArray(country.capital)) {
                    country.capital.forEach(capital => capitals.add(capital));
                } else {
                    capitals.add(country.capital);
                }
            }
            if (country.languages) {
                const languageValues = Array.isArray(country.languages)
                    ? country.languages.map(language => language)
                    : Object.values(country.languages);
                languageValues.forEach(language => languages.add(language));
            }
            if (country.region) {
                regions.add(country.region);
            }
            if (country.subregion) {
                subregions.add(country.subregion);
            }
        });
        return {
            names:      Array.from(names).sort(),
            capitals:   Array.from(capitals).sort(),
            languages:  Array.from(languages).sort(),
            regions:    Array.from(regions).sort(),
            subregions: Array.from(subregions).sort()
        };
    } catch (error) {
        console.error("Errore nella richiesta all'API:", error);
        throw error; // Lancia l'errore per essere gestito altrove, se necessario
    }
}
app.get("/", async (req, res)=>{
    try {
        const response = await axios.get(ALL_API_URL + "all");
        apiData = response.data;

        res.render("index.ejs", {
            content:    apiData,
        });
    } catch (error) {
        res.status(500).send(`Country request error`);
    }
});

app.post("/", (req, res)=> {
    const searchType = req.body.searchType;
    res.redirect(`/search_type?searchType=${searchType}`);
});


app.get("/search_type", async (req, res)=>{
    const searchType = req.query.searchType;
    const allValues = await fetchAllValues();
    console.log("ALL REGIONS", allValues.regions);
    console.log("ALL SUBREGION", allValues.subregions);
    res.render("search_type.ejs", {
        content:    searchType,
        names:      allValues.names,
        capitals:   allValues.capitals,
        languages:  allValues.languages,
        regions:    allValues.regions,
        subregions: allValues.subregions,
        });
});

app.post("/search_type", async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const searchType = req.body.searchType;

    try {
        let response;
        switch (searchType) {
            case 'name':
                response = await axios.get(NAME_API_URL + searchTerm);
                apiData = response.data;
                if (apiData.length > 0) {
                    res.redirect(`/result?country=${apiData[0].name.common}`);
                } else {
                    res.status(404).send('Nessun paese trovato con questo nome.');
                }
                break;
            case 'capital':
                response = await axios.get(CAPITAL_API_URL + searchTerm);
                apiData = response.data;
                if (apiData.length > 0) {
                    res.redirect(`/result?country=${apiData[0].name.common}`);
                } else {
                    res.status(404).send('Nessun paese trovato con questa capitale.');
                }
                break;
            default:
                res.redirect(`/list_results?searchType=${searchType}&searchTerm=${searchTerm}`);
                break;
        }
    } catch (error) {
        console.error('Errore durante la richiesta al server API:', error);
        res.status(500).send('Errore durante la ricerca del paese. Si prega di riprovare più tardi.');
    }
});
app.get("/list_results", async (req, res)=>{
    try {
        const searchTerm = req.query.searchTerm;
        const searchType = req.query.searchType;
        console.log("SEARCH TYPE", req.query.searchType);
        console.log("SEARCH TERM", searchTerm);
        let response;
        switch (searchType) {
            case 'language':
                response = await axios.get(LANGUAGE_API_URL + searchTerm);
                apiData = response.data;
                res.render("list_results.ejs", {
                    content: apiData,
                });
                break;
            case 'region':
                response = await axios.get(REGION_API_URL + searchTerm);
                apiData = response.data;
                res.render("list_results.ejs", {
                    content: apiData,
                });
                break;
            case 'subregion':
                response = await axios.get(SUBREGION_API_URL + searchTerm);
                apiData = response.data;
                res.render("list_results.ejs", {
                    content: apiData,
                });
                break;
            default:
                res.status(400).send('Tipo di ricerca non supportato');
                break;

        }
    } catch (error) {
        res.status(500).send(`Country request error`);
    }
});

app.get("/country_list", async (req, res)=>{
    try {
        const response = await axios.get(ALL_API_URL + "all");
        apiData = response.data;

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
            res.render("result.ejs", {
                country: selectedCountry,
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

app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});

