

import { prisma, PrismaClient } from "@prisma/client";
//import { PrismaClient } from "../../utils/prisma";
import { Args, Ctx, Mutation, Resolver } from "type-graphql";
import { Account, CreateOneAccountArgs} from "../../../prisma/generated/type-graphql"
import * as bcrypt from "bcryptjs"

@Resolver(() => Account)
export class AccountResolver {
    @Mutation(() => Account) 
    async register(
        @Args() args: CreateOneAccountArgs,
        @Ctx() ctx: { prisma: PrismaClient }
    ): Promise<Account> {
        try{
            const hashedPassword = await bcrypt.hash(args.data.password,12)
            
            const account = await ctx.prisma.account.create({
                data: {
                    email: args.data.email,
                    password: hashedPassword,
                    acc_type: args.data.acc_type
                }
            });
            return account;
        }catch(e){ 
            throw e;

        }
    }


}

