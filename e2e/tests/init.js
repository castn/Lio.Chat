const detox = require('detox');
const adapter = require('detox/runners/mocha/adapter');

const config = require('../../package.json').detox;
const { setup } = require('../helpers/data_setup');

before(async () => {
	await Promise.all([setup(), detox.init(config, { launchApp: false })]);
	// await dataSetup()
	// await detox.init(config, { launchApp: false });
	// await device.launchApp({ permissions: { notifications: 'YES' } });
});

beforeEach(async function () {
	await adapter.beforeEach(this);
});

afterEach(async function () {
	await adapter.afterEach(this);
});

after(async () => {
	await detox.cleanup();
});
