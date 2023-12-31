import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    const api_key = import.meta.env.VITE_APP_API_KEY;
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "X-API-KEY": api_key,
        },
      };

      try {
        const response = await fetch(
          "https://openapiv1.coinstats.app/coins",
          options
        );
        const data = await response.json();

        console.log("Data:", data.result);
        setCrypto(data.result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Crypto Finder</h1>
      <input
        type="text"
        placeholder="search for Crypto..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
          </tr>
        </thead>
        <tbody>
          {crypto
            .filter((val) => {
              return val.name.toLowerCase().includes(search);
            })
            .map((val, id) => {
              return (
                <>
                  <tr id={id}>
                    <td className="rank">{val.rank}</td>
                    <td className="logo">
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt="logo" width="30px" />
                      </a>
                      <p>{val.name}</p>
                    </td>
                    <td className="symbol">{val.symbol}</td>
                    <td>$ {Math.round(val.marketCap)} </td>
                    <td>$ {val.price} </td>
                    <td>{val.availableSupply}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
