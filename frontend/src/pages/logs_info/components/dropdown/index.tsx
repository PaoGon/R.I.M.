import { FC, useState, useContext, useEffect } from "react";

import {
  useDeleteOneReportMutation,
  DeleteOneReportMutation,
  ReportType,
} from "@/generated/graphql";

import graphqlRequestClient from "@/lib/client/graphqlRequestClient";

import PopUp from "./components/PopUp";

import { IDropDown } from "./models";

import { AiTwotoneDelete } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";

import { LogsInfoContext } from "@/setup/context-manager/logsInfoContext";
import { LogsInfoContextType } from "@/setup/context-manager/model";

import Update from "./components/Update";

import "./style.css";
import Delete from "./components/Delete";

const DropDown: FC<IDropDown> = ({ report, setMenuTrig }) => {
  const { defaultUpdateData, updateForm2Data } = useContext(
    LogsInfoContext
  ) as LogsInfoContextType;

  useEffect(() => {
    console.log(report?.report?.report_type);
    if (report?.report?.report_type !== ReportType.CityProject) {
      defaultUpdateData["startDate"] = report?.report?.incident?.date_started;
      defaultUpdateData["endDate"] = report?.report?.incident?.date_ended;
      defaultUpdateData["description"] = report?.report?.description;
    } else {
      updateForm2Data["startDate"] = report.report.city_project?.date_started;
      updateForm2Data["endDate"] = report.report.city_project?.date_ended;
      updateForm2Data["description"] = report.report.description;
      updateForm2Data["projectName"] = report.report.city_project?.project_name;
      updateForm2Data["contractor"] =
        report.report.city_project?.contractor_name;
      updateForm2Data["sourceFund"] = report.report.city_project?.source_fund;
      report.report.city_project?.contract_ammount;
      updateForm2Data["programAmount"] =
        report.report.city_project?.project_ammount;
      updateForm2Data["contractAmount"] =
        report.report.city_project?.contract_ammount;
    }
  }, []);

  const [trigger, setTrigger] = useState<boolean>(false);
  const [deleteTrig, setDeleteTrig] = useState<boolean>(false);

  const { mutate: deleteMutate } = useDeleteOneReportMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess: (data: DeleteOneReportMutation) => {
        console.log(data);
      },

      onError: (error: Error) => {
        console.log(error);
      },
    }
  );

  const formTrig = () => {
    setTrigger(!trigger);
    setDeleteTrig(!deleteTrig);
    setMenuTrig();
  };

  const submitDeleteForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    deleteMutate({
      report_id: report?.report?.report_id,
    });
  };

  return (
    <>
      <div className="dropdown-logs-info">
        <ul className="dropdown-card-logs-info">
          <li className="menu-item-logs-info" onClick={() => setTrigger(true)}>
            <p className="drop-icon-logs-info">
              <RiEdit2Fill />
            </p>
            <p>Edit Report</p>
          </li>
          <li
            className="menu-item-logs-info"
            onClick={() => setDeleteTrig(true)}
          >
            <p className="drop-icon-logs-info">
              <AiTwotoneDelete />
            </p>
            <p>Delete Report</p>
          </li>
        </ul>
      </div>
      <>
        <PopUp Trigger={trigger} PopOut={formTrig} DeleteTrig={deleteTrig}>
          {!trigger ? (
            <Delete />
          ) : (
            <Update
              reportID={report?.report?.report_id}
              setTrigger={formTrig}
              reportType={report?.report?.report_type}
            />
          )}
        </PopUp>
      </>
    </>
  );
};
export default DropDown;
