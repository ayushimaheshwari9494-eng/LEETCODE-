const axios = require("axios");

(async () => {
  try {
    const response = await axios.post(
      "https://emkc.org/api/v2/piston/execute",
      {
        language: "javascript",
        version: "*",
        files: [
          {
            content: "console.log(2+2)"
          }
        ]
      }
    );

    console.log(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
})();