require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY || '0xkey'

const HUMANITY_TESTNET = process.env.HUMANITY_TESTNET || ''
const HUMANITY_API_URL = process.env.HUMANITY_API_URL || ''

const HUMANITY_BROWSER_URL = process.env.HUMANITY_BROWSER_URL || ''

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.29',
      },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    'humanity-testnet': {
      url: HUMANITY_TESTNET,
    },
    localhost: {
      url: 'http://127.0.0.1:8545/', // ? url running from npx hardhat node
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      'humanity-testnet': 'empty',
    },
    customChains: [
      {
        network: 'humanity-testnet',
        chainId: 7080969,
        urls: {
          apiURL: HUMANITY_API_URL,
          browserURL: HUMANITY_BROWSER_URL,
        },
      },
    ],
  },
}
