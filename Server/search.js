const products = [
  { id: 1, title: "Laptop",description:"Laptop From Samsung", price: 999.99 },
    { id: 2, title: "Smartphone",description:"Best phone From Samsung", price: 499.99 },
    { id: 3, title: "Smartphone",description:"Smartphone b Samsung", price: 599.99 },
    { id: 3, title: "Headphones",description:"Laptop From Samsung", price: 79.99 },
    { id: 4, title: "Acer Niro 5 Laptop",description:"Laptop From Samsung", price: 699.99 },
    { id: 5, title: "Dell Laptop",description:"Laptop From Samsung", price: 999.99 },
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

  //Object.keys(productHashTable) is used to get an array of keys (product titles) from the hash table.
  //The for each key in ... loop then iterates over each title (key) in the array.
    
  Object.keys(productHashTable).forEach((key) => {
    if (key.includes(lowerTargetTitle)) {
      matchingProducts.push(productHashTable[key]);
    }
  });

  return matchingProducts;
}
const targetTitle = "s";
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








// Chaining To Avoid Collision

// Sample product data
// const products = [
//     { id: 1, title: 'Laptop', price: 999.99 },
//     { id: 2, title: 'Smartphone', price: 499.99 },
//     { id: 3, title: 'Smartphone', price: 699.99 },
//     { id: 3, title: 'Headphones', price: 79.99 },
//     // ... other product entries
//   ];
  
//   // Function to convert a string to lowercase
//   function convertToLowerCase(str) {
//     return str.toLowerCase();
//   }
  
//   // Create an array of a certain size to act as the hash table
//   const hashTableSize = 10; // Choose an appropriate size based on the expected number of products
//   const hashTable = Array.from({ length: hashTableSize }, () => []);
  
//   // Hash function to determine the index in the hash table
//   function hashFunction(key) {
//     const hash = key.length % hashTableSize;
//     return hash;
//   }
  
//   // Function to insert a product into the hash table
//   function insertIntoHashTable(product) {
//     const key = convertToLowerCase(product.title);
//     const index = hashFunction(key);
//     hashTable[index].push(product);
//   }
  
//   // Function to search for products based on the target title
//   function searchProductsByTitle(targetTitle) {
//     const lowerTargetTitle = convertToLowerCase(targetTitle);
//     const index = hashFunction(lowerTargetTitle);
  
//     // Search the linked list at the computed index
//     const matchingProducts = hashTable[index].filter(product =>
//       convertToLowerCase(product.title).includes(lowerTargetTitle)
//     );
  
//     return matchingProducts;
//   }
  
//   // Insert products into the hash table
//   products.forEach(product => {
//     insertIntoHashTable(product);
//   });
  
//   // Example usage
//   const targetTitle = 'lap';
//   const foundProducts = searchProductsByTitle(targetTitle);
  
//   if (foundProducts.length > 0) {
//     console.log(`Products with title including '${targetTitle}':`);
//     foundProducts.forEach(product => console.log(product));
//   } else {
//     console.log(`No products found with title including '${targetTitle}'.`);
//   }


/*
The hashTable is an array where each element is a linked list (an array) to handle collisions.
The hashFunction determines the index in the hash table based on the length of the product title.
The insertIntoHashTable function inserts a product into the appropriate linked list at the computed index.
The searchProductsByTitle function searches the linked list at the computed index for products with titles that include the target title.
*/