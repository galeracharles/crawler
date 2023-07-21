import { chromium, Browser, Page } from "playwright";
import { createObjectCsvWriter } from "csv-writer";
import { Product } from "./types/products.types";

const basetUrl = "https://www.pluszaki.com/kategoria.php?page=";
const productSelector = ".produkt_in";
const pageSelector = ".pageNext";

const crawler = async () => {
  const browser: Browser = await chromium.launch();
  const page: Page = await browser.newPage();

  const products: Product[] = [];

  let currentPage = 1;

  await page.goto(basetUrl + currentPage);

  while (true) {
    const productElements = await page.$$(productSelector);
    for (const element of productElements) {
      const product: Product = {
        name: "",
        image: "",
        price: "",
        url: "",
        currency: "",
      };

      const nameHandle = await element.$('.nazwa span[itemprop="name"]');
      product.name =
        (await (await nameHandle?.getProperty("textContent"))?.jsonValue()) ||
        "";

      const imageHandle = await element.$('.foto img[itemprop="image"]');
      product.image =
        (await (await imageHandle?.getProperty("src"))?.jsonValue()) || "";

      const priceHandle = await element.$('.cena span[itemprop="offers"]');
      product.price =
        (
          await (await priceHandle?.getProperty("textContent"))?.jsonValue()
        ).replace(/[^\d,]/g, "") || "";

      const urlHandle = await element.$('.nazwa a[itemprop="url"]');
      product.url =
        (await (await urlHandle?.getProperty("href"))?.jsonValue()) || "";

      const currencyHandle = await element.$(
        '.cena span[itemprop="priceCurrency"]'
      );
      product.currency =
        (await (
          await currencyHandle?.getProperty("textContent")
        )?.jsonValue()) || "";

      products.push(product);
    }

    const nextPageLink = await page.$(pageSelector);
    if (!nextPageLink) break;

    currentPage++;
    await nextPageLink.click();
    await page.waitForLoadState("domcontentloaded");
  }

  const csvWriter = createObjectCsvWriter({
    path: __dirname + "/products.csv",
    header: [
      { id: "name", title: "Name" },
      { id: "image", title: "Image" },
      { id: "price", title: "Offers" },
      { id: "url", title: "URL" },
      { id: "currency", title: "Currency" },
    ],
  });

  await csvWriter.writeRecords(products);

  await browser.close();
};

crawler();
