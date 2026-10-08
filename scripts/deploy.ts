import path from 'path';
import { deploy } from '@samkirkland/ftp-deploy';
import { config } from 'dotenv';

const envPath = '.env';
const { parsed } = config({ path: envPath });

if (!parsed) {
  // eslint-disable-next-line no-console
  console.error(`Environment variables validation failed. Unable to find env file: ${envPath}`);
  process.exit(1);
}

const FTP_USERNAME = parsed.FTP_USERNAME ?? '';
const FTP_PASSWORD = parsed.FTP_PASSWORD ?? '';
const FTP_HOST = parsed.FTP_HOST ?? '';
const FTP_PORT = Number(parsed.FTP_PORT) || 21;
// The FTP account's root is the shared public_html; tdriver.uz lives in its own folder there.
const FTP_SERVER_DIR = parsed.FTP_SERVER_DIR || './tdriver.uz/';

if (!/^\.\/[\w.-]+\/$/.test(FTP_SERVER_DIR)) {
  // eslint-disable-next-line no-console
  console.error(`Refusing to deploy to "${FTP_SERVER_DIR}": use a subfolder like ./tdriver.uz/`);
  process.exit(1);
}

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
    'server-dir': FTP_SERVER_DIR,
    // Replaces the library defaults, so they are repeated here.
    exclude: ['**/.git*', '**/.git*/**', '**/node_modules/**', '**/.DS_Store', '**/*.tsbuildinfo'],
  });

  console.log('🚀 Deploy done!');
}

deployMyCode();
