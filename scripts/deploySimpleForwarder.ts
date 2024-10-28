import { toNano } from '@ton/core';
import { SimpleForwarder } from '../wrappers/SimpleForwarder';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const simpleForwarder = provider.open(await SimpleForwarder.fromInit());

    await simpleForwarder.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(simpleForwarder.address);

    console.log('Contract Address:', simpleForwarder.address.toString());
}
