fetch("http://127.0.0.1:5000/api/portfolio")
  .then(response => response.json())
  .then(data => {
    const summary = data.summary;
    const holdings = data.holdings;

    const summaryContainer = document.getElementById("summary");
    summaryContainer.innerHTML = `
      <div><strong>Investment</strong><br>₹ ${summary.total_investment}</div>
      <div><strong>Current Value</strong><br>₹ ${summary.current_value}</div>
      <div><strong>Unrealized P&L</strong><br>₹ ${summary.unrealized_pnl}</div>
      <div><strong>Growth</strong><br>${summary.growth}%</div>
    `;

    const tbody = document.querySelector("#holdingsTable tbody");
    holdings.forEach(stock => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${stock.company}</td>
        <td>${stock.shares}</td>
        <td>₹ ${stock.avg_cost}</td>
        <td>₹ ${stock.ltp}</td>
        <td>₹ ${stock.invested}</td>
        <td class="${stock.pnl >= 0 ? 'green' : 'red'}">₹ ${stock.pnl}</td>
        <td class="${stock.change_pct >= 0 ? 'green' : 'red'}">${stock.change_pct}%</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => console.error("Error loading portfolio:", err));
