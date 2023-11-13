import path from 'path';
import { deploy } from '@samkirkland/ftp-deploy';
import { config } from 'dotenv';

export const envPath = '.env';
export const { parsed } = config({ path: envPath });

if (!parsed) {
  // eslint-disable-next-line no-console
  console.error(`Environment variables validation failed. Unable to find env file: ${envPath}`);
  process.exit(1);
}

const FTP_USERNAME = parsed.FTP_USERNAME ?? '';
const FTP_PASSWORD = parsed.FTP_PASSWORD ?? '';
const FTP_HOST = parsed.FTP_HOST ?? '';
const FTP_PORT = Number(parsed.FTP_PORT) || 21;

const BUILD_FOLDER = path.resolve('build') + '/';

async function deployMyCode() {
  console.log('🚚 Deploy started');

  await deploy({
    server: FTP_HOST,
    username: FTP_USERNAME,
    password: FTP_PASSWORD,
    port: FTP_PORT,
    protocol: 'ftps',
    'local-dir': BUILD_FOLDER,
    'dangerous-clean-slate': true,
  });

  console.log('🚀 Deploy done!');
}

deployMyCode();
