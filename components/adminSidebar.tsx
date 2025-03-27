"use client";

import {
  Home,
  Users,
  Package,
  ShoppingCart,
  // BarChart2,
  // FileText,
  LayoutDashboard,
  // Megaphone,
  // MessageCircle,
  // DollarSign,
  LucideProps,
  LayersIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface SidebarItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  subItems?: SidebarItem[];
  iconComponent?: React.ComponentType<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

// Sample data adapted for admin navigation
const adminSidebarItems: SidebarItem[] = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Home size={16} />,
    iconComponent: LayoutDashboard,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <Users size={16} />,
    iconComponent: Users,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: <LayersIcon size={16} />,
    iconComponent: LayersIcon,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: <Package size={16} />,
    iconComponent: Package,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: <ShoppingCart size={16} />,
    iconComponent: ShoppingCart,
  },
  // {
  //   name: "Sales",
  //   path: "/admin/sales",
  //   icon: <BarChart2 size={16} />,
  //   iconComponent: DollarSign,
  // },
  // {
  //   name: "Reports",
  //   path: "/admin/reports",
  //   icon: <FileText size={16} />,
  //   iconComponent: FileText,
  //   subItems: [
  //     {
  //       name: "Sales Report",
  //       path: "/admin/reports/sales",
  //       iconComponent: DollarSign,
  //     },
  //     {
  //       name: "User Report",
  //       path: "/admin/reports/users",
  //       iconComponent: Users,
  //     },
  //     {
  //       name: "Product Report",
  //       path: "/admin/reports/products",
  //       iconComponent: Package,
  //     },
  //   ],
  // },
  // {
  //   name: "Communication",
  //   path: "/admin/communication",
  //   icon: <Megaphone size={16} />,
  //   iconComponent: Megaphone,
  //   subItems: [
  //     {
  //       name: "News",
  //       path: "/admin/communication/news",
  //       iconComponent: MessageCircle,
  //     },
  //     {
  //       name: "Notifications",
  //       path: "/admin/communication/notifications",
  //       iconComponent: MessageCircle,
  //     },
  //   ],
  // },
  // {
  //   name: "Settings",
  //   path: "/admin/settings",
  //   icon: <Settings size={16} />,
  //   iconComponent: Settings,
  // },
  // {
  //   name: "Logout",
  //   path: "/logout",
  //   icon: <LogOut size={16} />,
  //   iconComponent: LogOut,
  // },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props} title="Admin">
      <SidebarContent>
        <SidebarTrigger />
        <SidebarMenu className="mb-16">
          {adminSidebarItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              {item.subItems ? (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value={item.name} className="border-none">
                    <AccordionTrigger className="flex items-center justify-start hover:bg-gray-700 hover:text-slate-100 w-full p-2 rounded-md ">
                      {item.icon} <span className="ml-2 mr-2">{item.name}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-6 space-y-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className={`flex items-center p-2 rounded-md hover:bg-gray-700  hover:text-slate-100 transition-colors ${
                            pathname === subItem.path
                              ? "bg-gray-700 font-bold text-slate-100"
                              : ""
                          }`}
                        >
                          {subItem.iconComponent && (
                            <subItem.iconComponent className="mr-2 w-4" />
                          )}
                          {subItem.name}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  href={item.path}
                  className={`flex items-center p-2 rounded-md hover:bg-gray-700 hover:text-slate-100 transition-colors ${
                    pathname === item.path
                      ? "bg-gray-700 font-bold text-slate-100"
                      : ""
                  }`}
                >
                  {item.icon} <span className="ml-2">{item.name}</span>
                </Link>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminSidebar;

// ?????????????????????????????????????????????????????

// "use client";

// import React from "react";
// import {
//   ChevronRight,
//   Home,
//   Users,
//   Package,
//   ShoppingCart,
//   BarChart2,
//   Settings,
//   FileText,
//   LayoutDashboard,
//   LogOut,
//   Megaphone,
//   MessageCircle,
//   DollarSign,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "./ui/accordion";

// interface SidebarItem {
//   name: string;
//   path: string;
//   icon?: React.ReactNode;
//   subItems?: SidebarItem[];
//   iconComponent?: React.ComponentType<any>;
// }

// // Sample data adapted for admin navigation
// const adminSidebarItems: SidebarItem[] = [
//   {
//     name: "Dashboard",
//     path: "/admin/dashboard",
//     icon: <Home size={16} />,
//     iconComponent: LayoutDashboard,
//   },
//   {
//     name: "Users",
//     path: "/admin/users",
//     icon: <Users size={16} />,
//     iconComponent: Users,
//   },
//   {
//     name: "Products",
//     path: "/admin/products",
//     icon: <Package size={16} />,
//     iconComponent: Package,
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//     icon: <ShoppingCart size={16} />,
//     iconComponent: ShoppingCart,
//   },
//   {
//     name: "Sales",
//     path: "/admin/sales",
//     icon: <BarChart2 size={16} />,
//     iconComponent: DollarSign,
//   },
//   {
//     name: "Reports",
//     path: "/admin/reports",
//     icon: <FileText size={16} />,
//     iconComponent: FileText,
//     subItems: [
//       {
//         name: "Sales Report",
//         path: "/admin/reports/sales",
//         iconComponent: DollarSign,
//       },
//       {
//         name: "User Report",
//         path: "/admin/reports/users",
//         iconComponent: Users,
//       },
//       {
//         name: "Product Report",
//         path: "/admin/reports/products",
//         iconComponent: Package,
//       },
//     ],
//   },
//   {
//     name: "Communication",
//     path: "/admin/communication",
//     icon: <Megaphone size={16} />,
//     iconComponent: Megaphone,
//     subItems: [
//       {
//         name: "News",
//         path: "/admin/communication/news",
//         iconComponent: MessageCircle,
//       },
//       {
//         name: "Notifications",
//         path: "/admin/communication/notifications",
//         iconComponent: MessageCircle,
//       },
//     ],
//   },
//   // {
//   //   name: "Settings",
//   //   path: "/admin/settings",
//   //   icon: <Settings size={16} />,
//   //   iconComponent: Settings,
//   // },
//   // {
//   //   name: "Logout",
//   //   path: "/logout",
//   //   icon: <LogOut size={16} />,
//   //   iconComponent: LogOut,
//   // },
// ];

// export function AdminSidebar({
//   ...props
// }: React.ComponentProps<typeof Sidebar>) {
//   const pathname = usePathname();

//   return (
//     <Sidebar {...props}>
//       <SidebarContent>
//         <SidebarMenu>
//           {adminSidebarItems.map((item) => (
//             <SidebarMenuItem key={item.name}>
//               {item.subItems ? (
//                 <Accordion type="single" collapsible>
//                   <AccordionItem
//                     key={item.path}
//                     className="w-full"
//                     value="item-1"
//                   >
//                     {item.subItems.map((subItem) => (
//                       <>
//                         <AccordionTrigger>
//                           {item.icon} {item.name}
//                         </AccordionTrigger>
//                         <AccordionContent>
//                           <Link href={subItem.path}>
//                             {subItem.iconComponent && <subItem.iconComponent />}{" "}
//                             {subItem.name}
//                           </Link>
//                         </AccordionContent>
//                       </>
//                     ))}
//                   </AccordionItem>
//                 </Accordion>
//               ) : (
//                 <SidebarMenuButton>
//                   {item.icon} {item.name}
//                 </SidebarMenuButton>
//               )}
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarContent>
//       <SidebarRail className="bg-gray-800" />
//     </Sidebar>
//   );
// }

// export default AdminSidebar;

// {item.subItems ? (
//   <>
//     <SidebarMenuButton
//       className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors ${
//         pathname.startsWith(item.path) ? "bg-gray-700" : ""
//       }`}
//       onClick={() => toggleSubmenu(item.name)}
//     >
//       {item.iconComponent && (
//         <item.iconComponent className="mr-2 w-5" />
//       )}
//       <span>{item.name}</span>
//       <span className="ml-auto">
//         {openSubmenus.includes(item.name) ? (
//           <ChevronUp />
//         ) : (
//           <ChevronDown />
//         )}
//       </span>
//     </SidebarMenuButton>
//     {openSubmenus.includes(item.name) && (
//       <ul className="pl-6 mt-1 space-y-1">
//         {item.subItems.map((subItem) => (
//           <li key={subItem.name}>
//             <Link
//               href={subItem.path}
//               className={`block p-2 rounded-md hover:bg-gray-700 transition-colors ${
//                 pathname === subItem.path
//                   ? "bg-gray-700 font-bold"
//                   : ""
//               }`}
//             >
//               {subItem.iconComponent && (
//                 <subItem.iconComponent className="mr-2 w-4" />
//               )}{" "}
//               {subItem.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     )}
//   </>
// ) : (
//   <Link
//     href={item.path}
//     className={`flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors ${
//       pathname === item.path ? "bg-gray-700 font-bold" : ""
//     }`}
//   >
//     {item.iconComponent && (
//       <item.iconComponent className="mr-2 w-5" />
//     )}
//     <span>{item.name}</span>
//   </Link>
// )}

// ?????????????????????????????????????????????????

// import React from "react";
// import {
//   ChevronRight,
//   Home,
//   Users,
//   Package,
//   ShoppingCart,
//   BarChart2,
//   Settings,
//   FileText,
// } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";

// interface SidebarItem {
//   name: string;
//   path: string;
//   icon?: React.ReactNode;
//   subItems?: SidebarItem[];
// }

// // Sample data adapted for admin navigation
// const adminSidebarItems: SidebarItem[] = [
//   {
//     name: "Dashboard",
//     path: "/admin/dashboard",
//     icon: <Home size={16} />,
//   },
//   {
//     name: "Users",
//     path: "/admin/users",
//     icon: <Users size={16} />,
//   },
//   {
//     name: "Products",
//     path: "/admin/products",
//     icon: <Package size={16} />,
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//     icon: <ShoppingCart size={16} />,
//   },
//   {
//     name: "Sales",
//     path: "/admin/sales",
//     icon: <BarChart2 size={16} />,
//   },
//   {
//     name: "Reports",
//     path: "/admin/reports",
//     icon: <FileText size={16} />,
//     subItems: [
//       { name: "Sales Report", path: "/admin/reports/sales" },
//       { name: "User Report", path: "/admin/reports/users" },
//       { name: "Product Report", path: "/admin/reports/products" },
//     ],
//   },
//   {
//     name: "Settings",
//     path: "/admin/settings",
//     icon: <Settings size={16} />,
//   },
// ];

// export function AdminSidebar({
//   ...props
// }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar {...props}>
//       <SidebarContent className="gap-0">
//         {/* We create a collapsible SidebarGroup for each parent */}
//         {adminSidebarItems.map((item) => (
//           <Collapsible
//             key={item.name}
//             title={item.name}
//             defaultOpen
//             className="group/collapsible"
//           >
//             <SidebarGroup>
//               <SidebarGroupLabel
//                 asChild
//                 className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center"
//               >
//                 <CollapsibleTrigger className="flex w-full items-center">
//                   <span className="flex items-center">
//                     {item.icon}
//                     <span className="ml-2">{item.name}</span>
//                   </span>
//                   <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
//                 </CollapsibleTrigger>
//               </SidebarGroupLabel>

//               <CollapsibleContent>
//                 <SidebarGroupContent>
//                   <SidebarMenu>
//                     {item.subItems ? (
//                       item.subItems.map((subItem) => (
//                         <SidebarMenuItem key={subItem.name}>
//                           <SidebarMenuButton asChild className="pl-6">
//                             <a href={subItem.path}>{subItem.name}</a>
//                           </SidebarMenuButton>
//                         </SidebarMenuItem>
//                       ))
//                     ) : (
//                       <SidebarMenuItem>
//                         <SidebarMenuButton asChild>
//                           <a href={item.path}>
//                             <span className="flex items-center">
//                               {item.icon}
//                               <span className="ml-2">{item.name}</span>
//                             </span>
//                           </a>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                     )}
//                   </SidebarMenu>
//                 </SidebarGroupContent>
//               </CollapsibleContent>
//             </SidebarGroup>
//           </Collapsible>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

// export default AdminSidebar;

// ????????????????????????????????????????????????

// import React from "react";
// import { ChevronRight } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";

// interface SidebarItem {
//   name: string;
//   path: string;
//   subItems?: SidebarItem[];
// }

// // Sample data adapted for admin navigation
// const adminSidebarItems: SidebarItem[] = [
//   {
//     name: "Dashboard",
//     path: "/admin/dashboard",
//   },
//   {
//     name: "Users",
//     path: "/admin/users",
//   },
//   {
//     name: "Products",
//     path: "/admin/products",
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//   },
//   {
//     name: "Sales",
//     path: "/admin/sales",
//   },
//   {
//     name: "Reports",
//     path: "/admin/reports",
//     subItems: [
//       { name: "Sales Report", path: "/admin/reports/sales" },
//       { name: "User Report", path: "/admin/reports/users" },
//       { name: "Product Report", path: "/admin/reports/products" },
//     ],
//   },
//   {
//     name: "Settings",
//     path: "/admin/settings",
//   },
// ];

// export function AdminSidebar({
//   ...props
// }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar {...props}>
//       {/* <SidebarHeader>
//         <VersionSwitcher versions={["v1", "v2", "v3"]} defaultVersion={"v1"} />
//         <SearchForm />
//       </SidebarHeader> */}

//       <SidebarContent className="gap-0">
//         {/* We create a collapsible SidebarGroup for each parent */}
//         {adminSidebarItems.map((item) => (
//           <Collapsible
//             key={item.name}
//             title={item.name}
//             defaultOpen
//             className="group/collapsible"
//           >
//             <SidebarGroup>
//               <SidebarGroupLabel
//                 asChild
//                 className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//               >
//                 <CollapsibleTrigger>
//                   {item.name}{" "}
//                   <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
//                 </CollapsibleTrigger>
//               </SidebarGroupLabel>

//               <CollapsibleContent>
//                 <SidebarGroupContent>
//                   <SidebarMenu>
//                     {item.subItems ? (
//                       item.subItems.map((subItem) => (
//                         <SidebarMenuItem key={subItem.name}>
//                           <SidebarMenuButton asChild>
//                             <a href={subItem.path}>{subItem.name}</a>
//                           </SidebarMenuButton>
//                         </SidebarMenuItem>
//                       ))
//                     ) : (
//                       <SidebarMenuItem>
//                         <SidebarMenuButton asChild>
//                           <a href={item.path}>{item.name}</a>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                     )}
//                   </SidebarMenu>
//                 </SidebarGroupContent>
//               </CollapsibleContent>
//             </SidebarGroup>
//           </Collapsible>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

// export default AdminSidebar;

// ????????????????????????????????????????
// import * as React from "react";
// import { ChevronRight } from "lucide-react";

// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";

// // This is sample data.
// const data = {
//   versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
//   navMain: [
//     {
//       title: "Getting Started",
//       url: "#",
//       items: [
//         {
//           title: "Installation",
//           url: "#",
//         },
//         {
//           title: "Project Structure",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Building Your Application",
//       url: "#",
//       items: [
//         {
//           title: "Routing",
//           url: "#",
//         },
//         {
//           title: "Data Fetching",
//           url: "#",
//           isActive: true,
//         },
//         {
//           title: "Rendering",
//           url: "#",
//         },
//         {
//           title: "Caching",
//           url: "#",
//         },
//         {
//           title: "Styling",
//           url: "#",
//         },
//         {
//           title: "Optimizing",
//           url: "#",
//         },
//         {
//           title: "Configuring",
//           url: "#",
//         },
//         {
//           title: "Testing",
//           url: "#",
//         },
//         {
//           title: "Authentication",
//           url: "#",
//         },
//         {
//           title: "Deploying",
//           url: "#",
//         },
//         {
//           title: "Upgrading",
//           url: "#",
//         },
//         {
//           title: "Examples",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "API Reference",
//       url: "#",
//       items: [
//         {
//           title: "Components",
//           url: "#",
//         },
//         {
//           title: "File Conventions",
//           url: "#",
//         },
//         {
//           title: "Functions",
//           url: "#",
//         },
//         {
//           title: "next.config.js Options",
//           url: "#",
//         },
//         {
//           title: "CLI",
//           url: "#",
//         },
//         {
//           title: "Edge Runtime",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Architecture",
//       url: "#",
//       items: [
//         {
//           title: "Accessibility",
//           url: "#",
//         },
//         {
//           title: "Fast Refresh",
//           url: "#",
//         },
//         {
//           title: "Next.js Compiler",
//           url: "#",
//         },
//         {
//           title: "Supported Browsers",
//           url: "#",
//         },
//         {
//           title: "Turbopack",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Community",
//       url: "#",
//       items: [
//         {
//           title: "Contribution Guide",
//           url: "#",
//         },
//       ],
//     },
//   ],
// };

// export default function AdminSidebar({
//   ...props
// }: React.ComponentProps<typeof Sidebar>) {
//   return (
//     <Sidebar {...props}>
//       <SidebarContent className="gap-0">
//         {/* We create a collapsible SidebarGroup for each parent. */}
//         {data.navMain.map((item) => (
//           <Collapsible
//             key={item.title}
//             title={item.title}
//             defaultOpen
//             className="group/collapsible"
//           >
//             <SidebarGroup>
//               <SidebarGroupLabel
//                 asChild
//                 className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
//               >
//                 <CollapsibleTrigger>
//                   {item.title}{" "}
//                   <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
//                 </CollapsibleTrigger>
//               </SidebarGroupLabel>
//               <CollapsibleContent>
//                 <SidebarGroupContent>
//                   <SidebarMenu>
//                     {item.items.map((item) => (
//                       <SidebarMenuItem key={item.title}>
//                         <SidebarMenuButton asChild isActive={item.isActive}>
//                           <a href={item.url}>{item.title}</a>
//                         </SidebarMenuButton>
//                       </SidebarMenuItem>
//                     ))}
//                   </SidebarMenu>
//                 </SidebarGroupContent>
//               </CollapsibleContent>
//             </SidebarGroup>
//           </Collapsible>
//         ))}
//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// }

// ???????????????????????????????????????

// // "use client";

// // import React, { useState } from "react";
// // import { usePathname } from "next/navigation";
// // import {
// //   LayoutDashboard,
// //   Users,
// //   Package,
// //   ShoppingCart,
// //   DollarSign,
// //   FileText,
// //   Settings,
// //   LogOut,
// //   ChevronDown,
// //   ChevronUp,
// //   Megaphone,
// //   MessageCircle,
// // } from "lucide-react";
// // import { Card } from "@/components/ui/card";
// // import Link from "next/link";

// // interface SidebarItem {
// //   name: string;
// //   path: string;
// //   icon: React.ComponentType<any>;
// //   subItems?: SidebarItem[];
// // }

// // const adminSidebarItems: SidebarItem[] = [
// //   {
// //     name: "Dashboard",
// //     path: "/admin/dashboard",
// //     icon: LayoutDashboard,
// //   },
// //   {
// //     name: "Users",
// //     path: "/admin/users",
// //     icon: Users,
// //   },
// //   {
// //     name: "Products",
// //     path: "/admin/products",
// //     icon: Package,
// //   },
// //   {
// //     name: "Orders",
// //     path: "/admin/orders",
// //     icon: ShoppingCart,
// //   },
// //   {
// //     name: "Sales",
// //     path: "/admin/sales",
// //     icon: DollarSign,
// //   },
// //   {
// //     name: "Reports",
// //     path: "/admin/reports",
// //     icon: FileText,
// //     subItems: [
// //       { name: "Sales Report", path: "/admin/reports/sales", icon: DollarSign },
// //       { name: "User Report", path: "/admin/reports/users", icon: Users },
// //       {
// //         name: "Product Report",
// //         path: "/admin/reports/products",
// //         icon: Package,
// //       },
// //     ],
// //   },
// //   {
// //     name: "Communication",
// //     path: "/admin/communication",
// //     icon: Megaphone,
// //     subItems: [
// //       { name: "News", path: "/admin/communication/news", icon: MessageCircle },
// //       {
// //         name: "Notifications",
// //         path: "/admin/communication/notifications",
// //         icon: MessageCircle,
// //       },
// //     ],
// //   },
// //   {
// //     name: "Settings",
// //     path: "/admin/settings",
// //     icon: Settings,
// //   },
// //   {
// //     name: "Logout",
// //     path: "/logout",
// //     icon: LogOut,
// //   },
// // ];

// // const AdminSidebar: React.FC = () => {
// //   const pathname = usePathname();
// //   const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

// //   const toggleSubmenu = (name: string) => {
// //     if (openSubmenus.includes(name)) {
// //       setOpenSubmenus(openSubmenus.filter((item) => item !== name));
// //     } else {
// //       setOpenSubmenus([...openSubmenus, name]);
// //     }
// //   };

// //   return (
// //     <aside className="w-64 p-4 bg-gray-800 text-white min-h-screen shadow-lg">
// //       <nav>
// //         <ul className="space-y-2">
// //           {adminSidebarItems.map((item) => (
// //             <li key={item.name} className="relative">
// //               {item.subItems ? (
// //                 <>
// //                   <button
// //                     className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 transition-colors ${
// //                       pathname.startsWith(item.path) ? "bg-gray-700" : ""
// //                     }`}
// //                     onClick={() => toggleSubmenu(item.name)}
// //                   >
// //                     <item.icon className="mr-2 w-5" />
// //                     <span>{item.name}</span>
// //                     <span className="ml-auto">
// //                       {openSubmenus.includes(item.name) ? (
// //                         <ChevronUp />
// //                       ) : (
// //                         <ChevronDown />
// //                       )}
// //                     </span>
// //                   </button>
// //                   {openSubmenus.includes(item.name) && (
// //                     <ul className="pl-6 mt-1 space-y-1">
// //                       {item.subItems.map((subItem) => (
// //                         <li key={subItem.name}>
// //                           <Link
// //                             href={subItem.path}
// //                             className={`block p-2 rounded-md hover:bg-gray-700 transition-colors ${
// //                               pathname === subItem.path
// //                                 ? "bg-gray-700 font-bold"
// //                                 : ""
// //                             }`}
// //                           >
// //                             <subItem.icon className="mr-2 w-4" /> {subItem.name}
// //                           </Link>
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   )}
// //                 </>
// //               ) : (
// //                 <Link
// //                   href={item.path}
// //                   className={`flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors ${
// //                     pathname === item.path ? "bg-gray-700 font-bold" : ""
// //                   }`}
// //                 >
// //                   <item.icon className="mr-2 w-5" />
// //                   <span>{item.name}</span>
// //                 </Link>
// //               )}
// //             </li>
// //           ))}
// //         </ul>
// //       </nav>
// //     </aside>
// //   );
// // };

// // export default AdminSidebar;
