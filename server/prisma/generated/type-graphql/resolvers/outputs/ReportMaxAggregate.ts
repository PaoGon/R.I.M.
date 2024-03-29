import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReportType } from "../../enums/ReportType";

@TypeGraphQL.ObjectType("ReportMaxAggregate", {
  isAbstract: true
})
export class ReportMaxAggregate {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  report_id!: string | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  createdAt!: Date | null;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true
  })
  updatedAt!: Date | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  description!: string | null;

  @TypeGraphQL.Field(_type => ReportType, {
    nullable: true
  })
  report_type!: "RoadClosure" | "RoadConstruction" | "RoadAccident" | "RoadEvent" | "RoadHazard" | "CityProject" | null;

  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  reporter_id!: string | null;
}
