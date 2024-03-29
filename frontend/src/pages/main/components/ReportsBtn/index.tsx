import { FC, useContext, useState } from "react";
import Button from "@/components/Button";

import { ReportType } from "@/generated/graphql";

import { ReportsBtnProps } from "./utils";

import PopUp from "../PopUp";

import Form from "../Form";

import { IReportsBtn } from "./models";
import { stringToEnum } from "@/lib/stringToEnum";

import "./models";

import {MainContext} from '@/setup/context-manager/mainContext'
import {MainContextType} from '@/setup/context-manager/model'

import "./style.css";

const ReportsBtn: FC<IReportsBtn> = ({
  PingPopUp,
  WindowSize,
  popUp,
  trigger,
}) => {
  const [title, setTitle] = useState<string>("");
  const [formType, setFormType] = useState<boolean>(false);

  const {reportType, setReportType } = useContext(MainContext) as MainContextType;

  const selectReports = (id: string) => {
    if (id !== "CityProject") {
      setFormType(false);
    } else {
      setFormType(true);
    }

    setReportType(stringToEnum(id, ReportType));

    setTitle(id.replace(/([A-Z])/g, " $1").trim());

    popUp();

  };

  return (
    <>
      {WindowSize.matches ? (
        PingPopUp ? (
          <div className="main-reports-cont">
            <h2 className="btn-reports-title">Ping Location</h2>
            <div className="btn-reports-container">
              {ReportsBtnProps.map((val, key) => {
                return (
                  <div className="wrap-buttons" key={key}>
                    <Button
                      type={val.type}
                      svg={val.svg}
                      children={val.children}
                      buttonStyle={val.buttonStyle}
                      buttonSize={val.buttonSize}
                      svgBackGround={val.svgBackGround}
                      onClick={() => selectReports(val.id)}
                    ></Button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null
      ) : (
        <div className="main-reports-cont">
          <h2 className="btn-reports-title">Ping Location</h2>
          <div className="btn-reports-container">
            {ReportsBtnProps.map((val, key) => {
              return (
                <div className="wrap-buttons" key={key}>
                  <Button
                    type={val.type}
                    svg={val.svg}
                    children={val.children}
                    buttonStyle={val.buttonStyle}
                    buttonSize={val.buttonSize}
                    onClick={() => selectReports(val.id)}
                  ></Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <PopUp Trigger={trigger} popOut={popUp}>
        <Form
          FormType={formType}
          Title={title}
          PopUp={popUp}
          TypeOfReport={reportType}
        />
      </PopUp>
    </>
  );
};
export default ReportsBtn;
