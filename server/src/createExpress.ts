
import express, { Express } from 'express';
import { PrismaClient } from '@prisma/client';

import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';

import { createAccessToken, createRefreshToken } from './customResolver/account/utils/Auth';
import { sendRefreshToken } from './customResolver/account/utils/sendRefreshToken';

import cors from 'cors';


const prisma = new PrismaClient();

export async function createExpress() {
    const app: Express = express();
    app.use(
        cors({
          origin: process.env.DOMAIN,
          credentials: true
        })
      )

    app.use(cookieParser())
    app.post("/refresh_token", async (req, res) => {
    const token = req.cookies.auth_token
    if (!token) {
      return res.send({ ok: false, accessToken: "" })
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)

    } catch (err) {
      console.log(err)
      return res.send({ ok: false, accessToken: "" })
    }

    const account = await prisma.account.findFirst({
      where:
        { acc_id: { equals: payload.accId } }
    })

    if (!account) {
      return res.send({ ok: false, accessToken: "" })
    }

    const payloadData = {
      accessToken: createAccessToken(account),
      accType: account.acc_type
    }

    sendRefreshToken(res, createRefreshToken(account));
    return res.send({ ok: true, payloadData: payloadData })

  });
  return { app };
}


