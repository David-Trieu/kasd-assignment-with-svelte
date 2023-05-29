import { assert } from "chai";
import { db } from "../../src/model/db.js";
import {testpoi, testPOIs, testuser} from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("poi Model tests", () => {

    setup(async () => {
        db.init();
        const user = await db.userStore.addNewUser(testuser);
        await db.poiStore.deleteAllPOIs();
        for (let i = 0; i < testPOIs.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPOIs[i] = await db.poiStore.addPOI(user._id, testPOIs[i]);
        }
    });

    test("create a poi", async () => {
        const user = await db.userStore.addNewUser(testuser)
        const newPOI = await db.poiStore.addPOI(user._id, testpoi);
        assertSubset(testpoi, newPOI);
    });

    test("delete all poi", async () => {
        let returnedpois = await db.poiStore.getAllPOIs();
        assert.equal(returnedpois.length, 3);
        await db.poiStore.deleteAllPOIs();
        returnedpois = await db.poiStore.getAllPOIs();
        assert.equal(returnedpois.length, 0);
    });

    test("get a poi - success", async () => {
        const user = await db.userStore.addNewUser(testuser)
        const poi = await db.poiStore.addPOI(user._id, testpoi);
        const returnedpoi1 = await db.poiStore.getPOIById(poi._id);
        assert.deepEqual(poi, returnedpoi1);
    });

    test("delete One poi - success", async () => {
        await db.poiStore.deletePOIById(testPOIs[0]._id);
        const returnedpois = await db.poiStore.getAllPOIs();
        assert.equal(returnedpois.length, testPOIs.length - 1);
        const deletedpoi = await db.poiStore.getPOIById(testPOIs[0]._id);
        assert.isNull(deletedpoi);
    });

    test("get a poi - bad params", async () => {
        assert.isNull(await db.poiStore.getPOIById(""));
        assert.isNull(await db.poiStore.getPOIById());
    });

    test("delete One poi - fail", async () => {
        await db.poiStore.deletePOIById("bad-id");
        const allpois = await db.poiStore.getAllPOIs();
        assert.equal(testPOIs.length, allpois.length);
    });
});
