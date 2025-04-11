document.addEventListener("DOMContentLoaded", async () => {
    const result = document.getElementById("result");
  
    const check = await fetch("/api/blocked");
    const { blocked, ip } = await check.json();
    
    if (blocked) {
      result.innerHTML = `❌ You are blocked. Your IP: ${ip}`;
      document.getElementById("fetchBtn").disabled = true;
      return;
    }
  
    document.getElementById("fetchBtn").addEventListener("click", async () => {
      result.innerHTML = "Loading...";
      const res = await fetch("/api/data");
      const data = await res.json();
      result.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    });
  });
  