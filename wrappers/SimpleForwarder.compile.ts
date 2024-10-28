import { CompilerConfig } from '@ton/blueprint';

export const compile: CompilerConfig = {
    lang: 'tact',
    target: 'contracts/simple_forwarder.tact',
    options: {
        debug: true,
    },
};
