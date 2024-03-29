import { ReportType } from "@/generated/graphql";

export interface IDefaultUpdateForm
  extends ISubmitUpdatedForm,
    IGetUpdatedData {
  Disabled: boolean;
}

export interface IUpdateForm2
  extends IGetUpdatedData,
    ISubmitUpdatedForm,
    IDefaultUpdateForm {}

export interface ISubmitUpdatedForm {
  SubmitUpdatedForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface IDefaultUpdateData {
  startDate: string;
  endDate: string;
  description: string;
}

export interface IUpdateForm2Data extends IDefaultUpdateData {
  projectName: string | undefined;
  contractor: string | undefined;
  sourceFund: string | undefined;
  programAmount: number | undefined;
  contractAmount: number | undefined;
}

export interface IGetUpdatedData {
  GetUpdatedData(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): any;
}

export interface IPage1 extends IDefaultUpdateForm, IGetUpdatedData {}
export interface Ipage2 extends ISubmitUpdatedForm, IGetUpdatedData {
  Disabled: boolean;
}

export interface IUpdate {
  reportType: ReportType | undefined;
  reportID: string | undefined;
  setTrigger(): void;
}
