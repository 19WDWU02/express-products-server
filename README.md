# Express Products Server

Create a new express server that is going to filter out products from a list of json.  
Your server needs to include at least these filters  

1. All Products
2. In Stock
3. Min Price
4. Max Price
5. Min & Max Price
6. Search the name

**Extra** Combine In stock, min price, max price and name search together to create one long filter.  

## Available Endpoints
| Option | URL | Valid Endpoints |
| ------ | ------ | ------ |
| All Products | /all | |
| In Stock | /instock=*:value* | yes, no|
| Min Price | /minPrice=*:value* | number |
| Max Price | /maxPrice=*:value* | number |
| Min & Max Price | /minPrice=*:value*/maxPrice=*:value* | number |
| Search | /search=*:value* | search term |
| All Filters | /instock=*:value*/minPrice=*:value*/maxPrice=*:value*/search=*:value* | The conditions above apply |
