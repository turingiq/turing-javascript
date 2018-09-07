var request = require('request');
var TuringAPIException = require('./TuringAPIException');


class VisualAPI{

	constructor(api_key,mode='live',api_version='v1'){
		
		if (!api_key)
			throw new TuringAPIException('API key is not provided.');
		else{
			this.api_key = api_key;
			var authorization = "Bearer "+this.api_key;
			this.headers = {"Authorization":authorization}
		}

		if (mode == 'live' || mode == 'sandbox')
			this.mode = mode;
		else
			throw new TuringAPIException('mode can only be either \'live\' or \'sandbox\'. You provided: '+mode);		

		if (api_version != 'v1')
			throw new TuringAPIException('Currenly only \'v1\' is supported for api_version')
		else
			this.api_version = api_version;

		this.base_uri='https://api.turingiq.com/'+this.api_version;
	}


	autocrop(image_url,callback){
		var end_point = this.base_uri+'/autocrop';
		var data = {"url":image_url};

		request.post({
            url: end_point,
            headers: this.headers,
            form: data
        }, function(error, response, body) {
            if (response.statusCode == 200 || (response.statusCode>400 && response.statusCode<500)) {
            	body = JSON.parse(body);
            }
            callback(body);
        });
	}


	search(image_url,filters={},crop_box=[],callback){
		var path;
		if(this.mode == 'live')
			path = '/similar/search';
		else
			path = '/demo-similar/search';

		var end_point = this.base_uri+path;
		var crop = null;
		if(crop_box)
			crop = crop_box.join();

		var filter1 = '';
		var filter2 = '';
		var filter3 = '';
		if('filter1' in filters)
			filter1 = filters['filter1'];
		if('filter2' in filters)
			filter2 = filters['filter2'];
		if('filter3' in filters)
			filter3 = filters['filter3'];
 		
 		var data = {"url":image_url,
				"crop": crop,
				'filter1': filter1,
				'filter2': filter2,
				'filter3': filter3,
		};

		request.post({
            url: end_point,
            headers: this.headers,
            form: data
        }, function(error, response, body) {
        	if (response.statusCode == 200 || (response.statusCode>400 && response.statusCode<500)) {
                body = JSON.parse(body);
            }
            callback(body);
        });
	}


	recommendation(id,filters={},callback){
		var path;
		if(this.mode == 'live')
			path = '/similar/'+id;
		else
			path = '/demo-similar/'+id;

		var end_point = this.base_uri+path;

		var filter1 = '';
		var filter2 = '';
		var filter3 = '';
		if('filter1' in filters)
			filter1 = filters['filter1'];
		if('filter2' in filters)
			filter2 = filters['filter2'];
		if('filter3' in filters)
			filter3 = filters['filter3'];

		var params = {
			filter1:filter1,
			filter2:filter2,
			filter3:filter3
		}

		request.get({
            url: end_point,
            headers: this.headers,
            params: params
        }, function(error, response, body) {
        	if (response.statusCode == 200 || (response.statusCode>400 && response.statusCode<500)) {
                body = JSON.parse(body);
            }
            callback(body);
        });
	}

	insert(id,image_url,filters={},metadata={},callback){
		console.log('inside insert function')
		var path;
		if(this.mode == 'live')
			path = '/similar/create';
		else
			path = '/demo-similar/create';

		var end_point = this.base_uri+path;
		var filter1 = '';
		var filter2 = '';
		var filter3 = '';
		if('filter1' in filters)
			filter1 = filters['filter1'];
		if('filter2' in filters)
			filter2 = filters['filter2'];
		if('filter3' in filters)
			filter3 = filters['filter3'];

		var data = {
			id:id,
			url:image_url,
			filter1:filter1,
			filter2:filter2,
			filter3:filter3
		}
		Object.keys(metadata).forEach(function(key) {
    		data[key] = metadata[key];
		});

		request.post({
            url: end_point,
            headers: this.headers,
            form: data
        }, function(error, response, body) {
        	if (response.statusCode == 200 || (response.statusCode>400 && response.statusCode<500)) {
                body = JSON.parse(body);
            }
            callback(body);
        });
	}

	update(image_url=null,filters={},metadata={},callback){
		callback(this.insert(image_url,filters,metadata));
	}


	delete(id,callback){
		var path;
		if(this.mode == 'live')
			path = '/similar/'+id;
		else
			path = '/demo-similar/'+id;
		var end_point = this.base_uri+path;
		request.delete({
            url: end_point,
            headers: this.headers
        }, function(error, response, body) {
        	 if (response.statusCode == 200 || (response.statusCode>400 && response.statusCode<500)) {
        	 	body = JSON.parse(body);
            }
            callback(body);
        });
	}


};

module.exports = VisualAPI;

