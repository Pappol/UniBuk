import express from 'express';
import morgan from 'morgan';

const app = express();

// Log packet
app.use(morgan('dev'))
app.use((req, res, next) => {
  //set degli headers (non invia la risposta)
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Request-Width, Content-Type, Accept, Authorization');
  //OPTIONS è un metodo di controllo per vedere se puoi fare un certo tipo di richiesta
  if(req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/:boooks', (req, res) => {
  res.status(200).json(
    {
      books: [
        {isbn: '1234', title: 'Dragon Book', author: 'qu4gl14', year: '1964', editor: 'boh', description: 'lfc'},
        {isbn: '1234', title: 'Dragon Book', author: 'qu4gl14', year: '1964', editor: 'boh', description: 'lfc'},
        {isbn: '1234', title: 'Dragon Book', author: 'qu4gl14', year: '1964', editor: 'boh', description: 'lfc'},
        {isbn: '1234', title: 'Dragon Book', author: 'qu4gl14', year: '1964', editor: 'boh', description: 'lfc'}
      ]
    }
  );
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
