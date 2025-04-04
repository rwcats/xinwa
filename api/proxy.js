// api/proxy.js
export default async function handler(req, res) {
  const API_DOMAIN = "https://api.open-meteo.com/";
  // Sử dụng req.url để lấy phần path và query; cần một base dummy vì req.url chỉ chứa path
  const url = new URL(req.url, "http://dummy-base");
  const proxyUrl = API_DOMAIN + url.pathname + url.search;
  try {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      res.status(500).json({ error: "Fetch failed" });
      return;
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data: " + err.message });
  }
}
