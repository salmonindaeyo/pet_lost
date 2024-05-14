const getMyPets = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await conn.query(
      "SELECT pets.*, areas.id AS area_id , areas.province_id , areas.amphure_id , areas.tambon_id , address , thai_tambons.name AS tambon_name, thai_amphures.name AS amphure_name, thai_provinces.name AS province_name FROM pets INNER JOIN areas ON pets.areas_id = areas.id LEFT JOIN thai_tambons ON areas.tambon_id = thai_tambons.id LEFT JOIN thai_amphures ON areas.amphure_id = thai_amphures.id LEFT JOIN thai_provinces ON areas.province_id = thai_provinces.id WHERE users_id = ? ",
      [id]
    );

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
};

module.exports = getMyPets;
