// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Color is ERC721 {
    string[] public colors;
    uint256 public totalSupply = 0;

    mapping(string => bool) public _colorExists;

    constructor() ERC721("Color Picker", "CP") {}

    function mint(string memory _color) public {
        require(!_colorExists[_color]);
        colors.push(_color);
        totalSupply = colors.length;
        _mint(msg.sender, totalSupply);
        _colorExists[_color] = true;
    }
}
