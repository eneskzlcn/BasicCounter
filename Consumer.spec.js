import path from "path";
import {Pact} from "@pact-foundation/pact";
import { Matchers ,Publisher} from '@pact-foundation/pact'
const { eachLike, like } = Matchers 
import CounterClient from "./src/CounterClient.js";

const provider = new Pact({
    consumer: 'CounterClient',
    provider: 'CounterApi',
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    logLevel: "warn",
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2
});

describe('Counter Api Consumer Test', () => {
    
    before(() => provider.setup());
    afterEach(() => provider.verify());
    after(() => provider.finalize());

    describe("getting counter", () => {
        it("counter exists", async () => {

            // set up Pact interactions
            await provider.addInteraction({
                state: 'counter exist',
                uponReceiving: 'get counter',
                withRequest: {
                    method: 'GET',
                    path: '/counter'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like({
                        value:0
                    }),
                },
            });

            const counterClient = new CounterClient(provider.mockService.baseUrl);
        
            await counterClient.getCounter();
        });
    });
    
    describe("increase counter", () => {
        it("is increases successfully", async () => {

            // set up Pact interactions
            await provider.addInteraction({
                state: 'counter increases',
                uponReceiving: 'get increased counter',
                withRequest: {
                    method: 'GET',
                    path: '/increase'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like({
                        value:1
                    }),
                },
            });

            const counterClient = new CounterClient(provider.mockService.baseUrl);
        
            await counterClient.increaseCounter();

        });
    });

    describe("decreases counter", () => {
        it("is decreases successfully", async () => {

            // set up Pact interactions
            await provider.addInteraction({
                state: 'counter decreases',
                uponReceiving: 'get decreased counter',
                withRequest: {
                    method: 'GET',
                    path: '/decrease'
                },
                willRespondWith: {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: like({
                        value:-1
                    }),
                },
            });

            const counterClient = new CounterClient(provider.mockService.baseUrl);
        
            await counterClient.decreaseCounter();

        });
    });

})
