const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, '/views/partials'));
// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.status(200).render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
  .getBeers()
    .then(beersFromApi => {
      res.status(200).render("beers", { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
    .then(beer => {
      res.status(200).render("random-beer", beer[0]);
    })
    .catch(error => console.log(error));
});
// Ho he copiat d'internet, ho entenc i no ho entenc a la vegada. És a dir, quan l'usuarix
// fa click sobre un dels títols de la birra (partial) alla està l'href que indica l'url
// on anirem (amb l'id de la birra en concret), aleshores quan fem el click 
//es fa una request del paràmetre d'Id de l'url i s'utilitza aquest valor per per printar/enviar 
//la birra que coincideix amb aquest ID? No sé, ja et dic, ho entenc i no ho entenc
app.get('/beers/:beerId', (req, res, next) => {
  punkAPI
    .getBeer(req.params.beerId)
    .then(beer => {
      res.render('beer-details', beer[0]);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
