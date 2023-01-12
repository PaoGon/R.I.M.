import * as TypeGraphQL from "type-graphql";
import * as GraphQLScalars from "graphql-scalars";
import { Prisma } from "@prisma/client";
import { DecimalJSScalar } from "../../scalars";
import { ReportCreateNestedManyWithoutReporterInput } from "../inputs/ReportCreateNestedManyWithoutReporterInput";
import { AccType } from "../../enums/AccType";

@TypeGraphQL.InputType("AccountCreateInput", {
  isAbstract: true
})
export class AccountCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true
  })
  acc_id?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  password!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: false
  })
  designation!: string;

  @TypeGraphQL.Field(_type => AccType, {
    nullable: false
  })
  acc_type!: "NORMAL" | "ADMIN";

  @TypeGraphQL.Field(_type => ReportCreateNestedManyWithoutReporterInput, {
    nullable: true
  })
  reports?: ReportCreateNestedManyWithoutReporterInput | undefined;
}
