var VisualAPI = require('./../lib/VisualAPI');

test('autocrop() function test', () => {
  
    let visual;

    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
    visual.autocrop("https://storage.googleapis.com/turingiq/unit_test_images/backpack-1.jpg",function(resp){

    expect(resp["boxes"][0].join()).toBe([179,163,599,1026].join());
    expect(resp["boxes"][1].join()).toBe([329,270,683,849].join());
    expect(resp["boxes"][2].join()).toBe([1,374,160,601].join());
    });
});

test('search() function test', () => {
  
    let visual;

    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
    visual.search("https://storage.googleapis.com/turingiq/unit_test_images/backpack-1.jpg",{},[],function(resp){
    
    // expect(resp["similar"][0]["similarity"]).toBeGreaterThanOrEqual(0.99);
    });
});

test('recommendation() function test', () => {
  
    let visual;

    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
    visual.recommendation('test-001',{},function(resp){
    expect(resp['similar'].length).toBeGreaterThanOrEqual(1);
    });
});


test('insert() function test', () => {
  
    let visual;

    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
  	visual.insert('test-001', "https://images-na.ssl-images-amazon.com/images/I/71AfbkjR6AL._SX522_.jpg",{},{},function(resp){
    expect(resp['success']).toBe(true);
    });
});

test('delete() function test', () => {
  
    let visual;

    var api_key = process.env.api_key;
    visual = new VisualAPI(api_key, "sandbox");
    visual.delete('test-001',function(resp){
    // console.log(resp)
    expect(resp['success']).toBe(true);
    });
});



