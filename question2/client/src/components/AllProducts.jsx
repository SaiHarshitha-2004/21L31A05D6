
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid} from '@mui/material';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    company: '',
    rating: '',
    price_range: '',
    sort_by: 'rating',
    sort_order: 'desc'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/categories/all/products`, {
          params: {
            ...filters
          }
        });
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [filters]);

  return (
   <>
    <div className='text-blue-500 text-center'>All Products</div>
    <Container>
      <Grid container spacing={3}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
    </Container>
    </>
  );
};

export default AllProducts;