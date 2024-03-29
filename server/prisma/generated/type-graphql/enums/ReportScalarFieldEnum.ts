import * as TypeGraphQL from "type-graphql";

export enum ReportScalarFieldEnum {
  report_id = "report_id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  location = "location",
  description = "description",
  report_type = "report_type",
  reporter_id = "reporter_id"
}
TypeGraphQL.registerEnumType(ReportScalarFieldEnum, {
  name: "ReportScalarFieldEnum",
  description: undefined,
});
