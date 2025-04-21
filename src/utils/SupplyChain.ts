// supply-chain-management/src/utils/SupplyChain.ts
export const SupplyChain = {
    abi: [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "entity",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "id",
          "type": "string"
        }
      ],
      "name": "CertificationIssued",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "orderId",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "status",
          "type": "string"
        }
      ],
      "name": "DeliveryUpdated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "supplier",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "serialNumber",
          "type": "string"
        }
      ],
      "name": "MaterialAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "orderId",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "manufacturer",
          "type": "address"
        }
      ],
      "name": "OrderPlaced",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "string",
          "name": "orderId",
          "type": "string"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "PaymentMade",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "mro",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "workOrder",
          "type": "string"
        }
      ],
      "name": "ServiceLogged",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_materialType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_serialNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_batchNumber",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_certified",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "_certifiedAuthority",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_pricePerKg",
          "type": "uint256"
        }
      ],
      "name": "addMaterial",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "certifications",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "entity",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "status",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "date",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "deliveries",
      "outputs": [
        {
          "internalType": "string",
          "name": "orderId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "status",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "trackingNumber",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "deliveryDate",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        }
      ],
      "name": "getCertifications",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "entity",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "status",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            }
          ],
          "internalType": "struct SupplyChain.Certification[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_orderId",
          "type": "string"
        }
      ],
      "name": "getDeliveries",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "orderId",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "status",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "trackingNumber",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "deliveryDate",
              "type": "uint256"
            }
          ],
          "internalType": "struct SupplyChain.Delivery",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_supplier",
          "type": "address"
        }
      ],
      "name": "getMaterials",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "materialType",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "serialNumber",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "batchNumber",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "certified",
              "type": "bool"
            },
            {
              "internalType": "string",
              "name": "certifiedAuthority",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "pricePerKg",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "supplier",
              "type": "address"
            }
          ],
          "internalType": "struct SupplyChain.Material[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_manufacturer",
          "type": "address"
        }
      ],
      "name": "getOrders",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "id",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "materialName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "quantity",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "manufacturer",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "deliveryAddress",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "paid",
              "type": "bool"
            }
          ],
          "internalType": "struct SupplyChain.Order[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_mro",
          "type": "address"
        }
      ],
      "name": "getServices",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "aircraft",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "serviceType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "workOrder",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "details",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "mro",
              "type": "address"
            }
          ],
          "internalType": "struct SupplyChain.Service[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTransactions",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "orderId",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "from",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "internalType": "struct SupplyChain.Transaction[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_entity",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "_status",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "_date",
          "type": "uint256"
        }
      ],
      "name": "issueCertification",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_aircraft",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_serviceType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_workOrder",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_details",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_date",
          "type": "uint256"
        }
      ],
      "name": "logService",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_orderId",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        }
      ],
      "name": "makePayment",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "materials",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "materialType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "serialNumber",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "batchNumber",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "certified",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "certifiedAuthority",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "pricePerKg",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "supplier",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "orders",
      "outputs": [
        {
          "internalType": "string",
          "name": "id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "materialName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "quantity",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "manufacturer",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "deliveryAddress",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "paid",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_materialName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_quantity",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_deliveryAddress",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_supplier",
          "type": "address"
        }
      ],
      "name": "placeOrder",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "services",
      "outputs": [
        {
          "internalType": "string",
          "name": "aircraft",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "serviceType",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "workOrder",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "details",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "date",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "mro",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "string",
          "name": "orderId",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_orderId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_status",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_trackingNumber",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_deliveryDate",
          "type": "uint256"
        }
      ],
      "name": "updateDelivery",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  };