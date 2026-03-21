const Service = require("../models/Service");

// 1. CRÉER UN SERVICE
exports.createService = async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // ← MODIFIÉ : l'image vient de req.file (Cloudinary) et non de req.body
    const imageUrl = req.file ? req.file.path : null;

    const newService = new Service({
      title,
      description,
      price,
      category,
      image: imageUrl,
      userId: req.user.id,
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
    if (service.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    // ← MODIFIÉ : si une nouvelle image est uploadée on la prend, sinon on garde l'ancienne
    const imageUrl = req.file ? req.file.path : service.image;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: imageUrl },
      { new: true }
    );

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
    if (service.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await service.deleteOne();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. RÉCUPÉRER UN SERVICE PAR SON ID
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