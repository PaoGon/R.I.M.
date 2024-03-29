import { ChangeEvent, FC, useContext, useMemo } from "react";

import { useUpdateOneReportMutation, ReportType } from "@/generated/graphql";

import graphqlRequestClient from "@/lib/client/graphqlRequestClient";

import { useQueryClient } from "@tanstack/react-query";

import { LogsInfoContext } from "@/setup/context-manager/logsInfoContext";
import { LogsInfoContextType } from "@/setup/context-manager/model";

import DefaultUpdateForm from "./components/DefaultUpdateForm";
import UpdateForm2 from "./components/UpdateForm2";

import ProgressSteps from "./components/ProgressSteps";

import format from "date-fns/format";

import { FaArrowLeft, FaTimes } from "react-icons/fa";

import { IUpdate } from "./models";

import { toast } from "react-toastify";

import "./style.css";
import { isNullableType } from "graphql";

const Update: FC<IUpdate> = ({ reportID, setTrigger, reportType }) => {
  //Toastify Message!
  const Success = () => toast.success("Updated Successfully!");
  const NoUpdate = () => {
    toast.warn("No update has occurred!");
  };

  const {
    page,
    setPage,
    startDate,
    endDate,
    defaultUpdateData,
    setDefaultUpdateData,
    updateForm2Data,
    setUpdateForm2Data,
  } = useContext(LogsInfoContext) as LogsInfoContextType;

  const queryClient = useQueryClient();
  const { mutate: updateMutate } = useUpdateOneReportMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["GetOneReport", { reportId: reportID }]);
        Success();
      },

      onError: (error: Error) => {
        console.log(error);
        NoUpdate();
      },
    }
  );

  const GetDefaultUpdateData = (
    val: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDefaultUpdateData({
      ...defaultUpdateData,
      [val.target.name]: val.target.value,
    });
  };

  const GetUpdateForm2Data = (
    val: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUpdateForm2Data({
      ...updateForm2Data,
      [val.target.name]: val.target.value,
    });
  };

  // if the input is lessthan or = 0 the button is Disabled!
  const isDisabled =
    updateForm2Data.description?.length! <= 0 ||
    updateForm2Data.projectName?.length! <= 0 ||
    updateForm2Data.contractor?.length! <= 0 ||
    updateForm2Data.sourceFund?.length! <= 0 ||
    !updateForm2Data.programAmount ||
    !updateForm2Data.contractAmount;

  const SubmitDefaultUpdateData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateMutate({
      report_id: reportID,
      data: {
        description: { set: defaultUpdateData.description },
        incident: {
          update: {
            date_started: { set: format(startDate, "yyyy-MM-dd") },
            date_ended: { set: format(endDate, "yyyy-MM-dd") },
          },
        },
      },
    });
    setTrigger();
  };

  const SubmitUpdateForm2Data = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateMutate({
      report_id: reportID,
      data: {
        description: { set: updateForm2Data.description },
        city_project: {
          update: {
            project_name: { set: updateForm2Data.projectName },
            contractor_name: { set: updateForm2Data.contractor },
            date_started: { set: format(startDate, "yyyy-MM-dd") },
            date_ended: { set: format(endDate, "yyyy-MM-dd") },
            source_fund: { set: updateForm2Data.sourceFund },
            project_ammount: { set: Number(updateForm2Data.programAmount) },
            contract_ammount: { set: Number(updateForm2Data.contractAmount) },
          },
        },
      },
    });

    setTrigger();
  };

  return (
    <form data-testid="updateForm" className="update-report-form">
      <div className="header-f">
        {page ? (
          <p className="back-b" onClick={() => setPage(false)}>
            <FaArrowLeft />
          </p>
        ) : null}
        <h1 className="up-title">Update</h1>
        <span className="upd-bck-btn" onClick={() => setTrigger()}>
          <FaTimes />
        </span>
      </div>

      {reportType === ReportType.CityProject ? (
        <ProgressSteps page={page} />
      ) : null}
      {reportType !== ReportType.CityProject ? (
        <DefaultUpdateForm
          GetUpdatedData={GetDefaultUpdateData}
          SubmitUpdatedForm={SubmitDefaultUpdateData}
          Disabled={defaultUpdateData.description?.length! <= 0}
        />
      ) : (
        <UpdateForm2
          GetUpdatedData={GetUpdateForm2Data}
          SubmitUpdatedForm={SubmitUpdateForm2Data}
          Disabled={isDisabled}
        />
      )}
    </form>
  );
};

export default Update;
