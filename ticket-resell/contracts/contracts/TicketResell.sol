// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketResell is ERC721, Ownable {
    uint256 public ticketId;

    constructor() ERC721("TicketResell", "TIC") {}

    struct TicketsOnSale {
        bool onSale;
        uint256 price;
        address seller;
    }

    mapping(uint256 => TicketsOnSale) public resaleTickets;

    function listTicket(string memory metadataURI, uint256 price) public {
        require(price > 0, "TicketResell: price must be greater than 0");

        ticketId++;
        uint256 tokenId = ticketId;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);

        resaleTickets[tokenId] = TicketsOnSale({
            onSale: true,
            price: price,
            seller: msg.sender
        });
    }

    function buyTicket(uint256 tokenId) public payable {
        TicketOnSale storage ticket = resaleTickets[tokenId];

        require(ticket.onSale, "TicketResell: ticket is not on sale");
        require(msg.value == ticket.price, "TicketResell: incorrect price");

        address seller = ticket.seller;

        _transfer(seller, msg.sender, tokenId);
        payable(seller).transfer(msg.value);

        resaleTickets[tokenId].onSale = false;
    }

    function isListed(uint256 tokenId) public view returns (bool) {
        return resaleTickets[tokenId].onSale;
    }

    function getPrice(uint256 tokenId) public view returns (uint256) {
        return resaleTickets[tokenId].price;
    }
}