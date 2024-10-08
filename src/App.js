import React from "react";
import WineryInfoFetcher from "./WineryInfoFetcher";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Winery Information Dashboard</h1>
      </header>
      <main>
        <WineryInfoFetcher />
      </main>
      <footer>
        <p>© 2024 Winery Info App</p>
      </footer>
    </div>
  );
}

export default App;
