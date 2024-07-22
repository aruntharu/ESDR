'use client'
import React from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';

const CustomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 1, name: "Home", link: "/home" },
    { id: 2, name: "About Us", link: "/aboutus" },
    { id: 3, name: "Committee", link: "/committee" },
    { id: 4, name: "ESDR", link: "/esdr" },
    { id: 5, name: "News", link: "/news" },
    { id: 6, name: "Connect With Us", link: "/connectwithus" },
    { id: 7, name: "Contact Us", link: "/contactus" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src="/logo.png" width={90} height={80} alt="logo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.id} className="relative group">
            <Link href={item.link} className="text-foreground">
              {item.name}
            </Link>
            <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-transparent group-hover:bg-[#175459] transition-all duration-500 ease-in-out transform scale-x-0 group-hover:scale-x-100 origin-center"></div>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
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
      </NavbarMenu>
    </Navbar>
  )
}

export default CustomNavBar
