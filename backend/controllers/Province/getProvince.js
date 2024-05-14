const getProvince = async (req, res) => {
  try {
    const [result] = await conn.query("SELECT * from thai_provinces");
    console.log(result);
    const selectedRound = result;
    res.json(selectedRound);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Something went wrong Please try again." });
  }
};

module.exports = getProvince;
