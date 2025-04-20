// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Material {
        string name;
        string materialType;
        uint256 quantity;
        string serialNumber;
        string batchNumber;
        bool certified;
        string certifiedAuthority;
        uint256 pricePerKg;
        address supplier;
    }

    struct Order {
        string id;
        string materialName;
        uint256 quantity;
        address manufacturer;
        string deliveryAddress;
        uint256 price;
        bool paid;
    }

    struct Delivery {
        string orderId;
        string status;
        string trackingNumber;
        uint256 deliveryDate;
    }

    struct Transaction {
        string orderId;
        uint256 timestamp;
        address from;
        address to;
        uint256 amount;
    }

    struct Service {
        string aircraft;
        string serviceType;
        string workOrder;
        string details;
        uint256 date;
        address mro;
    }

    struct Certification {
        string id;
        address entity;
        bool status;
        uint256 date;
    }

    mapping(address => Material[]) public materials;
    mapping(address => Order[]) public orders;
    mapping(string => Delivery) public deliveries;
    Transaction[] public transactions;
    mapping(address => Service[]) public services;
    mapping(address => Certification[]) public certifications;

    event MaterialAdded(address indexed supplier, string serialNumber);
    event OrderPlaced(string indexed orderId, address indexed manufacturer);
    event PaymentMade(string indexed orderId, address indexed from, address indexed to, uint256 amount);
    event DeliveryUpdated(string indexed orderId, string status);
    event ServiceLogged(address indexed mro, string workOrder);
    event CertificationIssued(address indexed entity, string id);

    function addMaterial(
        string memory _name,
        string memory _materialType,
        uint256 _quantity,
        string memory _serialNumber,
        string memory _batchNumber,
        bool _certified,
        string memory _certifiedAuthority,
        uint256 _pricePerKg
    ) public {
        materials[msg.sender].push(Material({
            name: _name,
            materialType: _materialType,
            quantity: _quantity,
            serialNumber: _serialNumber,
            batchNumber: _batchNumber,
            certified: _certified,
            certifiedAuthority: _certifiedAuthority,
            pricePerKg: _pricePerKg,
            supplier: msg.sender
        }));
        emit MaterialAdded(msg.sender, _serialNumber);
    }

    function placeOrder(
        string memory _id,
        string memory _materialName,
        uint256 _quantity,
        string memory _deliveryAddress,
        uint256 _price,
        address _supplier
    ) public {
        orders[msg.sender].push(Order({
            id: _id,
            materialName: _materialName,
            quantity: _quantity,
            manufacturer: msg.sender,
            deliveryAddress: _deliveryAddress,
            price: _price,
            paid: false
        }));
        emit OrderPlaced(_id, msg.sender);
    }

    function makePayment(string memory _orderId, address _to) public payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        payable(_to).transfer(msg.value);
        for (uint i = 0; i < orders[msg.sender].length; i++) {
            if (keccak256(abi.encodePacked(orders[msg.sender][i].id)) == keccak256(abi.encodePacked(_orderId))) {
                orders[msg.sender][i].paid = true;
                break;
            }
        }
        transactions.push(Transaction({
            orderId: _orderId,
            timestamp: block.timestamp,
            from: msg.sender,
            to: _to,
            amount: msg.value
        }));
        emit PaymentMade(_orderId, msg.sender, _to, msg.value);
    }

    function updateDelivery(
        string memory _orderId,
        string memory _status,
        string memory _trackingNumber,
        uint256 _deliveryDate
    ) public {
        deliveries[_orderId] = Delivery({
            orderId: _orderId,
            status: _status,
            trackingNumber: _trackingNumber,
            deliveryDate: _deliveryDate
        });
        emit DeliveryUpdated(_orderId, _status);
    }

    function logService(
        string memory _aircraft,
        string memory _serviceType,
        string memory _workOrder,
        string memory _details,
        uint256 _date
    ) public {
        services[msg.sender].push(Service({
            aircraft: _aircraft,
            serviceType: _serviceType,
            workOrder: _workOrder,
            details: _details,
            date: _date,
            mro: msg.sender
        }));
        emit ServiceLogged(msg.sender, _workOrder);
    }

    function issueCertification(
        string memory _id,
        address _entity,
        bool _status,
        uint256 _date
    ) public {
        certifications[_entity].push(Certification({
            id: _id,
            entity: _entity,
            status: _status,
            date: _date
        }));
        emit CertificationIssued(_entity, _id);
    }

    function getMaterials(address _supplier) public view returns (Material[] memory) {
        return materials[_supplier];
    }

    function getOrders(address _manufacturer) public view returns (Order[] memory) {
        return orders[_manufacturer];
    }

    function getDeliveries(string memory _orderId) public view returns (Delivery memory) {
        return deliveries[_orderId];
    }

    function getTransactions() public view returns (Transaction[] memory) {
        return transactions;
    }

    function getServices(address _mro) public view returns (Service[] memory) {
        return services[_mro];
    }

    function getCertifications(address _entity) public view returns (Certification[] memory) {
        return certifications[_entity];
    }
}