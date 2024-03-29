import { FC, useState } from "react";


import { BtnFilterprops } from "./utils";
import Button from "@/components/Button";

import { IFilter } from "./models";

import { FaCalendarAlt } from "react-icons/fa";

import "./style.css";
import InputField from "@/components/InputField";

import { Calendar } from "react-date-range";

import format from "date-fns/format";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import useOnclickOutside from "react-cool-onclickoutside";
import { btnType } from "@/components/Button/models";

const Filter: FC<IFilter> = ({ setFilterType, setFilterDate, filterDate, fetchActiveReports }) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
 
  // When you Click the number inside the Calendar
  const openCalendarFilter = () => {
    if (calendarOpen) {
      setCalendarOpen(false);
    }
    console.log("Click!");
  };

  const handleFDate = (date: Date) => {
    setFilterDate(format(date, "yyyy-MM-dd") + "T00:00:00.000Z");
    setCalendarOpen(false);
  };

  const ref = useOnclickOutside(() => {
    setCalendarOpen(false);
  });

  return (
    <>
      <div className="filter-container">
        <p className="locate">Locate</p>
        <div className="btn-filter">
          {BtnFilterprops.map((val, key) => {
            return (
              <div className="icon-container" key={key}
              >
                <Button
                  type={val.type}
                  svg={val.svg}
                  children={val.children}
                  buttonStyle={val.buttonStyle}
                  buttonSize={val.buttonSize}
                  svgBackGround={val.svgBackGround}
                  onClick={() => setFilterType(val.reporttype)}
                ></Button>
              </div>
            );
          })}
        </div> <div className="filter2-fit">
              
        <div className="btn-filter2">
          <Button
            type={btnType.Button}
            onClick={() => fetchActiveReports()}
            buttonStyle={"filter-style2"}
            buttonSize={"btn--small"}
          >
            Active and Incoming
          </Button>

          </div>
          
        </div>
        <div className="calendarflt-container">
          <div className="fdate">
            <div className="filter-calendar" onClick={openCalendarFilter}>
              <InputField
                type={"text"}
                placeholder={"YYYY-MM-DD"}
                value={filterDate!.split("T")[0]}
                name={"calendarFilt"}
                readonly={true}
                onClick={() => setCalendarOpen(true)}
              />
            </div>

            {calendarOpen ? (
              <div ref={ref}>
                <Calendar
                  date={new Date()}
                  onChange={handleFDate}
                  className="calendarFilter"
                />
              </div>
            ) : null}
          </div>
          <span className="calendar-svg">
            <FaCalendarAlt />
          </span>
        </div>
      </div>
    </>
  );
};

export default Filter;
