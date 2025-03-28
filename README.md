# **StockSim** 💰📈

A powerful **Discord trading bot** that lets users buy, sell, and trade **monopoly cryptocurrency and stocks** in a **dynamic simulated market**. Built using **Node.js and Discord.js**, it features real-time price tracking, a portfolio system, and leaderboards.

## **🚀 Features**

✅ **Live Market Prices** – Fetches real-time prices of stocks & crypto.\
✅ **Dynamic Market Simulation** – Prices fluctuate to create a realistic trading experience.\
✅ **Trading System** – Buy, sell, and manage your monopoly assets.\
✅ **User Portfolio** – Track balances, holdings, and past transactions.\
✅ **Market Commands** – View price charts, trends, and history.\
✅ **Leaderboards** – Compete with other users based on trading profits.\
✅ **Watchlist & Alerts** – Set price alerts for your favorite assets.

## **🔧 Tech Stack**

- **Node.js & Discord.js** for bot functionality
- **MongoDB** for storing user balances & trades
- **Slash Commands & Select Menus** for easy interaction

## **📜 Commands Preview**

| Command                     | Description                                                |
| --------------------------- | ---------------------------------------------------------- |
| `/market`                   | Shows available cryptocurrencies & stocks with live prices |
| `/price [asset]`            | Displays the real-time price of a stock or cryptocurrency  |
| `/buy [asset] [amount]`     | Purchase monopoly cryptocurrency or stocks                 |
| `/sell [asset] [amount]`    | Sell assets for monopoly money                             |
| `/portfolio`                | View your holdings & balance                               |
| `/leaderboard`              | See the top traders on the server                          |
| `/watchlist add [asset]`    | Add a stock or crypto to your watchlist                    |
| `/setalert [asset] [price]` | Set a price alert for an asset                             |

## **📌 How to Install & Run**

1️⃣ Clone the repo:

```bash
git clone https://github.com/akshtt-dev/stocksim.git  
cd StockSim  
```

2️⃣ Install dependencies:

```bash
npm install  
```

3️⃣ Set up your **`.env`** file:

```env
TOKEN=your-discord-bot-token
MONGO_URI=mongodb-connection-string
REDIS_HOST=redis-url
REDIS_PORT=redis-port
REDIS_PASSWORD=redis-password
REDIS_DB=0
```

4️⃣ Run the bot:

```bash
node index.js  
```

## **🛠 Future Updates**

🔹 **Stock Market Integration** – More stocks & market trends\
🔹 **Limit Orders** – Auto-buy/sell at target prices\
🔹 **Daily Rewards** – Free in-game money for active users\
🔹 **Custom Market Events** – Random events affecting stock & crypto prices

💡 **Contributions are welcome!** Feel free to submit issues & PRs.

## **📜 License**

This project is open-source under the MIT License.