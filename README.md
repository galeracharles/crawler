# Crawler

This repository contains a web crawler implemented in TypeScript that extracts product data from the website **"www.pluszaki.com."** The crawler utilizes the Playwright library for web scraping and csv-writer for writing the extracted data to a CSV file.

## Setup

1. Clone the repository or download the script file to your local machine.
2. Install dependecies.

```
cd <project-folder>
npm install
```

## Usage

To start the web crawling process and extract product data, run the following command:

```
npm start
```

The crawler will visit the pages of the website "www.pluszaki.com," scrape product information such as name, image URL, price, product URL, and currency. It will then save the extracted data to a CSV file named "products.csv" in the root directory of the project.

Please note that running the crawler may take some time, depending on the number of pages to be scraped and the website's response time.

## Dependencies

This web crawler script utilizes the following dependencies:

- **playwright**: A Node.js library for automating browsers. It is used here to interact with web pages and perform web scraping tasks.
- **csv-writer**:  A simple CSV writing library for Node.js. It allows writing data to a CSV file with specified headers and records.

