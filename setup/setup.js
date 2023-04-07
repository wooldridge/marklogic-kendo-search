const config = require(process.argv[2] || './config'),
      client = require('./client.js');  

const setup = async (config) => {
  console.log(
    '                            SETUP STARTED                             '.gray.bold.inverse
  );
  try {
    await client.getConfig(config); // Test connectivity
  } catch(error) {
    console.error("Cannot connect to MarkLogic, ending setup.".red);
    process.exit();
  }
  await Promise.all(
    config.databases.config.map(confDb => {
      client.configDatabase(config.databases.content.name, confDb, config)
    })
  );
  await client.setRESTAuth(config);
  console.log('Loading data...'.green);
  await Promise.all([
    client.loadContent(config),
    client.loadSearchOptions(config)
  ]);
  console.log(
      '                            SETUP FINISHED                            '.gray.bold.inverse
  );
}

setup(config);
