const Service = require("../models/Service");

// 1. CRÉER UN SERVICE
exports.createService = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    const newService = new Service({
      title,
      description,
      price,
      category,
      image,
      userId: req.user.id, // Injecté par le middleware auth
    });
    await newService.save();
    res.status(201).json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. RÉCUPÉRER TOUS LES SERVICES (Pour la page d'accueil avec filtre)
exports.getServices = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) filter.category = category;

    const services = await Service.find(filter)
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. RÉCUPÉRER MES SERVICES (Pour le Dashboard)
exports.getMyServices = async (req, res) => {
  try {
    // On filtre par l'ID de l'utilisateur authentifié
    const myServices = await Service.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.status(200).json(myServices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. METTRE À JOUR
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.userId.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. SUPPRIMER
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.userId.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });

    await service.deleteOne();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. RÉCUPÉRER UN SERVICE PAR SON ID (Celle qui manquait !)
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("userId", "name email");
    if (!service) {
      return res.status(404).json({ message: "Service non trouvé" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};