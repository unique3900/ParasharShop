const products = [
  { id: 1, title: "Laptop", price: 999.99 },
  { id: 2, title: "Smartphone", price: 499.99 },
    { id: 3, title: "Headphones", price: 79.99 },
    { id: 4, title: "Acer Niro 5 Laptop", price: 699.99 },
    { id: 5, title: "Dell Laptop", price: 999.99 },
];
const productHashTable = {};
products.forEach((product) => {
  const key = product.title.toLowerCase(); // Convert titles to lowercase for case-insensitive search
  productHashTable[key] = product;
});

// Function to perform hash-based search and push matching products to an array
function searchProductsByTitle(targetTitle) {
  const lowerTargetTitle = targetTitle.toLowerCase();
  const matchingProducts = [];

  Object.keys(productHashTable).forEach((key) => {
    if (key.includes(lowerTargetTitle)) {
      matchingProducts.push(productHashTable[key]);
    }
  });

  return matchingProducts;
}
const targetTitle = "";
const foundProducts = searchProductsByTitle(targetTitle);

if (foundProducts.length > 0) {
  console.log(`Products with title including '${targetTitle}':`);
  foundProducts.forEach((product) => console.log(product));
} else {
  console.log(`No products found with title including '${targetTitle}'.`);
}

//   Pseudo code

/*

// Sample product data
products = [
    { id: 1, title: 'Laptop', price: 999.99 },
    { id: 2, title: 'Smartphone', price: 499.99 },
    { id: 3, title: 'Headphones', price: 79.99 },
    // ... other product entries
  ]
  
  // Create a hash table based on product titles
  productHashTable = {}
  
  for each product in products:
    key = convertToLowerCase(product.title) // Convert titles to lowercase for case-insensitive search
    productHashTable[key] = product
  
  // Function to perform hash-based search and push matching products to an array
  function searchProductsByTitle(targetTitle):
    lowerTargetTitle = convertToLowerCase(targetTitle)
    matchingProducts = []
  
    for each key in keys of productHashTable:
      if key.includes(lowerTargetTitle):
        push productHashTable[key] to matchingProducts
  
    return matchingProducts
  
  // Example usage
  targetTitle = 'phone'
  foundProducts = searchProductsByTitle(targetTitle)
  
  if length of foundProducts > 0:
    print "Products with title including '", targetTitle, "':"
    for each product in foundProducts:
      print product
  else:
    print "No products found with title including '", targetTitle, "'."
  */


// Algorithm
/*
Algorithm: HashBasedSearchProducts

Input:
  - products: an array of products with titles
  - targetTitle: the title to search for

Output:
  - foundProducts: an array of products whose titles include the targetTitle

1. Create an empty hash table productHashTable

2. for each product in products:
    a. key = convertToLowerCase(product.title)
    b. productHashTable[key] = product

3. Create an empty array matchingProducts

4. lowerTargetTitle = convertToLowerCase(targetTitle)

5. for each key in keys of productHashTable:
    a. if key includes lowerTargetTitle:
        i. push productHashTable[key] to matchingProducts

6. Return matchingProducts
*/