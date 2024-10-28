import { Address, toNano } from '@ton/core';
import { SimpleForwarder } from '../wrappers/SimpleForwarder';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('SimpleForwarder address'));
    const recipientAddress = Address.parse(args.length > 1 ? args[1] : await ui.input('Recipient address'));


    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const simpleForwarder = provider.open(SimpleForwarder.fromAddress(address))

    await simpleForwarder.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Transfer',
            recipient: recipientAddress,
        }
    );

    ui.clearActionPrompt();
    ui.write('Transfered successfully!');
}
