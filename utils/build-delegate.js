const { spawn } = require('node:child_process');

const args = process.argv.slice(2);

// Check if any cordova-specific/custom arguments are present
const isCordovaBuild = args.some(arg => 
  ['paid', 'free', 'prod', 'p', 'dev', 'd', 'apk', 'bundle', 'fdroid'].includes(arg)
);

if (isCordovaBuild) {
  console.log(`[Build Delegate] Running Cordova Android build with args: ${args.join(' ')}`);
  const child = spawn('sh', ['utils/scripts/build.sh', ...args], { stdio: 'inherit' });
  child.on('exit', (code) => {
    process.exit(code || 0);
  });
} else {
  console.log('[Build Delegate] Running standard Web production build with Rspack...');
  const child = spawn('npx', ['rspack', '--mode', 'production'], { stdio: 'inherit', shell: true });
  child.on('exit', (code) => {
    process.exit(code || 0);
  });
}
