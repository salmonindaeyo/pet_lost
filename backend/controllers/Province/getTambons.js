const getTambons = async (req, res) => {
  try {
    const { amphureId } = req.params;
    console.log(amphureId);
    const [result] = await conn.query(
      "SELECT * from thai_tambons WHERE amphure_id = ?",
      [amphureId]
    );
    console.log(result);
    const selectedRound = result;
    res.json(selectedRound);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Something went wrong Please try again." });
  }
};

module.exports = getTambons;
