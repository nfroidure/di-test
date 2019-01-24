import initTime, { Timer } from '../services/time';
import initLog, { Logger } from '../services/log';
import { autoService } from 'knifecycle';

export default autoService(initPrintTime);

async function initPrintTime({ time, log }: { log: Logger; time: Timer }) {
  return async function printTime() {
    log('The current time is: ', time());
  };
}
