import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import {testpoi, testuser, testPOIs, testuserCredentials} from "../fixtures.js";

suite("POI API tests", () => {

    setup(async () => {
        await placemarkService.clearAuth();
        await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testuserCredentials);
        await placemarkService.deleteAllUsers();
        const user = await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testuserCredentials);

        await placemarkService.deleteAllPOIs();
        for (let i = 0; i < testPOIs.length; i += 1) {
            testPOIs[0] = await placemarkService.createPOI(user._id,testPOIs[i]);
        }
    });
    teardown(async () => {});

    test("create a poi", async () => {
        const user = await placemarkService.createUser(testuser)
        await placemarkService.authenticate(testuserCredentials);
        const newPOI = await placemarkService.createPOI(user._id, testpoi);
        assertSubset(testpoi, newPOI);
        assert.isDefined(newPOI._id);

    });

    test("delete all poi", async () => {
        let returnedPOIs = await placemarkService.getAllPOIs();
        assert.equal(returnedPOIs.length, 3);
        await placemarkService.deleteAllPOIs();
        returnedPOIs = await placemarkService.getAllPOIs();
        assert.equal(returnedPOIs.length, 0);
    });

    test("get a poi", async () => {
        const returnedPOI = await placemarkService.getPOI(testPOIs[0]._id);
        assert.deepEqual(testPOIs[0], returnedPOI);
    });
    test("get a poi - bad id", async () => {
        try {
            const badPOI = await placemarkService.getPOI("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No poi with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a poi - deleted poi", async () => {
        await placemarkService.deleteAllPOIs();
        try {
            const badPOI2 = await placemarkService.getPOI(testPOIs[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No poi with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});