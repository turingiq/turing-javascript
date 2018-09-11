var VisualAPI = require('./../lib/VisualAPI');

test('autocrop() function test', async () => {
    let visual;
    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
    var resp = await visual.autocrop("https://storage.googleapis.com/turingiq/unit_test_images/backpack-1.jpg");
    expect(resp["boxes"][0].join()).toBe([179,163,599,1026].join());
    expect(resp["boxes"][1].join()).toBe([329,270,683,849].join());
    expect(resp["boxes"][2].join()).toBe([1,374,160,601].join());

});

test('insert() function test', async () => {

    let visual;
    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
  	var resp = await visual.insert('test-001', "https://images-na.ssl-images-amazon.com/images/I/71AfbkjR6AL._SX522_.jpg")
    expect(resp['success']).toBe(true);

});

test('search() function test', async () => {

    let visual;
    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
    var resp = await visual.search("https://storage.googleapis.com/turingiq/unit_test_images/backpack-1.jpg")
    expect(resp["similar"][0]["similarity"]).toBeGreaterThanOrEqual(0.90);

});

test('recommendation() function test', async () => {

    let visual;
    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
    var resp = await visual.recommendation('test-001')
    expect(resp['similar'].length).toBeGreaterThanOrEqual(1);

});

test('delete() function test', async () => {

    let visual;
    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
    var resp = await visual.delete('test-001')
    expect(resp['success']).toBe(true);

});
