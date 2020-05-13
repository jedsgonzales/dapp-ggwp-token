pragma solidity ^0.5.0;

contract GgwpToken {
    //ERC-20 Token Standard: function name() public view returns (string)
    string  public name = "GGWP Token";

    //ERC-20 Token Standard: function symbol() public view returns (string)
    string  public symbol = "GGWP";

    //ERC-20 Token Standard: function decimals() public view returns (uint8)
    uint8   public decimals = 8;
    
    uint256 public totalGGWP;

    address private admin;

    event Transfer(
        address indexed _ggFrom,
        address indexed _ggTo,
        uint256 _value
    );

    event Approval(
        address indexed _ggGranter,
        address indexed _ggBenefactor,
        uint256 _value
    );

    //ERC-20 Token Standard: function balanceOf(address _owner) public view returns (uint256 balance)
    mapping(address => uint256) public balanceOf;

    //ERC-20 Token Standard: function allowance(address _owner, address _spender) public view returns (uint256 remaining)
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initialSupply) public {
        admin = msg.sender;

        balanceOf[admin] = _initialSupply;
        totalGGWP = _initialSupply;
    }

    //ERC-20 Token Standard: function totalSupply() public view returns (uint256)
    function totalSupply() public view returns (uint256) {
        return totalGGWP;
    }

    //ERC-20 Token Standard: function transfer(address _to, uint256 _value) public returns (bool success)
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    //ERC-20 Token Standard: function approve(address _spender, uint256 _value) public returns (bool success)
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    //ERC-20 Token Standard: function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }

    //custom implementation
    function grant(uint256 _value) public returns (bool success) {
        require(balanceOf[admin] >= _value);

        balanceOf[admin] -= _value;
        balanceOf[msg.sender] += _value;

        emit Transfer(admin, msg.sender, _value);

        return true;
    }
}