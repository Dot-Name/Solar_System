import planet from "../models/planet_model.js";

const postPlanet = async (req, res) => {
    try {
        const newPlanet = await planet.create(req.body);
        res.status(201).json({
            success: true,
            message: "Planet created successfully",
            data: newPlanet
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

const getPlanets = async (req, res) => {
    try {
        const planets = await planet.find();
        res.status(200).json({
            success: true,
            message: "Planets fetched successfully",
            data: planets
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

export { postPlanet, getPlanets };