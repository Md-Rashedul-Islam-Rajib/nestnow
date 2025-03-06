"use client"
import { Icon } from "@iconify/react";

const DownloadResume = () => {
  return (
    <div className="flex justify-center">
      <a
        href="/Rashedul_Islam_Rajib.pdf" // Path to your resume file in the public folder
        download="Rashedul_Islam_Rajib_Resume.pdf" // Custom file name on download
        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
      >
        <Icon icon="mdi:download" width="24" height="24" />
        Download Resume
      </a>
    </div>
  );
};

export default DownloadResume;
