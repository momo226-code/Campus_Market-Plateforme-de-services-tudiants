const Service = require("../models/Service");

exports.createService = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    const newService = new Service({
      title,
      description,
      price,
      category,
      userId: req.user.id, // vient du token
    });

    await newService.save();

    res.status(201).json({ message: "Service created successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().populate("userId", "name email phone");

    res.status(200).json(services);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Vérifier que le service appartient au user connecté
    if (service.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedService);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await service.deleteOne();

    res.json({ message: "Service deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ userId: req.user.id });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};