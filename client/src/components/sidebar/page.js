"use client";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { IoNewspaperOutline, IoSettingsOutline } from "react-icons/io5";
import sideBarItems from '@/config/sideBarItems.json' ;
import { useRouter } from "next/navigation";


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
    console.log(sideBarItems)
    const router = useRouter()
  return (
    <Listbox
      aria-label="User Menu"
      onAction={(key) => router.push(key)}
      className="h-screen p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium m-2"
      itemClasses={{
        base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
      }}
    >
      {sideBarItems['user'].map((item)=>{
        return(
          <ListboxItem
          key={item.link}
          endContent={<ItemCounter number={293} />}
          startContent={
            <IconWrapper className="bg-secondary/10 text-secondary">
              <IoNewspaperOutline />
            </IconWrapper>
          }
        >
          {item.name}
        </ListboxItem>    
        )
      })
      }
    </Listbox>
  );
}
