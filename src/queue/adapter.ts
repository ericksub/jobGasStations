
import {queueSincronizador} from './queue';
import { queueSync } from './sync.queue';
import { createBullBoard }  from "@bull-board/api"
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { ExpressAdapter }  from "@bull-board/express"


export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues')

createBullBoard({
  queues: [
    new BullMQAdapter(queueSincronizador),
    new BullMQAdapter(queueSync),
  ],
  serverAdapter
})

