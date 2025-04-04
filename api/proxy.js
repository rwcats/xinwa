export default async function handler(req, res) {
  // Chỉ cho phép các request GET
  if (req.method !== "GET") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    // Lấy query string từ URL request và nối với domain API mục tiêu
    const { search } = new URL(req.url, `http://${req.headers.host}`);
    const targetUrl = "https://api.open-meteo.com/" + search;

    // Gửi request đến API mục tiêu
    const response = await fetch(targetUrl);
    if (!response.ok) {
      res.status(response.status).send("Error fetching data from target API");
      return;
    }
    const data = await response.text();

    // Trả về kết quả với Content-Type phù hợp
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}
