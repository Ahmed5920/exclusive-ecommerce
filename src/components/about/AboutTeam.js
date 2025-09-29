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
      <div className="flex flex-col items-center">
        <div className="flex justify-center items-center space-x-11 p-2">
          {managersData[activeGroup].map((item, idx) => (
            <div key={idx}>
              <img
                className="bg-gray-300 p-7 pb-0 rounded-lg"
                src={item.src}
                alt={item.alt}
              />
              <div className="text-3xl font-bold">{item.name}</div>
              <div>{item.title}</div>
              <div className="flex gap-2 mt-2">
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
