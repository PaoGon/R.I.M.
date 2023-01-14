import RoadClosure from "@/Assets/svg/RoadClosure.svg";
import Construction from "@/Assets/svg/Constructions.svg";
import Hazzard from "@/Assets/svg/Hazzard.svg";
import Accident from "@/Assets/svg/Accident.svg";
import Event from "@/Assets/svg/Event.svg";

export const LogsReportsBtnProps = [
  
  {
    id: "All",
    type: "button",
    svg: "",
    icon: "",
    children: "All",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--logs",
    onclick: () => {},
  },
  {
    id: "Recent",
    type: "button",
    svg: "",
    icon: "",
    children: "Recent",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--logs",
    onclick: () => {},
  },
  {
    id: "Oldest",
    type: "button",
    svg: "",
    icon: "",
    children: "Oldest",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--logs",
    onclick: () => {},
  },
  {
    id: "City Project btn",
    type: "button",
    svg: Hazzard,
    icon: "",
    children: "City Project",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--logs",
    onclick: () => {},
  },

  {
    id: "Road Closure btn",
    type: "button",
    svg: RoadClosure,
    icon: "",
    children: "Road Closure",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--active",
    onclick: () => {},
  },

  {
    id: "Road Construction btn",
    type: "button",
    svg: Construction,
    icon: "",
    children: "Road Construction",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--logs",
    onclick: () => {},
  },

  {
    id: "Road Accident btn",
    type: "button",
    svg: Accident,
    icon: "",
    children: "Road Accident",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--logs",
    onclick: () => {},
  },

  {
    id: "Road Event btn",
    type: "button",
    svg: Event,
    icon: "",
    children: "Road Event",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--logs",
    onclick: () => {},
  },

  {
    id: "Road Hazzard btn",
    type: "button",
    svg: Hazzard,
    icon: "",
    children: "Road Hazzard",
    buttonStyle: "btn--logs-design",
    buttonSize: "btn--logs",
    onclick: () => {},
  },

];
