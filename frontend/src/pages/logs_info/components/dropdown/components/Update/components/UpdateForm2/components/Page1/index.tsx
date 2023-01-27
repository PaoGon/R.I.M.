import { FC, useContext } from "react";

import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { btnType } from "@/components/Button/models";

import { IPage1 } from "../../../../models";

import { LogsInfoContext } from "@/setup/context-manager/logsInfoContext";
import { LogsInfoContextType } from "@/setup/context-manager/model";

import { Calendar } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import useOnclickOutside from "react-cool-onclickoutside";

const Page1: FC<IPage1> = ({ GetUpdatedData }) => {
  const {
    calendarStart,
    calendarEnd,
    setCalendarStart,
    setCalendarEnd,
    clickCalendar,
    handleStartDate,
    handleEndDate,
    next,
    updateForm2Data,
  } = useContext(LogsInfoContext) as LogsInfoContextType;

  const ref = useOnclickOutside(() => {
    clickCalendar();
  });
  return (
    <>
      <div className="ui-field">
        <InputField
          label={"Date Started"}
          value={updateForm2Data.startDate.split("T")[0]}
          type={"text"}
          name={"StartDate"}
          placeholder={"YYYY/MM/DD"}
          forinput={"calendar"}
          id={"start-date"}
          readonly={true}
          onClick={() => setCalendarStart(true)}
          getData={GetUpdatedData}
        />
      </div>

      <div className="d-wrap">
        {calendarStart ? (
          <div ref={ref}>
            <Calendar
              date={new Date()}
              onChange={handleStartDate}
              className="calendarElement"
            />
          </div>
        ) : null}
      </div>

      <div className="ui-field">
        <InputField
          label={"Date Ended"}
          type={"text"}
          value={updateForm2Data.endDate.split("T")[0]}
          name={"EndDate"}
          placeholder={"YYYY/MM/DD"}
          forinput={"calendar"}
          id={"end-date"}
          readonly={true}
          onClick={() => {
            setCalendarEnd(true);
          }}
          getData={GetUpdatedData}
        />
      </div>

      <div className="d-wrap">
        {calendarEnd ? (
          <div ref={ref}>
            <Calendar
              date={new Date()}
              onChange={handleEndDate}
              className="calendarElement"
            />
          </div>
        ) : null}
      </div>

      <div className="update-description f-gap">
        <p>
          <label htmlFor="up-description">Description</label>
        </p>
        <textarea
          id="description"
          name="description"
          value={updateForm2Data.description}
          onChange={GetUpdatedData}
          rows={7}
          cols={51}
        />
      </div>

      <div className="update-button ub-gap">
        <Button
          type={btnType.Button}
          buttonStyle={"btn--superBlue"}
          onClick={() => {
            next();
          }}
          buttonSize={"btn--large"}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default Page1;
