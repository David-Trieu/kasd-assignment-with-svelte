import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import {testuser, testuserCredentials, testUsers} from "../fixtures.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
    setup(async () => {
        await placemarkService.clearAuth();
        await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testuserCredentials);
        await placemarkService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
            users[0] = await placemarkService.createUser(testUsers[i]);
        }
        await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testuserCredentials);
    });
    teardown(async () => {});

    test("create a user", async () => {
        const newUser = await placemarkService.createUser(testuser);
        assertSubset(testuser, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all user", async () => {
        let returnedUsers = await placemarkService.getAllUsers();
        assert.equal(returnedUsers.length, 4);
        await placemarkService.deleteAllUsers();
        await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testuserCredentials);
        returnedUsers = await placemarkService.getAllUsers();
        assert.equal(returnedUsers.length, 1);
    });

    test("get a user", async () => {
        const returnedUser = await placemarkService.getUser(users[0]._id);
        assert.deepEqual(users[0], returnedUser);
    });
    test("get a user - bad id", async () => {
        try {
            const returnedUser = await placemarkService.getUser("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });

    test("get a user - deleted user", async () => {
        await placemarkService.deleteAllUsers();
        await placemarkService.createUser(testuser);
        await placemarkService.authenticate(testuserCredentials);
        try {
            const returnedUser = await placemarkService.getUser(users[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});