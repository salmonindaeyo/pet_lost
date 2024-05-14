const deletePet = async (req, res) => {
  const { id } = req.params;

  try {
    await conn.query("DELETE FROM informs WHERE pets_id = ?", [id]);

    const [result] = await conn.query("DELETE FROM pets WHERE id = ?", [id]);

    if (result.affectedRows > 0) {
      res.json({ message: "Pet deleted successfully" });
    } else {
      res.status(404).json({ error: "Pet not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

module.exports = deletePet;
