import { AccountCreateNestedOneWithoutReportsInput } from "../../../../prisma/generated/type-graphql/resolvers/inputs";
import { CityProjectCreateNestedOneWithoutReportInput } from "../../../../prisma/generated/type-graphql/resolvers/inputs";;
import { IncidentCreateNestedOneWithoutReportInput } from "../../../../prisma/generated/type-graphql/resolvers/inputs";;
import { Location } from "./CreateLocation"
import { Field, InputType } from "type-graphql";
import { IsDate, IsNotEmpty, ValidateNested } from "class-validator";
import { ReportType } from "../../../../prisma/generated/type-graphql/enums/ReportType";

@InputType("CustomReportCreateInput", {isAbstract: true})
export class CustomReportCreateInput {

  @Field(_type => String, {nullable: true})
  report_id?: string | undefined;

  @IsDate()
  @Field(_type => Date, {nullable: true})
  createdAt?: Date | undefined;
  
  @IsDate()
  @Field(_type => Date, {nullable: true})
  updatedAt?: Date | undefined;

  @ValidateNested()
  @Field(_type => Location, {nullable: false})
  location!: Location;

  @IsNotEmpty()
  @Field(_type => String, {nullable: false})
  description!: string;

  @IsNotEmpty()
  @Field(_type => ReportType, {
    nullable: false
  })
  report_type!: "RoadClosure" | "RoadConstruction" | "RoadAccident" | "RoadEvent" | "RoadHazard" | "CityProject";

  @Field(_type => AccountCreateNestedOneWithoutReportsInput, {nullable: true})
  reporter?: AccountCreateNestedOneWithoutReportsInput | undefined;

  @ValidateNested()
  @Field(_type => IncidentCreateNestedOneWithoutReportInput, {nullable: true})
  incident?: IncidentCreateNestedOneWithoutReportInput | undefined;

  @ValidateNested()
  @Field(_type => CityProjectCreateNestedOneWithoutReportInput, {nullable: true})
  city_project?: CityProjectCreateNestedOneWithoutReportInput | undefined;


}
