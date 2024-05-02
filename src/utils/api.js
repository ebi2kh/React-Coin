// api.js

export async function HerofetchCoins() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching data!");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
}

// api.js

export async function MainfetchCoins(page = 1) {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching data!");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
}

// api.js

export async function CoinfetchCoins(coinId) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Error fetching data!");
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
}
