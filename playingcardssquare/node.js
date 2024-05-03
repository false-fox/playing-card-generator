//2024-05-03 false-fox @ falsefox.dev
//GPL 3.0 Licensed

let symbols = ["♥️", "♣", "♦️", "♠"];
let numbers = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

let current = [];

const puppeteer = require("puppeteer");

const fs = require("fs");
const path = require("path");

for (let i = 0; i < symbols.length; i++) {
  for (let y = 0; y < numbers.length; y++) {
    current.push(`${symbols[i]}`, `${numbers[y]}`);
    console.log(`${symbols[i]} ${numbers[y]}`);

    let color = "";

    if (symbols[i] === "♠" || symbols[i] === "♣") {
      color = "black";
    } else if (symbols[i] === "♥️" || symbols[i] === "♦️") {
      color = "#f9222c";
    }

    let leftMargin = "1in";
    let classt = "number";

    if (numbers[y] === "Q") {
      leftMargin = "0.6in";
    }

    if (numbers[y] === "A" || numbers[y] === "K") {
      leftMargin = "0.7in";
    }

    if (numbers[y] === "10") {
      classt = "number10";
    }

    let html = `
            <html>
            <head>
                <style>
                #card {
                    color: ${color};
                    background-color: white;
                    width: 3.5in;
                    height: 3.5in;
                    color: black;
                    text-align: center;
                    font-size: 8em;
                    display: flex;
                    flex-direction: column;
                    max-height: 3.5in;
                    flex-basis: 0;
                    margin: 0px;
                    font-family: sans-serif;
                }
        
                .number {
                    color: ${color};
                    position: absolute;
                    margin: 0px;
                    margin-top: 0.2in;
                    margin-left: 0.7in;
                    margin-left: ${leftMargin};
                    height: 2in;
                }
        
                .number10 {
                    color: ${color};
                    position: absolute;
                    margin: 0px;
                    margin-top: 0.5in;
                    margin-left: 0.5in;
                    font-size: 1.6em;
                    height: 2in;
                }
        
                .topLeftSymbol {
                    color: ${color};
                    font-size: 0.7em;
                    margin: 0px;
                    margin-left: 0.1em;
                    text-align: left;
        
                }
        
                .bottomRightSymbol {
                    color: ${color};
                    margin: 0px;
                    font-size: 0.7em;
                    text-align: right;
                    margin-top: 1.3in;
                    margin-right: 0.1em;
                    padding-right: 0px;
        
        
                }
                </style>
            </head>
            <body style="background-color: transparent;">
                <div id="card">
                    <h1 class="topLeftSymbol">${symbols[i]}</h1>
                    <h1 class="${classt}">${numbers[y]}</h1>
                    <h1 class="bottomRightSymbol">${symbols[i]}</h1>
                </div>
            </body>

            </html>
            `;
    generateCard();
    async function generateCard() {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({
        width: 1280,
        height: 720,
      });

      await page.setContent(html);

      const content = await page.$("#card");
      const imageBuffer = await content.screenshot({
        omitBackground: true,
      });

      await page.close();
      await browser.close();

      let symbols = ["♥️", "♣", "♦️", "♠"];

      let thesymbol = "";

      if (symbols[i] === "♥️") {
        thesymbol = "hearts";
      } else if (symbols[i] === "♣") {
        thesymbol = "clover";
      } else if (symbols[i] === "♦️") {
        thesymbol = "diamonds";
      } else if (symbols[i] === "♠") {
        thesymbol = "spades";
      }

      const fileName = `${numbers[y]}_of_${thesymbol}.png`;
      const filePath = path.resolve("./cards/", fileName);
      const writeStream = fs.createWriteStream(filePath);
      writeStream.write(imageBuffer);
    }
  }
}
