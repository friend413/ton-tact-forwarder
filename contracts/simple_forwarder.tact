import "@stdlib/deploy";

message Transfer {
    recipient: Address; // The address to which the funds will be sent
}

contract SimpleForwarder with Deployable {
    
    const MinTonForStorage: Int = ton("0.01"); // Minimum balance for storage rent costs
    deployer: Address;

    init() {
        self.deployer = sender();
    }

    // Accept incoming TON transfers
    receive() {
        dump("Funds received");
    }

    // This will transfer the specified amount to the recipient address
    receive(msg: Transfer) {
        require(context().value > 0, "No funds received"); // Ensure some value was sent
        require(sender() == self.deployer, "Only deployer can initiate transfers"); // Only deployer can trigger

        // Transfer the received amount to the specified recipient
        send(SendParameters{
            to: msg.recipient,
            bounce: true,
            value: context().value, // Transfer the exact amount sent to the contract
            mode: SendRemainingValue + SendIgnoreErrors
        });

        dump("Funds transferred to recipient");
    }
    
    // Function to get the contract balance
    get fun balance(): String {
        return myBalance().toCoinsString();
    }
}
