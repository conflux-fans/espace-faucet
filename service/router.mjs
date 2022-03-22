import { ethers } from 'ethers';
import Router from 'koa-router';
import { transferCFX } from './txSender.mjs'; 
const router = new Router({prefix: '/api/v1'});

const lastClaimCache = {};

// Every hour one time
router.get('/faucet', async ctx => {
  let { address } = ctx.request.query;
  ctx.assert(address, 400, 'Address is required');
  address = ethers.utils.getAddress(address); // check address format

  // check cache
  if (!lastClaimCache[address]) {
    lastClaimCache[address] = Date.now() - 7200000;
  }
  ctx.assert(Date.now() - lastClaimCache[address] > 3600000, 400, 'You can claim only once an hour');
  lastClaimCache[address] = Date.now();

  // send tx
  const tx = await transferCFX(address, '100');
  // await tx.wait(); // TODO whether need to wait

  ctx.body = tx;
});

export default router;