import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

const clientID = "13993b5b-5c3b-4e78-b7af-2ee2d7f3726b";
const clientSecret = "UNZBhkPMDRAtXogh";
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTczMjU2LCJpYXQiOjE3MjE5NzI5NTYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjEzOTkzYjViLTVjM2ItNGU3OC1iN2FmLTJlZTJkN2YzNzI2YiIsInN1YiI6InNhaWhhcnNoaXRoYW1hbmRhcGFsbGlAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiIxMzk5M2I1Yi01YzNiLTRlNzgtYjdhZi0yZWUyZDdmMzcyNmIiLCJjbGllbnRTZWNyZXQiOiJVTlpCaGtQTURSQXRYb2doIiwib3duZXJOYW1lIjoiUmFodWwiLCJvd25lckVtYWlsIjoic2FpaGFyc2hpdGhhbWFuZGFwYWxsaUBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMUwzMUEwNUQ2In0.YSX_oOwM1rVHbigoWmjbEbUSgcD6tts6feFdcchLJQc";

const fetchCall = async (category, company, n, page = 1) => {
  const url = `http://20.244.56.144/test/companies/${company}/categories/${category}/products?top=${n}&minPrice=1&maxPrice=50000`;

  const headers = {
    Authorization: `Bearer ${access_token}`,
    'Content-Type': 'application/json'
  };

  const params = { limit: n, page };
  try {
    const response = await axios.get(url, { headers, params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
};

app.get('/test/companies/:company/categories/:category/products', async (req, res) => {
  try {
    const { company, category } = req.params;
    const top = parseInt(req.query.top) || 10;
    const page = parseInt(req.query.page) || 1;
    const sortBy = 'rating';
    const sortOrder = 'asc';

    let products = await fetchCall(category, company, top, page);

    products.sort((a, b) => {
      const aValue = a[sortBy] || 0;
      const bValue = b[sortBy] || 0;
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    const total = products.length;
    if (top < total) {
      products = products.slice((page - 1) * top, page * top);
    } else {
      products = products.slice(0, top);
    }

    const response = {
      total: totalProducts,
      page,
      products
    };

    console.log(response);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
