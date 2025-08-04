const { ethers, run, network } = require('hardhat')
require('dotenv').config()

async function main() {
  //* TESTNET CONFIGURATION

  console.log('Humanity RPC URL:', process.env.HUMANITY_TESTNET)

  const testnetProvider = new ethers.JsonRpcProvider(
    process.env.HUMANITY_TESTNET
  )

  const walletTestnet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    testnetProvider
  )

  const testnetAddress = process.env.TESTNET_CONTRACT_PROXY_ADDRESS
  const testnet_abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
      name: 'AddressEmptyCode',
      type: 'error',
    },
    { inputs: [], name: 'AlreadyExists', type: 'error' },
    { inputs: [], name: 'CategoryAlreadyExists', type: 'error' },
    { inputs: [], name: 'CategoryDoesNotExist', type: 'error' },
    { inputs: [], name: 'CategoryLengthInvalid', type: 'error' },
    { inputs: [], name: 'CredentialAlreadyExists', type: 'error' },
    { inputs: [], name: 'CredentialRevokedOrInvalid', type: 'error' },
    { inputs: [], name: 'DoesNotExist', type: 'error' },
    {
      inputs: [
        { internalType: 'address', name: 'implementation', type: 'address' },
      ],
      name: 'ERC1967InvalidImplementation',
      type: 'error',
    },
    { inputs: [], name: 'ERC1967NonPayable', type: 'error' },
    { inputs: [], name: 'EmptyIssuerDID', type: 'error' },
    { inputs: [], name: 'EmptySourceNotAllowed', type: 'error' },
    { inputs: [], name: 'FailedCall', type: 'error' },
    { inputs: [], name: 'InvalidBatchSize', type: 'error' },
    { inputs: [], name: 'InvalidCredentialCategory', type: 'error' },
    { inputs: [], name: 'InvalidExpirationTime', type: 'error' },
    { inputs: [], name: 'InvalidInitialization', type: 'error' },
    { inputs: [], name: 'NotAuthorized', type: 'error' },
    { inputs: [], name: 'NotInitializing', type: 'error' },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'OwnableInvalidOwner',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'OwnableUnauthorizedAccount',
      type: 'error',
    },
    { inputs: [], name: 'ReferrerDoesNotExist', type: 'error' },
    { inputs: [], name: 'SelfReferralNotAllowed', type: 'error' },
    { inputs: [], name: 'TooManyCategories', type: 'error' },
    { inputs: [], name: 'UUPSUnauthorizedCallContext', type: 'error' },
    {
      inputs: [{ internalType: 'bytes32', name: 'slot', type: 'bytes32' }],
      name: 'UUPSUnsupportedProxiableUUID',
      type: 'error',
    },
    { inputs: [], name: 'UserAlreadyRegistered', type: 'error' },
    { inputs: [], name: 'ZeroAddressNotAllowed', type: 'error' },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'oldAdmin',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newAdmin',
          type: 'address',
        },
      ],
      name: 'AdminTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'category',
          type: 'string',
        },
      ],
      name: 'CategoryAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'category',
          type: 'string',
        },
      ],
      name: 'CategoryRemoved',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'vcHash',
          type: 'bytes32',
        },
      ],
      name: 'CredentialIssued',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'vcHash',
          type: 'bytes32',
        },
      ],
      name: 'CredentialRevoked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint64',
          name: 'version',
          type: 'uint64',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'issuer',
          type: 'address',
        },
      ],
      name: 'IssuerAuthorized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'issuer',
          type: 'address',
        },
      ],
      name: 'IssuerDeauthorized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotal',
          type: 'uint256',
        },
      ],
      name: 'PalmVerifiedUsersIncremented',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'registrar',
          type: 'address',
        },
      ],
      name: 'RegistrarAuthorized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'registrar',
          type: 'address',
        },
      ],
      name: 'RegistrarDeauthorized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldTotal',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotal',
          type: 'uint256',
        },
      ],
      name: 'TotalPalmVerifiedUsersUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldTotal',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotal',
          type: 'uint256',
        },
      ],
      name: 'TotalUsersUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'userAddress',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'referrerAddress',
          type: 'address',
        },
      ],
      name: 'UserRegistered',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotal',
          type: 'uint256',
        },
      ],
      name: 'UsersIncremented',
      type: 'event',
    },
    {
      inputs: [],
      name: 'MAX_BATCH_SIZE',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MAX_CATEGORIES',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MAX_CATEGORY_LENGTH',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MAX_REGISTRATION_BATCH_SIZE',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'UPGRADE_INTERFACE_VERSION',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string[]', name: '_categories', type: 'string[]' },
      ],
      name: 'addCategories',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: '_category', type: 'string' }],
      name: 'addCategory',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'addToTotalPalmVerifiedUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'addToTotalUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'admin',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_issuer', type: 'address' }],
      name: 'authorizeIssuer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_registrar', type: 'address' },
      ],
      name: 'authorizeRegistrar',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'authorizedIssuers',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'authorizedRegistrars',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'bytes32', name: 'vcHash', type: 'bytes32' },
            { internalType: 'string', name: 'vcCategory', type: 'string' },
            { internalType: 'string', name: 'vcSource', type: 'string' },
            { internalType: 'string', name: 'issuerDID', type: 'string' },
            { internalType: 'uint256', name: 'expiresAt', type: 'uint256' },
          ],
          internalType: 'struct IHumanityProtocolVCsPhase1.CredentialData[]',
          name: '_credentials',
          type: 'tuple[]',
        },
      ],
      name: 'batchIssueCredentials',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'userAddr', type: 'address' },
            {
              internalType: 'address',
              name: 'referrerAddr',
              type: 'address',
            },
          ],
          internalType: 'struct IHumanityProtocolVCsPhase1.User[]',
          name: '_usersToRegister',
          type: 'tuple[]',
        },
      ],
      name: 'batchRegister',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'categoryList',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_issuer', type: 'address' }],
      name: 'deauthorizeIssuer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_registrar', type: 'address' },
      ],
      name: 'deauthorizeRegistrar',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCategories',
      outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '_categoryHash', type: 'bytes32' },
      ],
      name: 'getCategoryString',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '_vcHash', type: 'bytes32' }],
      name: 'getVcData',
      outputs: [
        {
          components: [
            { internalType: 'string', name: 'issuerDID', type: 'string' },
            {
              internalType: 'enum IHumanityProtocolVCsPhase1.VCStatus',
              name: 'status',
              type: 'uint8',
            },
            { internalType: 'uint256', name: 'expiresAt', type: 'uint256' },
            { internalType: 'string', name: 'category', type: 'string' },
            { internalType: 'string', name: 'source', type: 'string' },
          ],
          internalType: 'struct IHumanityProtocolVCsPhase1.VC',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '', type: 'bytes32' },
        { internalType: 'string', name: '', type: 'string' },
      ],
      name: 'hasCredentialOfType',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'incrementPalmVerifiedUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'incrementUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: '_category', type: 'string' }],
      name: 'isCategoryValid',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '_vcHash', type: 'bytes32' }],
      name: 'isCredentialValid',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_userAddress', type: 'address' },
      ],
      name: 'isRegistered',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '_vcHash', type: 'bytes32' },
        { internalType: 'string', name: '_vcCategory', type: 'string' },
        { internalType: 'string', name: '_vcSource', type: 'string' },
        { internalType: 'string', name: '_issuerDID', type: 'string' },
        { internalType: 'uint256', name: '_expiresAt', type: 'uint256' },
      ],
      name: 'issueCredential',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '_vcHash', type: 'bytes32' },
        { internalType: 'string', name: '_issuerDID', type: 'string' },
        { internalType: 'uint256', name: '_expiresAt', type: 'uint256' },
      ],
      name: 'issueCredential',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_userAddress', type: 'address' },
        {
          internalType: 'address',
          name: '_referrerAddress',
          type: 'address',
        },
      ],
      name: 'register',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string[]', name: '_categories', type: 'string[]' },
      ],
      name: 'removeCategories',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: '_category', type: 'string' }],
      name: 'removeCategory',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '_vcHash', type: 'bytes32' }],
      name: 'revokeCredential',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_count', type: 'uint256' }],
      name: 'setTotalPalmVerifiedUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_count', type: 'uint256' }],
      name: 'setTotalUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalPalmVerifiedUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_newAdmin', type: 'address' }],
      name: 'transferAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newImplementation',
          type: 'address',
        },
        { internalType: 'bytes', name: 'data', type: 'bytes' },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_userAddress', type: 'address' },
      ],
      name: 'users',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'userAddr', type: 'address' },
            {
              internalType: 'address',
              name: 'referrerAddr',
              type: 'address',
            },
          ],
          internalType: 'struct IHumanityProtocolVCsPhase1.User',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      name: 'validCategories',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      name: 'vcRegistry',
      outputs: [
        { internalType: 'string', name: 'issuerDID', type: 'string' },
        {
          internalType: 'enum IHumanityProtocolVCsPhase1.VCStatus',
          name: 'status',
          type: 'uint8',
        },
        { internalType: 'uint256', name: 'expiresAt', type: 'uint256' },
        { internalType: 'string', name: 'category', type: 'string' },
        { internalType: 'string', name: 'source', type: 'string' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]

  const testNetContract = new ethers.Contract(
    testnetAddress,
    testnet_abi,
    walletTestnet
  )

  // Example 1: Read total users
  const totalTestnetUsers = await testNetContract.totalUsers()
  console.log('Total Testnet Users:', totalTestnetUsers.toString())

  // Example 2: Read total palm verified users
  const totalTesnetPalmVerifiedUsers =
    await testNetContract.totalPalmVerifiedUsers()
  console.log(
    'Total Testnet Palm Verified Users:',
    totalTesnetPalmVerifiedUsers.toString()
  )

  //* MAINNET CONFIGURATION

  console.log('Humanity RPC URL:', process.env.HUMANITY_MAINNET)

  const mainnetProvider = new ethers.JsonRpcProvider(
    process.env.HUMANITY_MAINNET
  )

  const walletMainnet = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    mainnetProvider
  )

  const mainnetAddress = process.env.MAINNET_CONTRACT_PROXY_ADDRESS
  const mainnet_abi = [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    {
      inputs: [{ internalType: 'address', name: 'target', type: 'address' }],
      name: 'AddressEmptyCode',
      type: 'error',
    },
    { inputs: [], name: 'AlreadyExists', type: 'error' },
    { inputs: [], name: 'CategoryAlreadyExists', type: 'error' },
    { inputs: [], name: 'CategoryDoesNotExist', type: 'error' },
    { inputs: [], name: 'CategoryLengthInvalid', type: 'error' },
    { inputs: [], name: 'CredentialAlreadyExists', type: 'error' },
    { inputs: [], name: 'CredentialRevokedOrInvalid', type: 'error' },
    { inputs: [], name: 'DoesNotExist', type: 'error' },
    {
      inputs: [
        { internalType: 'address', name: 'implementation', type: 'address' },
      ],
      name: 'ERC1967InvalidImplementation',
      type: 'error',
    },
    { inputs: [], name: 'ERC1967NonPayable', type: 'error' },
    { inputs: [], name: 'EmptyIssuerDID', type: 'error' },
    { inputs: [], name: 'EmptySourceNotAllowed', type: 'error' },
    { inputs: [], name: 'FailedCall', type: 'error' },
    { inputs: [], name: 'InvalidBatchSize', type: 'error' },
    { inputs: [], name: 'InvalidCredentialCategory', type: 'error' },
    { inputs: [], name: 'InvalidExpirationTime', type: 'error' },
    { inputs: [], name: 'InvalidInitialization', type: 'error' },
    { inputs: [], name: 'NotAuthorized', type: 'error' },
    { inputs: [], name: 'NotInitializing', type: 'error' },
    {
      inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
      name: 'OwnableInvalidOwner',
      type: 'error',
    },
    {
      inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      name: 'OwnableUnauthorizedAccount',
      type: 'error',
    },
    { inputs: [], name: 'ReferrerDoesNotExist', type: 'error' },
    { inputs: [], name: 'SelfReferralNotAllowed', type: 'error' },
    { inputs: [], name: 'TooManyCategories', type: 'error' },
    { inputs: [], name: 'UUPSUnauthorizedCallContext', type: 'error' },
    {
      inputs: [{ internalType: 'bytes32', name: 'slot', type: 'bytes32' }],
      name: 'UUPSUnsupportedProxiableUUID',
      type: 'error',
    },
    { inputs: [], name: 'UserAlreadyRegistered', type: 'error' },
    { inputs: [], name: 'ZeroAddressNotAllowed', type: 'error' },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'oldAdmin',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newAdmin',
          type: 'address',
        },
      ],
      name: 'AdminTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'category',
          type: 'string',
        },
      ],
      name: 'CategoryAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: 'category',
          type: 'string',
        },
      ],
      name: 'CategoryRemoved',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'vcHash',
          type: 'bytes32',
        },
      ],
      name: 'CredentialIssued',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'vcHash',
          type: 'bytes32',
        },
      ],
      name: 'CredentialRevoked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint64',
          name: 'version',
          type: 'uint64',
        },
      ],
      name: 'Initialized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'issuer',
          type: 'address',
        },
      ],
      name: 'IssuerAuthorized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'issuer',
          type: 'address',
        },
      ],
      name: 'IssuerDeauthorized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotal',
          type: 'uint256',
        },
      ],
      name: 'PalmVerifiedUsersIncremented',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'registrar',
          type: 'address',
        },
      ],
      name: 'RegistrarAuthorized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'registrar',
          type: 'address',
        },
      ],
      name: 'RegistrarDeauthorized',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldTotal',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotal',
          type: 'uint256',
        },
      ],
      name: 'TotalPalmVerifiedUsersUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'oldTotal',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotal',
          type: 'uint256',
        },
      ],
      name: 'TotalUsersUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'implementation',
          type: 'address',
        },
      ],
      name: 'Upgraded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'userAddress',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'referrerAddress',
          type: 'address',
        },
      ],
      name: 'UserRegistered',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newTotal',
          type: 'uint256',
        },
      ],
      name: 'UsersIncremented',
      type: 'event',
    },
    {
      inputs: [],
      name: 'MAX_BATCH_SIZE',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MAX_CATEGORIES',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MAX_CATEGORY_LENGTH',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MAX_REGISTRATION_BATCH_SIZE',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'UPGRADE_INTERFACE_VERSION',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string[]', name: '_categories', type: 'string[]' },
      ],
      name: 'addCategories',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: '_category', type: 'string' }],
      name: 'addCategory',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'addToTotalPalmVerifiedUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
      name: 'addToTotalUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'admin',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_issuer', type: 'address' }],
      name: 'authorizeIssuer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_registrar', type: 'address' },
      ],
      name: 'authorizeRegistrar',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'authorizedIssuers',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '', type: 'address' }],
      name: 'authorizedRegistrars',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'bytes32', name: 'vcHash', type: 'bytes32' },
            { internalType: 'string', name: 'vcCategory', type: 'string' },
            { internalType: 'string', name: 'vcSource', type: 'string' },
            { internalType: 'string', name: 'issuerDID', type: 'string' },
            { internalType: 'uint256', name: 'expiresAt', type: 'uint256' },
          ],
          internalType: 'struct IHumanityProtocolVCsPhase1.CredentialData[]',
          name: '_credentials',
          type: 'tuple[]',
        },
      ],
      name: 'batchIssueCredentials',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          components: [
            { internalType: 'address', name: 'userAddr', type: 'address' },
            { internalType: 'address', name: 'referrerAddr', type: 'address' },
          ],
          internalType: 'struct IHumanityProtocolVCsPhase1.User[]',
          name: '_usersToRegister',
          type: 'tuple[]',
        },
      ],
      name: 'batchRegister',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'categoryList',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_issuer', type: 'address' }],
      name: 'deauthorizeIssuer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_registrar', type: 'address' },
      ],
      name: 'deauthorizeRegistrar',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCategories',
      outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '_categoryHash', type: 'bytes32' },
      ],
      name: 'getCategoryString',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '_vcHash', type: 'bytes32' }],
      name: 'getVcData',
      outputs: [
        {
          components: [
            { internalType: 'string', name: 'issuerDID', type: 'string' },
            {
              internalType: 'enum IHumanityProtocolVCsPhase1.VCStatus',
              name: 'status',
              type: 'uint8',
            },
            { internalType: 'uint256', name: 'expiresAt', type: 'uint256' },
            { internalType: 'string', name: 'category', type: 'string' },
            { internalType: 'string', name: 'source', type: 'string' },
          ],
          internalType: 'struct IHumanityProtocolVCsPhase1.VC',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '', type: 'bytes32' },
        { internalType: 'string', name: '', type: 'string' },
      ],
      name: 'hasCredentialOfType',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'incrementPalmVerifiedUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'incrementUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: '_category', type: 'string' }],
      name: 'isCategoryValid',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '_vcHash', type: 'bytes32' }],
      name: 'isCredentialValid',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_userAddress', type: 'address' },
      ],
      name: 'isRegistered',
      outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '_vcHash', type: 'bytes32' },
        { internalType: 'string', name: '_vcCategory', type: 'string' },
        { internalType: 'string', name: '_vcSource', type: 'string' },
        { internalType: 'string', name: '_issuerDID', type: 'string' },
        { internalType: 'uint256', name: '_expiresAt', type: 'uint256' },
      ],
      name: 'issueCredential',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'bytes32', name: '_vcHash', type: 'bytes32' },
        { internalType: 'string', name: '_issuerDID', type: 'string' },
        { internalType: 'uint256', name: '_expiresAt', type: 'uint256' },
      ],
      name: 'issueCredential',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'proxiableUUID',
      outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_userAddress', type: 'address' },
        { internalType: 'address', name: '_referrerAddress', type: 'address' },
      ],
      name: 'register',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'string[]', name: '_categories', type: 'string[]' },
      ],
      name: 'removeCategories',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'string', name: '_category', type: 'string' }],
      name: 'removeCategory',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '_vcHash', type: 'bytes32' }],
      name: 'revokeCredential',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_count', type: 'uint256' }],
      name: 'setTotalPalmVerifiedUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'uint256', name: '_count', type: 'uint256' }],
      name: 'setTotalUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalPalmVerifiedUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalUsers',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: '_newAdmin', type: 'address' }],
      name: 'transferAdmin',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'newImplementation', type: 'address' },
        { internalType: 'bytes', name: 'data', type: 'bytes' },
      ],
      name: 'upgradeToAndCall',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: '_userAddress', type: 'address' },
      ],
      name: 'users',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'userAddr', type: 'address' },
            { internalType: 'address', name: 'referrerAddr', type: 'address' },
          ],
          internalType: 'struct IHumanityProtocolVCsPhase1.User',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      name: 'validCategories',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
      name: 'vcRegistry',
      outputs: [
        { internalType: 'string', name: 'issuerDID', type: 'string' },
        {
          internalType: 'enum IHumanityProtocolVCsPhase1.VCStatus',
          name: 'status',
          type: 'uint8',
        },
        { internalType: 'uint256', name: 'expiresAt', type: 'uint256' },
        { internalType: 'string', name: 'category', type: 'string' },
        { internalType: 'string', name: 'source', type: 'string' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ]

  const mainnetContract = new ethers.Contract(
    mainnetAddress,
    mainnet_abi,
    walletMainnet
  )

  // Example 1: Read total users
  const totalMainnetUsers = await mainnetContract.totalUsers()
  console.log('Total Mainnet Users:', totalMainnetUsers.toString())

  // Example 2: Read total palm verified users
  const totalMainnetPalmVerifiedUsers =
    await mainnetContract.totalPalmVerifiedUsers()
  console.log(
    'Total Mainnet Palm Verified Users:',
    totalMainnetPalmVerifiedUsers.toString()
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
