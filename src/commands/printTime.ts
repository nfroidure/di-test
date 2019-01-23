import initTime from '../services/time';
import initLog from '../services/log';
import { autoName, service } from 'knifecycle';

export default service(autoName(initPrintTime))

async function initPrintTime() {
    const time = await initTime();
    const log = await initLog();

    return async function printTime() {
      log('The current time is: ', time());
    }
}
