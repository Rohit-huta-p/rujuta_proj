import React, { useState } from 'react';



const Search = ({products}) => {
  const [query, setQuery] = useState(''); // Search query state

  // Filter products based on search query (searching by title or description)
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update the search query
        className="border p-2 rounded"
      />
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="p-2 border-b">
              <h2>{product.title}</h2>
              <img src={product.image} alt={product.title} style={{ width: '100px' }} />
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Search;
