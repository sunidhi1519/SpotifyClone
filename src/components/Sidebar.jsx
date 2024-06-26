import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo, headphone } from '../assets';
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = (handleClick) => (
    <div className="mt-10">
        {
            links.map((item) => (
                <NavLink
                    key={item.name}
                    to={item.to}
                    className="flex flex-row justify-start items-center my-8 text-lg font-medium text-white hover:text-cyan-300 "
                    onClick={() => handleClick && handleClick()}>
                    <item.icon className="w-6 h-6 mr-2" />
                    {item.name}
                </NavLink>
            ))
        }
    </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // bg-[#191624]
  // bg-[#0a0527]
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-gradient-to-r from-[#191624] to-[#2c2460]">
              <img src={headphone} alt="Headphone" className="w-full h-14 object-contain" />
              <NavLinks />
        </div>
          <div className="absolute md:hidden block top-6 right-3">
              {mobileMenuOpen? (<RiCloseLine className="w-6 h-6 text-white mr-2 bg-gradient-to-tl from-white/10 to-[#483d8b] rounded-sm" onClick={()=>setMobileMenuOpen(false)} />):<HiOutlineMenu className="w-6 h-6 text-white mr-2"  onClick={()=>setMobileMenuOpen(true)}/>}
              
          </div>

          <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : 'left-full'}` }>
              <img src={headphone} alt="Headphone" className="w-full h-14 object-contain" />
              <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
          </div>
    </>
  );
};

export default Sidebar;
