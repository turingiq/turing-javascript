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


	async autocrop(image_url){
		var end_point = this.base_uri+'/autocrop';
		var data = {"url":image_url};
		var headers = this.headers;
		return new Promise(function(resolve, reject) {
	    request.post({
				url: end_point,
        headers: headers,
        form: data
			}, function(err, resp, body) {
	      if (err) {
	        reject(err);
	      } else {
	        resolve(JSON.parse(body));
	      }
	    })
  	})
}


	async search(image_url,filters,crop_box){
		if(!filters)
			filters={}
		if(!crop_box)
			crop_box=[]

		var path;
		if(this.mode == 'live')
			path = '/similar/search';
		else
			path = '/demo-similar/search';

		var end_point = this.base_uri+path;
		var data = {"url":image_url};
		var crop = null;
		if(crop_box){
			crop = crop_box.join();
			data['crop']=crop
		}
		if('filter1' in filters){
			var filter1 = filters['filter1'];
			data['filter1']=filter1
		}
		if('filter2' in filters){
			var filter2 = filters['filter2'];
			data['filter2']=filter2
		}
		if('filter3' in filters){
			var filter3 = filters['filter3'];
			data['filter3']=filter3
		}

		var headers = this.headers
		return new Promise(function(resolve, reject) {
	    request.post({
				url: end_point,
        headers: headers,
        form: data
			}, function(err, resp, body) {
				if (err) {
					reject(err);
	      } else {
					resolve(JSON.parse(body));
	      }
	    })
  	})
	}


	async recommendation(id,filters){
		if(!filters)
			filters={}
		var path;
		if(this.mode == 'live')
			path = '/similar/'+id;
		else
			path = '/demo-similar/'+id;

		var end_point = this.base_uri+path;
		var params = {}
		var headers = this.headers;

		if('filter1' in filters){
			var filter1 = filters['filter1'];
			params['filter1']=filter1
		}
		if('filter2' in filters){
			var filter2 = filters['filter2'];
			params['filter2']=filter2
		}
		if('filter3' in filters){
			var filter3 = filters['filter3'];
			params['filter3']=filter3
		}

		return new Promise(function(resolve, reject) {
	    request.get({
				url: end_point,
        headers: headers,
        params: params
			}, function(err, resp, body) {
				if (err) {
					reject(err);
	      } else {
					resolve(JSON.parse(body));
	      }
	    })
  	})
	}

	async insert(id,image_url,filters,metadata){
		if(!filters)
			filters={}
		if(!metadata)
			metadata={}
		var path;
		if(this.mode == 'live')
			path = '/similar/create';
		else
			path = '/demo-similar/create';

		var end_point = this.base_uri+path;
		var data = {id:id,url:image_url}
		var headers = this.headers;

		if('filter1' in filters){
			var filter1 = filters['filter1'];
			data['filter1']=filter1
		}
		if('filter2' in filters){
			var filter2 = filters['filter2'];
			data['filter2']=filter2
		}
		if('filter3' in filters){
			var filter3 = filters['filter3'];
			data['filter3']=filter3
		}

		Object.keys(metadata).forEach(function(key) {
    		data[key] = metadata[key];
		});

		return new Promise(function(resolve, reject) {
	    request.post({
				url: end_point,
        headers: headers,
        form: data
			}, function(err, resp, body) {
				if (err) {
					reject(err);
	      } else {
					resolve(JSON.parse(body));
	      }
	    })
  	})
	}

	async update(id,image_url=null,filters,metadata){
		return await this.insert(id,image_url,filters,metadata)
	}


	delete(id){
		var path;
		if(this.mode == 'live')
			path = '/similar/'+id;
		else
			path = '/demo-similar/'+id;
		var end_point = this.base_uri+path;
		var headers = this.headers

		return new Promise(function(resolve, reject) {
	    request.delete({
				url: end_point,
        headers: headers
			}, function(err, resp, body) {
				if (err) {
					reject(err);
	      } else {
					resolve(JSON.parse(body));
	      }
	    })
  	})
	}

};

module.exports = VisualAPI;
