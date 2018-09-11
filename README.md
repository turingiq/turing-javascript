# TuringAPI

Turing visual search and visually similar recommendations API library for Javascript. The REST API documentation can be found here: [https://api.turingiq.com/doc/](https://api.turingiq.com/doc/)

## Installation

```sh
npm install turing-api-client
```

Initialize
--------
add the visualAPI module as bellow.

```javascript
var VisualAPI = require('./../lib/VisualAPI');
```

You can initialize the VisualAPI with below parameters.

```javascript
// You can initialize the `VisualAPI` class with below parameters.

api_key = 'your_api_key' // You can get API key when you login at: https://www.turingiq.com/login
mode = 'live'            // the mode can be either `live` or `sandbox`. Default mode is `live`.
visual = new VisualAPI(api_key, mode);
```

Autocrop
--------

Detect objects in image and get bounding boxes around objects detected. Our function returns promise and can be handled with either "await" or "then".

```javascript
// example using await.
var image_url = "https://example.com/image_url.jpg"
resp = await visual.autocrop(image_url)
```

```javascript
// example using then.
var image_url = "https://example.com/image_url.jpg"
visual.autocrop(image_url)
  .then(resp => {
    //write your code
  })
  .catch(err =>{
    //write your code
  })
```

The bounding boxes returned by this method can be given to visual search to improve visual search quality.

Insert
------

You need to insert images to our index to query on them. The insert function can be written as below.

```javascript
// id is required field.
var id = 'image_id'

// image_url is required field.
var image_url = "https://example.com/image_url.jpg"

// Filters argument is optional. You can specify upto 3 filters as per example given below.
// Filters can be useful when querying images from our index. You can apply any filter
// as per your requirement.
var filters = {"filter1" : "onefilter", "filter2" : "twofilter", "filter3" : "threefilter"}

// Metadata is optional. You can pass additional information about your image which will be
// returned when you query image from our index.
var metadata = {"title" : "Image Title"}

// now let's call the API.
var resp = await visual.insert(id, image_url, filters, metadata)
```

Update
------

If you need to update information to indexed image, you can use update function. If you call update function for id which is not already indexed, it will insert the image to index.

```javascript
// id is required field. Provide id for which you need to update the information.
var id = 'image_id'

// image_url is optional field. You can pass `null` if you would like to keep URL unchanged.
var image_url = "https://example.com/image_url.jpg"

// Filters argument is optional. You can specify upto 3 filters as per example given below.
// Filters can be useful when querying images from our index. You can apply any filter
// as per your requirement. The filters you provide here will be overwritten.
var filters = {"filter1" : "onefilter", "filter2" : "twofilter", "filter3" : "threefilter"}

// Metadata is optional. You can pass additional information about your image which will be
// returned when you query image from our index. Existing metadata values will be overwritten
// based on keys supplied to this array.
var metadata = {"title" : "Image Title"}

// now let's call the API.
var resp = awit visual.update(id, image_url, filters, metadata)
```

Delete
------

You can delete image from index with this method.

```javascript
// id is required field.
var id = 'image_id'

// now let's call the API.
var resp = visual.delete(id)
```

Visual Search
-------------

Visual search can be used to search indexed images based on query image.

```javascript
// image_url is required field. The API will perform visual search on the image and return
var image_url = "https://example.com/image_url.jpg"

// crop_box is optional field. You can supply empty array if you don't want to specify crop box.
// The format of crop box is [xmin, ymin, xmax, ymax]
var crop_box = [179,163,599,1026]

// Filters argument is optional. You can specify upto 3 filters.
// For example, if you specify filter1 = "nike", it will only return images which are indexed with
// "nike" as filter1.
var filters = {"filter1" : "nike"}

// now let's call the API.
var resp = await visual.search(image_url, crop_box, filters)
```

Visual Recommendations
----------------------

Visual recommendations give visually similar image recommendations which can be used to display recommendation widget on e-commerce sites which greatly improved CTR and conversion rates.

```javascript
// image_url is required field. The API will perform visual search on the image and return
var id = "some_product_id"

// Filters argument is optional. You can specify upto 3 filters.
// For example, if you specify filter1 = "nike", it will only return images which are indexed with
// "nike" as filter1.
var filters = {"filter1" : "nike"}

// now let's call the API.
var resp = await visual.recommendation(id, filters)
```

Run Tests
----------------------
To run unit tests install jest framework and run following command.

```sh
npm install --save-dev jest

API_KEY='api_key' npm test --runInBand
```
