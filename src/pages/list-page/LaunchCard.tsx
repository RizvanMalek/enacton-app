import React from "react";
import { Rocket, Calendar, CheckCircle, XCircle, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LaunchCardProps {
  name: string;
  date: string;
  image: string;
  rocketName?: string;
  success?: boolean | null;
  flightNumber: number | string
}

const LaunchCard: React.FC<LaunchCardProps> = (props) => {
  const {
    name,
    date,
    image,
    rocketName,
    success,
    flightNumber,
  } = props;

  const navigate = useNavigate()

  const formatRocketName = rocketName
    ? rocketName.length > 20
      ? rocketName.slice(0, 17) + "..."
      : rocketName
    : "";

  const launchDate = new Date(date);
  const formattedDate = launchDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const formattedTime = launchDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-gray-800 dark:bg-gray-900 text-gray-100 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform duration-200 hover:scale-105 min-h-[450px]">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover bg-gray-700"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.png";
        }}
      />

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-grow">
        {/* Mission Name */}
        <h3 className="text-lg font-bold truncate">{name}</h3>

        {/* Rocket Name */}
        {rocketName && (
          <p className="flex items-center text-sm text-gray-400 gap-2">
            <Rocket size={16} /> {formatRocketName}
          </p>
        )}

        {/* Launch Date */}
        <p className="flex items-center text-sm text-gray-400 gap-2">
          <Calendar size={16} /> {formattedDate}, {formattedTime}
        </p>

        {/* Launch Status */}
        {success !== null && (
          <div className="flex items-center gap-2 mt-2">
            {success ? (
              <span className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                <CheckCircle size={14} /> Success
              </span>
            ) : (
              <span className="flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                <XCircle size={14} /> Failure
              </span>
            )}
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/${flightNumber}`)}
          className="mt-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <ExternalLink size={16} /> View Details
        </button>
      </div>
    </div>
  );
};

export default LaunchCard;
