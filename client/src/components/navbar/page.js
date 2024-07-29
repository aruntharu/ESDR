'use client';
import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';

const CustomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 1, name: "Home", link: "/home" },
    { id: 2, name: "About Us", link: "/aboutus" },
    { id: 3, name: "Committee", link: "/committee" },
    { id: 4, name: "ESDR 2024", link: "/esdr" },
    { id: 5, name: "Past Events", link: "/news" },
    { id: 6, name: "Contact Us", link: "/contactus" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="w-full">
      <NavbarContent className="flex justify-between items-center w-full">
        <NavbarBrand className="flex-shrink-0">
          <Link href="/home">
            <Image src="/logo.png" width={90} height={80} alt="logo" className="cursor-pointer" />
          </Link>
        </NavbarBrand>
        <div className="hidden sm:flex flex-grow justify-end items-center mt-2 gap-8">
          <div className="flex flex-grow justify-end items-center gap-8 pl-10"> {/* Adjust padding right as needed */}
            {menuItems.map((item) => (
              <NavbarItem key={item.id} className="relative group">
                <Link href={item.link} className="text-foreground">
                  {item.name}
                </Link>
                <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-transparent group-hover:bg-[#175459] transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
              </NavbarItem>
            ))}
            <NavbarItem className="relative group">
              <Button
                as={Link}
                href="/connectwithus"
                className="bg-[#175459] text-white px-4 py-2 rounded-full"
              >
               Apply Now
              </Button>
            </NavbarItem>
          </div>
        </div>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.id}>
            <Link
              className="w-full"
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link href="/connectwithus" className="w-full text-foreground" size="lg">
            Register
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default CustomNavBar;
