/*! dumed - v0.1.0 - 2019-01-27 */(function() {
    var app = angular.module('dumed', [
        'ui.router',
        'ngMaterial', 
        'ngMessages',
        'dumed.mainController'
    ]);
    
})();

(function () {
    var app = angular.module('dumed.mainController', []);
    app.controller('mainController', ['$scope', '$mdToast', '$mdSidenav', function ($scope, $mdToast, $mdSidenav) {
        console.log('controller loaded')
        $scope.balanceInEther = 0;
        $scope.totalAllowed = 2;
        $scope.isRolling = false;
        $scope.networkAddress = "http://localhost:7545"

        $scope.boardNumebrs = [1,2,3,4,5,6,7,8,9]
        $scope.player1DiceNumber = 0
        $scope.player2DiceNumber = 0
        $scope.players =[]

        var contractAbi = [
            {
                "constant": false,
                "inputs": [],
                "name": "addPlayer",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "resetBoard",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "rollDice",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "payable": true,
                "stateMutability": "payable",
                "type": "fallback"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    }
                ],
                "name": "Added",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    }
                ],
                "name": "Won",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    }
                ],
                "name": "Lost",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    }
                ],
                "name": "Rolling",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    }
                ],
                "name": "Done",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "money",
                        "type": "uint256"
                    }
                ],
                "name": "NotSufficientBalance",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    }
                ],
                "name": "OwnerNotAllowed",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "totalPlayers",
                        "type": "uint256"
                    }
                ],
                "name": "RoomIsFull",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "money",
                        "type": "uint256"
                    }
                ],
                "name": "NoRollingAllowed",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "boardstatus",
                        "type": "uint8"
                    },
                    {
                        "indexed": false,
                        "name": "player",
                        "type": "address"
                    }
                ],
                "name": "BoardStatusEvent",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "diceNumber",
                        "type": "uint8"
                    }
                ],
                "name": "DiceRolled",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [],
                "name": "PlayerExists",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [],
                "name": "WaitForPlayers",
                "type": "event"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "add",
                        "type": "address"
                    }
                ],
                "name": "getPlayerBetAmount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "add",
                        "type": "address"
                    }
                ],
                "name": "getPlayerInfo",
                "outputs": [
                    {
                        "name": "inBoardOrder",
                        "type": "uint256"
                    },
                    {
                        "name": "betAmount",
                        "type": "uint256"
                    },
                    {
                        "name": "currentPosition",
                        "type": "uint256"
                    },
                    {
                        "name": "count",
                        "type": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "isGameStart",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "isOwnerFunc",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "isRoomFull",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "playerCount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "addr",
                        "type": "address"
                    }
                ],
                "name": "playerExists",
                "outputs": [
                    {
                        "name": "",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "players",
                "outputs": [
                    {
                        "name": "betAmount",
                        "type": "uint256"
                    },
                    {
                        "name": "inBoardOrder",
                        "type": "uint256"
                    },
                    {
                        "name": "currentPosition",
                        "type": "uint256"
                    },
                    {
                        "name": "count",
                        "type": "uint256"
                    },
                    {
                        "name": "status",
                        "type": "uint8"
                    },
                    {
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "name": "isPresent",
                        "type": "bool"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "playersArray",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "targetPosition",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint32"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalBetAmount",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            }
        ]

        var last = {
            bottom: true,
            top: false,
            left: false,
            right: true
        };

        var toastPosition = angular.extend({}, last);

        var getToastPosition = function () {
            sanitizePosition();

            return Object.keys(toastPosition)
                .filter(function (pos) {
                    return toastPosition[pos];
                }).join(' ');
        };

        function sanitizePosition() {
            var current = toastPosition;

            if (current.bottom && last.top) {
                current.top = false;
            }
            if (current.top && last.bottom) {
                current.bottom = false;
            }
            if (current.right && last.left) {
                current.left = false;
            }
            if (current.left && last.right) {
                current.right = false;
            }

            last = angular.extend({}, current);
        }

        function showToast(msg) {
            var pinTo = getToastPosition();

            $mdToast.show(
                    $mdToast.simple()
                    .textContent(msg)
                    .position(pinTo)
                    .hideDelay(1000))
                .then(function () {
                    //   $log.log('Toast dismissed.');
                }).catch(function () {
                    //   $log.log('Toast failed or was forced to close early by another toast.');
                });
        };

        //hack to promisify all the web3 functions which are callback

        const promisify = (inner) =>
            new Promise((resolve, reject) =>
                inner((err, res) => {
                    if (err) {
                        reject(err)
                    }

                    resolve(res);
                })
            );



        //########## HACK END #########

        // var web3 = null;
        $scope.selectNetwork = async function (networkType) {
            console.log('select network called')
            if (networkType === 'rinkbey') {
                web3 = new Web3(web3.currentProvider);
            } else if (networkType === 'localhost') {
                web3 = new Web3(new Web3.providers.HttpProvider($scope.networkAddress));
            }
            var isConnected = web3.isConnected();
            if (isConnected) {
                // console.log(web3.version,'---version of web3') //to check the version of the web3
                showToast("Connected to the network")
                $scope.isConnected = true;
                $mdSidenav('left').open();
                await initContract()
            } else {
                showToast("First connect to the correct network")
                $mdSidenav('left').close();
                $scope.isConnected = false;
            }
        }

        //comment it out afet final coding
        setTimeout( function(){
            $scope.selectNetwork('localhost')
        })

        // var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        // console.log(web3.isConnected(),'--- check if connected')  
        // to check the connection, for false give user a popup to first connect to network
        // for true, proceed to nest step


        async function initContract() {
            

            var Roll2WinContract = web3.eth.contract(contractAbi);

            //registering the contract deployed address
            $scope.Roll2Win = Roll2WinContract.at('0xdef2eb68aadb7354d777c9cbe060c6f46f735ee2')

            console.log($scope.Roll2Win,'---roll2win')

            $scope.Roll2Win.playerCount(function (err, result) {
                $scope.totalJoined = result.toNumber();
            })

            // var contractBalance = Roll2Win.getBalance();

            //get all the accounts

            // var coinbase = web3.eth.coinbase; //it gives you the first address in the network

            web3.eth.getAccounts(function(err, accounts){
                console.log(accounts,'---- accounts')
                $scope.accounts = accounts;
                $scope.account = $scope.accounts[0]
                web3.eth.defaultAccount = web3.eth.accounts[0]
                getAccountBalance();
            })

            // initEvents()
        }

        //set the contract ABI
        // console.log(contractBalance.toNumber(),'--- contract balance ---')



        // var code = web3.eth.getCode("0xefc6d3ff3a61b564adfb055cc20be8eb626feec4");
        // console.log(code,'code');

        // var transaction = web3.eth.getTransaction('0x82894a92427cb3df09fe0ea92dc4f121275cf1cf81b4eeaa51e112ed385a25e7');


        $scope.changeLocalAccount = function (account) {
            $scope.account = account;
            getAccountBalance();
        }



        $scope.addMe = async function () {
            var isFull = await checkRoomisFull()
            console.log($scope.account, isFull)
            if (!isFull) {
                $scope.Roll2Win.addPlayer({
                    from: $scope.account,
                    gas: 3000000,
                    value: $scope.betAmount
                }, function (err, res) {
                    console.log(err,'--adding the player')
                    // $scope.totalJoined = $scope.Roll2Win.playerCount().toNumber();
                    $scope.Roll2Win.playerCount(function (err, result) {
                        // console.log(result.toNumber(),'---- result')
                        $scope.totalJoined = result.toNumber();
                        getPlayerInfo()
                        // $scope.$apply();
                    })
                });
            } else {
                showToast("Battle room is already full")
            }
        }

        $scope.resetStateBoard = async function(){
            $scope.Roll2Win.resetBoard();
            await initContract()
        }

        function getPlayerInfo() {
            console.log('--dice roll called it--',$scope.account)
            $scope.Roll2Win.getPlayerInfo($scope.account, function (err, result) {
                if (err)
                    return
                console.log(result)
                result.forEach((i, index) => {
                    // console.log(index,'--index')
                    if (index == 0)
                        $scope.inBoardOrder = i.toNumber();
                    if (index == 1)
                        $scope.betAmount = web3.fromWei(i.toNumber(), 'wei');
                    if (index == 2)
                        $scope.currentPosition = i.toNumber();
                    if (index == 3)
                        $scope.count = i.toNumber();
                    if (index == 4)
                        $scope.status = i.toNumber();
                    // console.log(i.toNumber())
                })
            });

            // console.log(info,'---info')
        }


        function getAccountBalance() {
            var account = $scope.account;
            web3.eth.defaultaccount = $scope.account;
            web3.eth.getBalance(account, function (error, balance) {
                balance = web3.toDecimal(balance)

                $scope.balanceInEther = web3.fromWei(balance, 'ether');
                getPlayerInfo();
            })
            // console.log($scope.account,'---acount balance---',$scope.balanceInEther)
        }

        $scope.rollDice = function () {
            $scope.diceRolling = true;
            console.log($scope.account,web3.eth.defaultaccount)
            try{

                $scope.Roll2Win.rollDice();
            }catch(err){
                console.log(err)
            }
            var DiceRolled = $scope.Roll2Win.DiceRolled();
            DiceRolled.watch(function (error, result) {
                if (!error) {

                    console.log(result,'--result');
                    $scope.diceNumber = result.args.diceNumber.toNumber();
                    var index = $scope.players.indexOf($scope.account)
                    if(index == 0){
                        $scope.player1DiceNumber = $scope.player1DiceNumber + $scope.diceNumber
                    }else if(index == 1){
                        $scope.player2DiceNumber = $scope.player2DiceNumber + $scope.diceNumber
                    }
                    $scope.boardNumebrs = [1,2,3,4,5,6,7,8,9]
                    console.log($scope.player1DiceNumber,'--player1')
                    console.log($scope.player2DiceNumber,'--player2')
                    console.log($scope.boardNumebrs,'--boardNumbers')
                    // getPlayerInfo();
                    $scope.diceRolling = false;
                    $scope.$apply();
                } else {
                    console.log(error, 'error');
                }
            });
            // getPlayerInfo();
        }

        function initEvents() {
            var OwnerNotAllowed = $scope.Roll2Win.OwnerNotAllowed();
            OwnerNotAllowed.watch(function (error, result) {
                if (!error) {
                    // console.log(result);
                    showToast("Owner not allowed to play")
                    $scope.diceRolling = false;
                    // $("#instructor").html(result.args.name + ' (' + result.args.age + ' years old)');
                    // $("#loader").hide();
                } else {
                    // $("#loader").hide();
                    console.log(error);
                    $scope.diceRolling = false;
                }
            });

            var RoomIsFull = $scope.Roll2Win.RoomIsFull();
            RoomIsFull.watch(function(error, result){
                if (!error)
                    {
                        console.log(result);
                        showToast("Room is full, No more player can be added.")
                    } else {
                        console.log(error);
                    }
            });

            var PlayerAdded = $scope.Roll2Win.Added();
            PlayerAdded.watch(function (error, result) {
                if (!error) {
                    $scope.players.push($scope.account)
                    showToast("Congratulations, you are added as a player");
                } else {
                    console.log(error, 'error');
                }
            });

            //dice number after rolling

            

            var PlayerExists = $scope.Roll2Win.PlayerExists();
            PlayerExists.watch(function (error, result) {
                if (!error) {
                    showToast("You have already joined the game");
                } else {
                    console.log(error, 'error');
                }
            });

            var WaitForPlayers = $scope.Roll2Win.WaitForPlayers();
            WaitForPlayers.watch(function (error, result) {
                if (!error) {
                    showToast("Please wait for other players to join");
                } else {
                    console.log(error, 'error');
                }
            });

            var wonEvent = $scope.Roll2Win.Won();
            wonEvent.watch(function (error, result) {
                if (!error) {
                    showToast("Congratulations !!! Plyaer "+ $scope.account+" has won.");
                } else {
                    console.log(error, 'error');
                }
            });


        }

        async function checkRoomisFull() {
            var result = await promisify(cb => $scope.Roll2Win.isRoomFull(cb));
            return result
        }


    }])
})();
//# sourceMappingURL=fg-0.1.0.js.map