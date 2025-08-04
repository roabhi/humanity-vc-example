// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

/**
 * @title IHumanityProtocolVCs_Phase1
 * @dev Interface for HumanityProtocolVCs_Phase1 contract
 */
interface IHumanityProtocolVCsPhase1 {
    // Custom errors
    error EmptySourceNotAllowed();
    error ZeroAddressNotAllowed();
    error NotAuthorized();
    error AlreadyExists();
    error DoesNotExist();
    error InvalidBatchSize();
    error UserAlreadyRegistered();
    error ReferrerDoesNotExist();
    error SelfReferralNotAllowed();
    error CredentialAlreadyExists();
    error InvalidCredentialCategory();
    error CredentialRevokedOrInvalid();
    error CategoryLengthInvalid();
    error TooManyCategories();
    error CategoryAlreadyExists();
    error CategoryDoesNotExist();
    error EmptyIssuerDID();
    error InvalidExpirationTime();

    // Enum for credential status
    enum VCStatus {
        ACTIVE,
        REVOKED
    }

    // Structure for verifiable credentials
    struct VC {
        string issuerDID; // DID of the issuer (validator)
        VCStatus status; // Status of the credential (ACTIVE, REVOKED)
        uint256 expiresAt; // Timestamp when expires (0 for no expiry)
        string category; // Category as string instead of enum
        string source; // Source identifier
    }

    // Structure for User data
    struct User {
        address userAddr; // User's address (key in mapping)
        address referrerAddr; // User's referrer address (address(0) if none)
        // Note: 'verified' status from old contract is not part of this phase
    }

    // Structure for batch credential data
    struct CredentialData {
        bytes32 vcHash;
        string vcCategory;
        string vcSource;
        string issuerDID;
        uint256 expiresAt;
    }

    // Events
    event CredentialIssued(bytes32 indexed vcHash);
    event CredentialRevoked(bytes32 indexed vcHash);
    event IssuerAuthorized(address indexed issuer);
    event IssuerDeauthorized(address indexed issuer);
    event AdminTransferred(address indexed oldAdmin, address indexed newAdmin); // Kept for Ownable compatibility
    event UsersIncremented(uint256 newTotal);
    event PalmVerifiedUsersIncremented(uint256 newTotal);
    event UserRegistered(
        address indexed userAddress,
        address indexed referrerAddress
    );
    event RegistrarAuthorized(address indexed registrar); // New event
    event RegistrarDeauthorized(address indexed registrar); // New event
    event CategoryAdded(string category);
    event CategoryRemoved(string category);
    event TotalUsersUpdated(uint256 oldTotal, uint256 newTotal);
    event TotalPalmVerifiedUsersUpdated(uint256 oldTotal, uint256 newTotal);

    // --- Mappings (Public getters) ---

    /**
     * @dev Returns the VC data associated with a hash. Explicit getter for interface compliance.
     */
    function getVcData(bytes32 vcHash) external view returns (VC memory);

    /**
     * @dev Returns the User data associated with an address.
     * Returns User(address(0), address(0)) if the user is not registered.
     */
    function users(address userAddress) external view returns (User memory);

    function authorizedIssuers(address _issuer) external view returns (bool);

    /**
     * @dev Checks if an address is an authorized registrar.
     */
    function authorizedRegistrars(
        address _registrar
    ) external view returns (bool);

    // --- State Variables (Public getters) ---

    function totalUsers() external view returns (uint256);

    function totalPalmVerifiedUsers() external view returns (uint256);

    function admin() external view returns (address); // Implemented via owner()

    // --- Functions ---

    // --- Issuer Management (Owner Controlled) ---
    function authorizeIssuer(address _issuer) external; // Only owner

    function deauthorizeIssuer(address _issuer) external; // Only owner

    // --- Registrar Management (Owner Controlled) ---
    /**
     * @dev Authorizes an address to register users. Only owner.
     * @param _registrar Address to authorize.
     */
    function authorizeRegistrar(address _registrar) external; // Only owner

    /**
     * @dev Deauthorizes an address from registering users. Only owner.
     * @param _registrar Address to deauthorize.
     */
    function deauthorizeRegistrar(address _registrar) external; // Only owner

    // --- Ownership Transfer (Owner Controlled) ---
    function transferAdmin(address _newAdmin) external; // Implemented via transferOwnership()

    // --- Manual Counter Increments (Owner Controlled) ---
    function incrementUsers() external returns (uint256); // Only owner

    function incrementPalmVerifiedUsers() external returns (uint256); // Only owner

    // --- Batch Counter Management (Owner Controlled) ---
    function setTotalUsers(uint256 _count) external returns (uint256); // Only owner

    function setTotalPalmVerifiedUsers(
        uint256 _count
    ) external returns (uint256); // Only owner

    function addToTotalUsers(uint256 _amount) external returns (uint256); // Only owner

    function addToTotalPalmVerifiedUsers(
        uint256 _amount
    ) external returns (uint256); // Only owner

    // --- Credential Management ---
    /**
     * @dev Issues a new verifiable credential with category and source
     * @param _vcHash Hash of the credential to issue
     * @param _vcCategory Category of the credential
     * @param _vcSource Source of the credential
     * @param _issuerDID DID of the issuer
     * @param _expiresAt Expiration timestamp (0 for no expiration)
     */
    function issueCredential(
        bytes32 _vcHash,
        string calldata _vcCategory,
        string calldata _vcSource,
        string calldata _issuerDID,
        uint256 _expiresAt
    ) external;

    /**
     * @dev Legacy function to issue a new verifiable credential without category and source
     * @param _vcHash Hash of the credential to issue
     * @param _issuerDID DID of the issuer
     * @param _expiresAt Expiration timestamp (0 for no expiration)
     */
    function issueCredential(
        bytes32 _vcHash,
        string calldata _issuerDID,
        uint256 _expiresAt
    ) external;

    function revokeCredential(bytes32 _vcHash) external; // Requires owner or authorized issuer

    function isCredentialValid(bytes32 _vcHash) external view returns (bool);

    // --- User Registration (Registrar Controlled) ---
    /**
     * @dev Registers a new user. Requires caller to be the owner OR an authorized registrar.
     * Increments totalUsers counter.
     * Reverts if the user already exists or has zero address.
     * Reverts if the referrer address is not address(0) and does not exist.
     * @param _userAddress The address of the user to register.
     * @param _referrerAddress The address of the referrer (or address(0) if none).
     */
    function register(address _userAddress, address _referrerAddress) external;

    /**
     * @dev Registers multiple users in a batch. Requires caller to be the owner OR an authorized registrar.
     * Useful for migrations. Skips users that already exist or have invalid referrers/zero address.
     * Increments totalUsers counter by the number of successfully registered users.
     * @param _usersToRegister An array of User structs to register.
     */
    function batchRegister(User[] calldata _usersToRegister) external;

    // --- View Functions ---

    /**
     * @dev Checks if a user is registered.
     * @param _userAddress Address to check.
     * @return True if the user exists in the `users` mapping.
     */
    function isRegistered(address _userAddress) external view returns (bool);

    // --- Batch Processing Functions ---
    function batchIssueCredentials(
        CredentialData[] calldata _credentials
    ) external;
}
