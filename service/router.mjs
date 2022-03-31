import { ethers } from 'ethers';
import Router from 'koa-router';
import { transferCFX } from './txSender.mjs';
import superagent from 'superagent';
import { verifyCaptcha } from './captcha.mjs';

const URL = 'https://evm.confluxrpc.com';
const router = new Router({prefix: '/api/v1'});

const lastClaimCache = {};

// Every hour one time
router.post('/faucet', async ctx => {
  let {
    address,
    token
  } = ctx.request.body;
  address = ethers.utils.getAddress(address); // check address format
  ctx.assert(address, 400, 'Address is required');

  // check cache
  if (!lastClaimCache[address]) {
    lastClaimCache[address] = Date.now() - 7200000;
  }
  ctx.assert(Date.now() - lastClaimCache[address] > 3600000, 400, 'You can claim only once an hour');

  console.log('verifyCaptcha', token);
  let data = await verifyCaptcha(token);
  console.log('verifyResult', data);
  ctx.assert(data.success, 400, 'Invalid captcha');
  // send tx
  const tx = await transferCFX(address, '100');
  lastClaimCache[address] = Date.now();
  // await tx.wait(); // TODO whether need to wait

  ctx.body = tx;
});

// RPC proxy
router.post('/rpc', async ctx => {
  const result = await superagent.post(URL).send(ctx.request.body);
  ctx.body = result.body;
});



export default router;