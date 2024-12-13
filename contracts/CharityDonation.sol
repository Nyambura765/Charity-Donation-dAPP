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

    // Array to store all campaigns
    Campaign[] public campaigns;
    // Mapping to store donations by campaign ID
    mapping(uint => Donation[]) public donations;

    // Events
    event CampaignCreated(uint id, address creator, string title, uint targetAmount);
    event CampaignStatusUpdated(uint id, bool active);
    event CampaignUpdated(uint id, string updateMessage);
    event DonationReceived(uint campaignId, address donor, uint amount);

    // Constructor to initialize the contract
    constructor() {
        contractOwner = msg.sender;
    }



    // Create a new campaign
    function createCampaign(string memory _title, string memory _description, uint _targetAmount) external {
        require(_targetAmount > 0, "Target amount must be greater than zero");

        // Create the campaign and push it to the campaigns array
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
    function updateCampaignStatus(uint _id, bool _active) external {
        require(_id < campaigns.length, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        require(campaign.creator == msg.sender, "Only the creator can update the campaign status");
        require(campaign.active != _active, "Campaign is already in this state");

        campaign.active = _active;
        emit CampaignStatusUpdated(_id, _active);
    }

    // Add an update to a campaign
    function addCampaignUpdate(uint _id, string memory _updateMessage) external {
        require(_id < campaigns.length, "Campaign does not exist");
        Campaign storage campaign = campaigns[_id];
        require(campaign.creator == msg.sender, "Only the creator can update the campaign");
        require(campaign.active, "Cannot update an inactive campaign");

        campaign.updates.push(_updateMessage);
        emit CampaignUpdated(_id, _updateMessage);
    }

    // Donate to a campaign
    function donateToCampaign(uint _id) external payable {
        require(_id < campaigns.length, "Campaign does not exist");
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

    // Get campaign updates
    function getCampaignUpdates(uint _id) external view returns (string[] memory) {
        require(_id < campaigns.length, "Campaign does not exist");
        return campaigns[_id].updates;
    }

    // Get donation history for a campaign
    function getDonationHistory(uint _id) external view returns (Donation[] memory) {
        require(_id < campaigns.length, "Campaign does not exist");
        return donations[_id];
    }
}
