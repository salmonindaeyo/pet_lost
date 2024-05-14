const updatePet = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    image,
    status,
    species,
    color,
    age,
    description,
    reward,
    gender,
    type,
    updated_at,
    created_at,
    petCategory_id,
    areas_id,
    users_id,
  } = req.body;

  try {
    const [existingPet] = await conn.query("SELECT * FROM pets WHERE id = ?", [
      id,
    ]);

    if (existingPet.length === 0) {
      return res.status(404).json({ error: "Pet not found" });
    }

    const test = new Date();

    // Update the pet
    const [result] = await conn.query(
      "UPDATE pets SET name = ?, image = ?, status = ?, species = ?, color = ?, age = ?, description = ?, reward = ?, gender = ?, type = ?, updated_at = ?, created_at = ?, petCategory_id = ?, areas_id = ?, users_id = ? WHERE id = ?",
      [
        name,
        image,
        status,
        species,
        color,
        age,
        description,
        reward,
        gender,
        type,
        test,
        test,
        petCategory_id,
        areas_id,
        users_id,
        id,
      ]
    );

    if (result.affectedRows > 0) {
      res.json({ message: "Pet updated successfully" });
    } else {
      res.status(500).json({ error: "Failed to update pet" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

module.exports = updatePet;
