import { FC, useContext } from "react";

import { IUpdateForm2 } from "../../models";

import Page1 from "./components/Page1";
import Page2 from "./components/Page2";

import { LogsInfoContext } from "@/setup/context-manager/logsInfoContext";
import { LogsInfoContextType } from "@/setup/context-manager/model";

const UpdateForm2: FC<IUpdateForm2> = ({
  GetUpdatedData,
  SubmitUpdatedForm,
}) => {
  const { page } = useContext(LogsInfoContext) as LogsInfoContextType;
  return (
    <>
      {!page ? (
        <Page1
          GetUpdatedData={GetUpdatedData}
          SubmitUpdatedForm={SubmitUpdatedForm}
        />
      ) : (
        <Page2
          GetUpdatedData={GetUpdatedData}
          SubmitUpdatedForm={SubmitUpdatedForm}
        />
      )}
    </>
  );
};

export default UpdateForm2;
