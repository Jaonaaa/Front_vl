import ArchiveIcon from "../../assets/svg/ArchiveIcon";
import BellIcon from "../../assets/svg/BellIcon";
import ChatIcon from "../../assets/svg/ChatIcon";
import HomeIcon from "../../assets/svg/HomeIcon";
import OverviewIcon from "../../assets/svg/OverviewIcon";
import SettingsIcon from "../../assets/svg/SettingsIcon";
import { AiOutlineCompass } from "react-icons/ai";
import ShopIcon from "../../assets/svg/ShopIcon";
import ContentContainer from "../ContentContainer/ContentContainer";
import { getUserPresp } from "../../hooks/useIdentity";
import Work from "../../pages/Admin/Work/Work";
import HomeClient from "../../pages/Client/Home/Home";
import HomeAdmin from "../../pages/Admin/Home/Home";
import Unit from "../../pages/Admin/Utilities/Unit/Unit";
import Client from "../../pages/Admin/Client/Client";
import ImportTM from "../../pages/Admin/Import/ImportTM";
import WorkClient from "../../pages/Client/WorkClient/WorkClient";
import DoPayement from "../../pages/Client/Payement/DoPayement/DoPayement";
import Finition from "../../pages/Admin/Utilities/Finition/Finition";
import BuildingType from "../../pages/Admin/Utilities/BuildinType/BuildingType";
import WorkPredefined from "../../pages/Admin/Management/WorkPredefined/WorkPredefined";
import ImportPayement from "../../pages/Admin/Import/ImportPayement";
import Travaux from "../../pages/Admin/Work/Travaux";
import ListFinition from "../../pages/Admin/Work/ListFinitions";

//Aza adino le "/" aloha path rehetra
let user = getUserPresp();

let admin = [
  {
    type: "menu",
    menuLabel: "Dashboard",
    rows: [
      {
        type: "link",
        linkTo: "/",
        label: "Home",
        icon: <HomeIcon />,
        page: <HomeAdmin />,
      },
      {
        type: "link",
        linkTo: "/devis",
        label: "Devis",
        icon: <AiOutlineCompass />,
        page: <Work />,
      },
      {
        type: "link_list",
        label: "Imports",
        icon: <OverviewIcon />,
        sublinks: [
          {
            label: "Travaux Maison",
            linkTo: "/import/tm",
            page: <ImportTM />,
          },
          {
            label: "Payement",
            linkTo: "/import/payement",
            page: <ImportPayement />,
          },
        ],
      },
      {
        type: "link_list",
        label: "Data",
        icon: <OverviewIcon />,
        sublinks: [
          {
            label: "Work by type",
            linkTo: "/data/wk",
            page: <Travaux />,
          },
          {
            label: "Finition",
            linkTo: "/data/finition",
            page: <ListFinition />,
          },
        ],
      },
      {
        type: "link",
        linkTo: "/client",
        label: "Customers",
        icon: <AiOutlineCompass />,
        page: <Client />,
      },
      {
        type: "link_list",
        label: "Management",
        icon: <BellIcon />,
        sublinks: [
          {
            label: "Work predefined",
            linkTo: "/management/work_predefined",
            page: <WorkPredefined />,
          },
          // {
          //   label: "Work details",
          //   linkTo: "/management/work_details",
          //   page: <WorkDetails />,
          // },
        ],
      },
      {
        type: "link_list",
        label: "Utilities",
        icon: <BellIcon />,
        sublinks: [
          {
            label: "Unit",
            linkTo: "/utilities/unit",
            page: <Unit />,
          },
          {
            label: "Type of finition",
            linkTo: "/utilities/finitions",
            page: <Finition />,
          },
          {
            label: "Type of building",
            linkTo: "/utilities/types",
            page: <BuildingType />,
          },
        ],
      },
    ],
  },
  {
    type: "single",
    row: {
      type: "link",
      linkTo: "/settings",
      label: "Settings",
      icon: <SettingsIcon />,
      page: <ContentContainer />,
    },
  },
];

let client = [
  {
    type: "menu",
    menuLabel: "My Menu",
    rows: [
      {
        type: "link",
        linkTo: "/",
        label: "Home",
        icon: <HomeIcon />,
        page: <HomeClient />,
      },
      {
        type: "link",
        linkTo: "/works",
        label: "My Works",
        icon: <ArchiveIcon />,
        page: <WorkClient />,
      },
      {
        type: "link_list",
        label: "Payement",
        icon: <ShopIcon />,
        sublinks: [
          // {
          //   label: "Active request",
          //   linkTo: "/request/active",
          //   page: <RequestActive />,
          // },
          {
            label: "Do payement",
            linkTo: "/payement/do",
            page: <DoPayement />,
          },
        ],
      },
    ],
  },
  {
    type: "single",
    row: {
      type: "link",
      linkTo: "/settings",
      label: "Settings",
      icon: <SettingsIcon />,
      page: <ContentContainer />,
    },
  },
];

const linksNavData = user ? ((user.roles + "").toLowerCase() === "admin" ? admin : client) : [];

export const link_to_hide_nav = ["/settings", "/something", "/sign", "/sign_admin"];

export default linksNavData;
