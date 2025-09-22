import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Lending {
    IERC20 public collateralToken;
    IERC20 public borrowToken;

    mapping(address => uint256) public collateralBalance;
    mapping(address => uint256) public borrowedBalance;

    uint256 public constant COLLATERAL_RATIO = 50; // 50%

    constructor(address _collateralToken, address _borrowToken) {
        collateralToken = IERC20(_collateralToken);
        borrowToken = IERC20(_borrowToken);
    }

    function depositCollateral(uint256 amount) external {
        require(amount > 0, "Amount must be > 0");
        collateralToken.transferFrom(msg.sender, address(this), amount);
        collateralBalance[msg.sender] += amount;
    }

    function borrow(uint256 amount) external {
        uint256 maxBorrow = (collateralBalance[msg.sender] * COLLATERAL_RATIO) / 100;
        require(borrowedBalance[msg.sender] + amount <= maxBorrow, "Exceeds borrow limit");

        borrowedBalance[msg.sender] += amount;
        require(borrowToken.transfer(msg.sender, amount), "Borrow transfer failed");
    }

    function repay(uint256 amount) external {
        require(borrowedBalance[msg.sender] >= amount, "Repay exceeds borrowed");
        require(borrowToken.transferFrom(msg.sender, address(this), amount), "Repay transfer failed");

        borrowedBalance[msg.sender] -= amount;
    }

    function withdrawCollateral(uint256 amount) external {
        require(borrowedBalance[msg.sender] == 0, "Outstanding debt");
        require(collateralBalance[msg.sender] >= amount, "Not enough collateral");

        collateralBalance[msg.sender] -= amount;
        require(collateralToken.transfer(msg.sender, amount), "Withdraw transfer failed");
    }
}
