const getInform = async (req, res) => {
  const { petId } = req.params;

  try {
    const results = await conn.query(
      "SELECT * FROM informs WHERE pets_id = ?",
      [petId]
    );

    const informs = results[0].map(async (result) => {
      let userResult = await conn.query(
        "SELECT phone , username FROM users WHERE id = ?",
        [result.users_id]
      );
      result.phone = userResult[0][0].phone;
      result.name = userResult[0][0].username;

      return result;
    });
    const finalResults = await Promise.all(informs);

    res.json(finalResults);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

module.exports = getInform;
