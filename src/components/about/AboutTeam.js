import { Fragment } from "react/jsx-runtime";
import { CiTwitter } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { RiLinkedinLine } from "react-icons/ri";
import { managersData } from "../../constants/managersData";
import { useState } from "react";

const AboutTeam = () => {
  const [activeGroup, setActiveGroup] = useState("group1");
  return (
    <Fragment>
      <div className="flex flex-col items-center max-md:px-4">
        <div className="grid grid-cols-3 justify-center items-center space-x-11 p-2 max-md:flex-wrap max-md:space-x-0 max-md:gap-8">
          {managersData[activeGroup].map((item, idx) => (
            <div key={idx} className="text-center">
              <img
                className="bg-gray-300 p-7 pb-0 rounded-lg max-md:w-44 mx-auto size-28"
                src={item.src}
                alt={item.alt}
              />
              <div className="text-3xl font-bold max-md:text-xl mt-2">{item.name}</div>
              <div className="max-md:text-sm">{item.title}</div>
              <div className="flex gap-2 mt-2 justify-center">
                <CiTwitter />
                <CiInstagram />
                <RiLinkedinLine />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3 mt-6">
          {Object.keys(managersData).map((groupKey) => (
            <button
              key={groupKey}
              onClick={() => setActiveGroup(groupKey)}
              className={`h-3 w-3 rounded-full ${
                activeGroup === groupKey ? "bg-red-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AboutTeam;
