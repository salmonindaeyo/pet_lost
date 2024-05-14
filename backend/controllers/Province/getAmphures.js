const getAmphures = async (req, res) => {
  try {
    const { provinceId } = req.params;
    const [result] = await conn.query(
      "SELECT * from thai_amphures WHERE province_id = ?",
      [provinceId]
    );
    console.log(result);
    const selectedRound = result;
    res.json(selectedRound);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Something went wrong Please try again." });
  }
};

module.exports = getAmphures;
