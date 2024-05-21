"use client";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { RxDashboard } from "react-icons/rx";
import { IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";
import { MdEventAvailable } from "react-icons/md";
import { PiArticleNyTimesBold } from "react-icons/pi";
import { FaBook } from "react-icons/fa6";
import { FcContacts } from "react-icons/fc";
import { IoIosMail } from "react-icons/io";


export const ItemCounter = ({ number }) => (
  <div className="flex items-center gap-1 text-default-400">
    <span className="text-small">{number}</span>
  </div>
);

export const IconWrapper = ({ children, className }) => (
  <div
    className={cn(
      className,
      "flex items-center rounded-small justify-center w-7 h-7"
    )}
  >
    {children}
  </div>
);
export default function SideBar() {
  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => alert(key)}
      className="h-screen p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium m-2"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      <ListboxItem
        key="issues"
        endContent={<ItemCounter number={13} />}
        startContent={
          <IconWrapper className="bg-success/10 text-success">
            <RxDashboard />
          </IconWrapper>
        }
      >
        Dashboard
      </ListboxItem>
      <ListboxItem
        key="pull_requests"
        endContent={<ItemCounter number={6} />}
        startContent={
          <IconWrapper className="bg-primary/10 text-primary">
            <IoSettingsOutline />
          </IconWrapper>
        }
      >
        Setting
      </ListboxItem>
      <ListboxItem
        key="discussions"
        endContent={<ItemCounter number={293} />}
        startContent={
          <IconWrapper className="bg-secondary/10 text-secondary">
           <IoIosMail />
          </IconWrapper>
        }
      >
        Mail
      </ListboxItem>
      <ListboxItem
        key="discussions"
        endContent={<ItemCounter number={293} />}
        startContent={
          <IconWrapper className="bg-secondary/10 text-secondary">
            <IoNewspaperOutline />
          </IconWrapper>
        }
      >
        News
      </ListboxItem>
      <ListboxItem
        key="actions"
        endContent={<ItemCounter number={2} />}
        startContent={
          <IconWrapper className="bg-warning/10 text-warning">
            <MdEventAvailable />
          </IconWrapper>
        }
      >
        Events
      </ListboxItem>
      <ListboxItem
        key="projects"
        endContent={<ItemCounter number={7} />}
        startContent={
          <IconWrapper className="bg-default/50 text-foreground">
            <PiArticleNyTimesBold />
          </IconWrapper>
        }
      >
        Articles
      </ListboxItem>
      <ListboxItem
        key="projects"
        endContent={<ItemCounter number={14} />}
        startContent={
          <IconWrapper className="bg-default/50 text-foreground">
            <FaBook />
          </IconWrapper>
        }
      >
        Publications
      </ListboxItem>
      <ListboxItem
        key="projects"
        endContent={<ItemCounter number={42} />}
        startContent={
          <IconWrapper className="bg-default/50 text-foreground">
            <FcAbout />
          </IconWrapper>
        }
      >
        About us
      </ListboxItem>
      <ListboxItem
        key="projects"
        endContent={<ItemCounter number={98} />}
        startContent={
          <IconWrapper className="bg-default/50 text-foreground">
            <FcContacts />
          </IconWrapper>
        }
      >
        Contact us
      </ListboxItem>
    </Listbox>
  );
}
