const kpiModel = require('../model/kpi')

class Controller {
    // -------------------- Fetch All KPIS
    async allKpis(req, res, next) {
        try {
            const Kpis = await kpiModel.find({});
            res.status(200).json({ success: true, message: 'Kpis', data: Kpis });
        } catch (err) {
            next(err);
        }
    }


    // -------------------- Add Kpi
    async addKpi(req, res) {

        // Check if the request body is empty
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "You must add KPI name" });
        }

        // Check if the KPI is already in the database 
        const kpiExists = await kpiModel.findOne({ name: req.body.name })
        if (kpiExists) {
            // 409 Conflict
            return res.status(409).json({ success: false, message: "KPI already exists" })
        }

        const newKpi = new kpiModel({
            name: req.body.name.toLowerCase(),
        });

        // Save new admin to database
        try {
            const savedKPI = await newKpi.save();
            return res.status(201).json({ success: true, message: "New KPI added successfully", admin: savedKPI });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Failed to add KPI" });
        }

    }

    // -------------------- Delete
    async deleteKpi(req, res, next) {
        try {

            // Delete KPI from database
            const deletedKpi = await kpiModel.findByIdAndDelete(req.params.id);

            if (!deletedKpi) {
                return res.status(404).json({ success: false, message: "KPI not found" });
            }

            res.status(200).json({ success: true, message: "KPI removed from database!" });
        } catch (err) {
            next(err);
        }
    };

}




const controller = new Controller(); //Creating an instance from this class 
module.exports = controller; 