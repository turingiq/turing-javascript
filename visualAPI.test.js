var VisualAPI = require('./lib/VisualAPI');

describe('new', () => {
  it('will initialize new visual api instamce with api key and mode', () => {
        var visual = new VisualAPI("api_key", "sandbox");
		  	expect(visual.api_key).toBe("api_key");
		  	expect(visual.mode).toBe('sandbox');
    })

  it('will throw an exception for missing arguments', () => {
  	    expect(()=> {
  	    	new VisualAPI();
  	    }).toThrow(Error, 'API key is not provided.');

  	    expect(()=> {
  	    	new VisualAPI('apikey','');
  	    }).toThrow(Error, 'mode can only be either \'live\' or \'sandbox\'. You provided: \'\'');
		  	
    })
})

describe('other actions', () => {
  
  let visual;

	beforeAll(() => {
    visual = new VisualAPI("api_key", "sandbox");
  })

  it('adds a new image to index', () => {
  	function callback(response){
    var response = visual.insert(1, "https://images-na.ssl-images-amazon.com/images/I/71AfbkjR6AL._SX522_.jpg", ['men','shirt', 'casual-shirts'],'','');
    expect(response).toBeTruthy();
    done();
  }
  

  });

  it('deleted an image from index', () => {
  	function callback(response){
    var response = visual.delete(1, "https://storage.googleapis.com/turingiq/unit_test_images/backpack-1.jpg", ['men','shirt', 'casual-shirts'],'','');
    expect(response).toBeTruthy();
    done();
  }

  });

  it('crops an image automatically', () => {
  	function callback(response){
    var response = visual.autocrop("https://storage.googleapis.com/turingiq/unit_test_images/backpack-1.jpg");
    expect(response).toBeTruthy();
    done(); 
  }

  });

  it('searches images based on given url', () => {
    function callback(response){
    var response = visual.search("https://images-na.ssl-images-amazon.com/images/I/71AfbkjR6AL._SX522_.jpg");
    expect(response).toBeTruthy();
    done(); 
  }

  });

  it('searches images based on given url', () => {
    function callback(response){
    var response = visual.recommendation(400000, ['men']);
    expect(response).toBeTruthy();
    done(); 
  }

  });

});
