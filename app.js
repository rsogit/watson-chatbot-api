const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

const port = 3000;

app.get('/conversation/:text*?', (req, res) => {
  const { text } = req.params;

  res.json(text);
});

app.listen(port, () => console.log(`Running on port ${port}`));