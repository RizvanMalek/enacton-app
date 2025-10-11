import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Master from "../../layouts/master/Master";
import { getLaunchByIdService } from "../../services/launches.service";
import { Rocket, Calendar, CheckCircle, XCircle, ExternalLink, MapPin, Info, ArrowLeft } from "lucide-react";

interface LaunchDetail {
  flight_number: number;
  mission_name: string;
  launch_date_utc: string;
  details: string | null;
  rocket: {
    rocket_name: string;
    rocket_type?: string;
    first_stage?: {
      cores: { core_serial: string; reused: boolean }[];
    };
    second_stage?: {
      payloads: { payload_id: string; payload_type: string; nationality?: string }[];
    };
    height?: { meters?: number; feet?: number };
    diameter?: { meters?: number; feet?: number };
    mass?: { kg?: number; lb?: number };
  };
  launch_success: boolean | null;
  launch_site?: { site_name_long?: string };
  links: {
    mission_patch_small: string | null;
    article_link?: string | null;
    video_link?: string | null;
    wikipedia?: string | null;
    presskit?: string | null;
  };
}

const ViewPage: React.FC = () => {
  const { flight_number } = useParams<{ flight_number: string }>();
  const navigate = useNavigate();
  const [launch, setLaunch] = useState<LaunchDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaunch = async () => {
      setLoading(true);
      const data = await getLaunchByIdService(flight_number!);
      setLaunch(data);
      setLoading(false);
    };
    fetchLaunch();
  }, [flight_number]);

  if (loading) {
    return (
      <Master>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      </Master>
    );
  }

  if (!launch) {
    return (
      <Master>
        <div className="text-center mt-20 text-gray-500 dark:text-gray-300">
          Launch not found.
        </div>
      </Master>
    );
  }

  const launchDate = new Date(launch.launch_date_utc);
  const formattedDate = launchDate.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
  const formattedTime = launchDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <Master>
      <div className="max-w-7xl min-w-7xl mx-auto bg-gray-800 dark:bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-6">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 text-blue-500 hover:text-blue-400 text-sm font-medium"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Back to List
        </button>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={launch.links.mission_patch_small || "/placeholder.png"}
            alt={launch.mission_name}
            className="w-full md:w-64 h-64 object-cover rounded-xl bg-gray-700"
          />
          <div className="flex flex-col gap-3 flex-grow">
            <h2 className="text-3xl font-bold truncate">{launch.mission_name}</h2>
            <div className="flex flex-wrap gap-2 items-center">
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <Rocket size={16} /> {launch.rocket.rocket_name} {launch.rocket.rocket_type ? `(${launch.rocket.rocket_type})` : ""}
              </p>
              {launch.launch_success !== null && (
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  launch.launch_success ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}>
                  {launch.launch_success ? <CheckCircle size={14} /> : <XCircle size={14} />} {launch.launch_success ? "Success" : "Failure"}
                </span>
              )}
            </div>
            {launch.launch_site?.site_name_long && (
              <p className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin size={16} /> {launch.launch_site.site_name_long}
              </p>
            )}
            <p className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar size={16} /> {formattedDate}, {formattedTime}
            </p>
          </div>
        </div>

        {/* Mission Details */}
        {launch.details && (
          <div className="text-gray-300 bg-gray-700 dark:bg-gray-800 rounded-xl p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Info size={16} /> Mission Details:</h3>
            <p>{launch.details}</p>
          </div>
        )}

        {/* Rocket Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 dark:bg-gray-800 rounded-xl p-4">
            <h4 className="font-semibold mb-2">Rocket Specs</h4>
            <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
              {launch.rocket.height?.meters && <li>Height: {launch.rocket.height.meters} m</li>}
              {launch.rocket.diameter?.meters && <li>Diameter: {launch.rocket.diameter.meters} m</li>}
              {launch.rocket.mass?.kg && <li>Mass: {launch.rocket.mass.kg} kg</li>}
              {launch.rocket.first_stage?.cores?.length && <li>First Stage Cores: {launch.rocket.first_stage.cores.length}</li>}
              {launch.rocket.second_stage?.payloads?.length && <li>Payloads: {launch.rocket.second_stage.payloads.length}</li>}
            </ul>
          </div>

          {/* First Stage Cores */}
          {launch.rocket.first_stage?.cores && (
            <div className="bg-gray-700 dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold mb-2">First Stage Cores</h4>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                {launch.rocket.first_stage.cores.map((core, idx) => (
                  <li key={idx}>{core.core_serial} - {core.reused ? "Reused" : "New"}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Second Stage Payloads */}
          {launch.rocket.second_stage?.payloads && (
            <div className="bg-gray-700 dark:bg-gray-800 rounded-xl p-4">
              <h4 className="font-semibold mb-2">Payloads</h4>
              <ul className="text-sm text-gray-300 list-disc list-inside space-y-1">
                {launch.rocket.second_stage.payloads.map((p, idx) => (
                  <li key={idx}>{p.payload_id} - {p.payload_type} {p.nationality ? `(${p.nationality})` : ""}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* External Links */}
        <div className="flex flex-wrap gap-3 mt-4">
          {launch.links.article_link && (
            <a href={launch.links.article_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              <ExternalLink size={16} /> Article
            </a>
          )}
          {launch.links.video_link && (
            <a href={launch.links.video_link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
              <ExternalLink size={16} /> Video
            </a>
          )}
          {launch.links.wikipedia && (
            <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
              <ExternalLink size={16} /> Wikipedia
            </a>
          )}
          {launch.links.presskit && (
            <a href={launch.links.presskit} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
              <ExternalLink size={16} /> Presskit
            </a>
          )}
        </div>
      </div>
    </Master>
  );
};

export default ViewPage;
