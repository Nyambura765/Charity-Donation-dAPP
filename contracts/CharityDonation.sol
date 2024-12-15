// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CampaignDonation {

    address public contractOwner;  

    struct Campaign {
        uint id;
        address creator;
        string title;
        string description;
        uint targetAmount;
        uint totalDonated;
        bool active;
        string[] updates;
    }

    struct Donation {
        address donor;
        uint amount;
        uint timestamp;
    }

    struct Transaction {
        uint amount;
        address payable recipient;
        bool executed;
        uint approvals;
    }

    // Storage
    Campaign[] public campaigns;
    mapping(uint => Donation[]) public donations;
    mapping(address => bool) public admins;
    mapping(address => bool) public signers;
    mapping(uint => mapping(address => bool)) public approvedSignatures;

    uint public requiredSignatures;
    mapping(uint => Transaction) public transactions;
    uint public transactionCount;

    // Events
    event CampaignCreated(uint id, address creator, string title, uint targetAmount);
    event CampaignStatusUpdated(uint id, bool active);
    event CampaignUpdated(uint id, string updateMessage);
    event DonationReceived(uint campaignId, address donor, uint amount);
    event TransactionCreated(uint txId, address recipient, uint amount);
    event TransactionApproved(uint txId, address signer);
    event TransactionExecuted(uint txId, address recipient, uint amount);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Not an admin");
        _;
    }

    modifier onlySigner() {
        require(signers[msg.sender], "Not a signer");
        _;
    }

    modifier validCampaign(uint _id) {
        require(_id < campaigns.length, "Campaign does not exist");
        _;
    }

    constructor(address[] memory _admins, address[] memory _signers, uint _requiredSignatures) {
        require(_requiredSignatures > 0, "Signatures required must be greater than 0");
        require(_signers.length >= _requiredSignatures, "Not enough signers");

        for (uint i = 0; i < _admins.length; i++) {
            admins[_admins[i]] = true;
        }

        for (uint i = 0; i < _signers.length; i++) {
            signers[_signers[i]] = true;
        }

        contractOwner = msg.sender;
        requiredSignatures = _requiredSignatures;
    }

    // Create a new campaign
    function createCampaign(string memory _title, string memory _description, uint _targetAmount) external onlyAdmin {
        require(_targetAmount > 0, "Target amount must be greater than zero");

        Campaign memory newCampaign = Campaign({
            id: campaigns.length,  
            creator: msg.sender,
            title: _title,
            description: _description,
            targetAmount: _targetAmount,
            totalDonated: 0,
            active: true,
            updates: new string[](0)
        });

        campaigns.push(newCampaign);
        emit CampaignCreated(campaigns.length - 1, msg.sender, _title, _targetAmount);  
    }

    // Update the status of a campaign (active/inactive)
    function updateCampaignStatus(uint _id, bool _active) external validCampaign(_id) onlyAdmin {
        Campaign storage campaign = campaigns[_id];
        require(campaign.active != _active, "Campaign is already in this state");

        campaign.active = _active;
        emit CampaignStatusUpdated(_id, _active);
    }

    // Add an update to a campaign
    function addCampaignUpdate(uint _id, string memory _updateMessage) external validCampaign(_id) onlyAdmin {
        Campaign storage campaign = campaigns[_id];
        require(campaign.active, "Cannot update an inactive campaign");

        campaign.updates.push(_updateMessage);
        emit CampaignUpdated(_id, _updateMessage);
    }

    // Donate to a campaign
    function donateToCampaign(uint _id) external payable validCampaign(_id) {
        require(msg.value > 0, "Donation amount must be greater than zero");

        Campaign storage campaign = campaigns[_id];
        require(campaign.active, "Cannot donate to an inactive campaign");

        campaign.totalDonated += msg.value;
        donations[_id].push(Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp
        }));

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    // Withdraw funds with multisignature approval
    function withdrawFunds(uint _campaignId, uint _amount, address payable _recipient) external onlySigner validCampaign(_campaignId) {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.totalDonated >= _amount, "Insufficient funds");

        transactionCount++;
        transactions[transactionCount] = Transaction({
            amount: _amount,
            recipient: _recipient,
            executed: false,
            approvals: 0
        });

        emit TransactionCreated(transactionCount, _recipient, _amount);
    }

    // Approve a withdrawal transaction
    function approveTransaction(uint _txId) external onlySigner {
        Transaction storage transaction = transactions[_txId];
        require(!transaction.executed, "Transaction already executed");
        require(!approvedSignatures[_txId][msg.sender], "Transaction already approved by this signer");

        approvedSignatures[_txId][msg.sender] = true;
        transaction.approvals++;

        emit TransactionApproved(_txId, msg.sender);

        if (transaction.approvals >= requiredSignatures) {
            transaction.executed = true;
            transaction.recipient.transfer(transaction.amount);
            emit TransactionExecuted(_txId, transaction.recipient, transaction.amount);
        }
    }

    // Get campaign updates
    function getCampaignUpdates(uint _id) external view validCampaign(_id) returns (string[] memory) {
        return campaigns[_id].updates;
    }

    // Get donation history for a campaign
    function getDonationHistory(uint _id) external view validCampaign(_id) returns (Donation[] memory) {
        return donations[_id];
    }
}
