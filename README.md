# Humanity VC Contract Example

This project demonstrate how to implement Humanity Protocol VC contract on-chain

## Currently implemented features

On-chain visibility is limited to aggregate, anonymized metrics.

## **Key Features**

- **Verifiable Credentials Management**: Issue and revoke credentials with category support
- **Category Management**: Dynamic credential categorization system
- **Batch Operations**: Efficient bulk processing for credentials and registrations
- **UUPS Upgradeable**: Contract can be upgraded while preserving state
- **Role-Based Access Control**: Separate roles for issuers, registrars, and owner

## Env variables 

```
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
HUMANITY_TESTNET=https://humanity-testnet.g.alchemy.com/public
HUMANITY_MAINNET=https://humanity-mainnet.g.alchemy.com/public
HUMANITY_API_URL=https://humanity-testnet.explorer.alchemy.com/api
HUMANITY_BROWSER_URL=https://humanity-testnet.explorer.alchemy.com
TESTNET_CONTRACT_PROXY_ADDRESS=0x6B325482141A010d79114eb9c8B9C51975DC0a43
MAINNET_CONTRACT_PROXY_ADDRESS=0x836C8C88d368d95Cc245b6EC73d15183303a81f5

```
