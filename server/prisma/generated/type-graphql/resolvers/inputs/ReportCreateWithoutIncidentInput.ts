import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { AccountCreateNestedOneWithoutReportsInput } from "../inputs/AccountCreateNestedOneWithoutReportsInput";
import { CityProjectCreateNestedOneWithoutReportInput } from "../inputs/CityProjectCreateNestedOneWithoutReportInput";

@TypeGraphQL.InputType("ReportCreateWithoutIncidentInput", {
  isAbstract: true
})
export class ReportCreateWithoutIncidentInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  report_id?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: false
  })
  published!: boolean;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  location!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  description!: string;

  @TypeGraphQL.Field(_type => AccountCreateNestedOneWithoutReportsInput, {
    nullable: true
  })
  reporter?: AccountCreateNestedOneWithoutReportsInput | undefined;

  @TypeGraphQL.Field(_type => CityProjectCreateNestedOneWithoutReportInput, {
    nullable: true
  })
  city_porject?: CityProjectCreateNestedOneWithoutReportInput | undefined;
}