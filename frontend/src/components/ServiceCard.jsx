const ServiceCard = ({ service }) => {
  return (
   <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden 
                hover:shadow-xl transition duration-300 shadow-md">
      {/* Image */}
      <div className="h-44 bg-slate-800 overflow-hidden">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            Aucune image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-slate-800">
          {service.title}
        </h3>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Price + User */}
        <div className="flex justify-between items-center mb-4">
          <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
            {service.price} DH
          </span>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs">
              {service.userId?.name?.charAt(0)}
            </div>
            {service.userId?.name}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => {
            if (service.userId?.phone) {
              window.open(
                `https://wa.me/${service.userId.phone}`,
                "_blank"
              );
            }
          }}
         className="w-full bg-[#2B2D42] hover:bg-black 
           py-2 rounded-lg text-sm font-medium text-white transition"
        >
          Contacter le prestataire
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;