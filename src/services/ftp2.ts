import { inject, name } from 'knifecycle';
import initFTP from './ftp';

export default name('ftp2', inject(['config>config2'], initFTP));
