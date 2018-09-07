# TuringAPI

Turing visual search and visually similar recommendations API library for Javascript. The REST API documentation can be found here: [https://api.turingiq.com/doc/](https://api.turingiq.com/doc/)

## Installation

Install Jest using ``yarn`` :

```
yarn add --dev jest
```

Or via ```npm``` :
```
npm install --save-dev jest
```

## Usage

Initialize
--------

```javascript
// You can initialize the `VisualAPI` class with below parameters.

api_key = 'your_api_key' // You can get API key when you login at: https://www.turingiq.com/login
mode = 'live'            // the mode can be either `live` or `sandbox`. Default mode is `live`.
visual = new VisualAPI(api_key, "sandbox");
```

This library uses namespacing. When instantiating the object, you need to either use the fully qualified namespace:

```
visual = new VisualAPI(api_key, "sandbox");
```

Autocrop
--------

Detect objects in image and get bounding boxes around objects detected.

```javascript
// image_url is required field.
image_url = "https://example.com/image_url.jpg"

// now let's call the API.
resp = visual.autocrop(image_url)
```

The bounding boxes returned by this method can be given to visual search to improve visual search quality.


Insert
------

You need to insert images to our index to query on them. The insert function can be written as below.

```javascript
// id is required field.
id = 'image_id'

// image_url is required field.
image_url = "https://example.com/image_url.jpg"

// Filters argument is optional. You can specify upto 3 filters as per example given below.
// Filters can be useful when querying images from our index. You can apply any filter
// as per your requirement.
filters = ["filter1" => "onefilter", "filter2" => "twofilter", "filter3" => "threefilter"]

// Metadata is optional. You can pass additional information about your image which will be
// returned when you query image from our index.
metadata = ["title" => "Image Title"]

// now let's call the API.
resp = visual.insert(id, image_url, filters, metadata)
```

Update
------

If you need to update information to indexed image, you can use update function. If you call update function for id which is not already indexed, it will insert the image to index.

```javascript
// id is required field. Provide id for which you need to update the information.
id = 'image_id'

// image_url is optional field. You can pass `null` if you would like to keep URL unchanged.
image_url = "https://example.com/image_url.jpg"

// Filters argument is optional. You can specify upto 3 filters as per example given below.
// Filters can be useful when querying images from our index. You can apply any filter
// as per your requirement. The filters you provide here will be overwritten.
filters = ["filter1" => "onefilter", "filter2" => "twofilter", "filter3" => "threefilter"]

// Metadata is optional. You can pass additional information about your image which will be
// returned when you query image from our index. Existing metadata values will be overwritten
// based on keys supplied to this array.
metadata = ["title" => "Image Title"]

// now let's call the API.
resp = visual.update(id, image_url, filters, metadata)
```

Delete
------

You can delete image from index with this method.

```javascript
// id is required field.
id = 'image_id'

// now let's call the API.
resp = visual.delete(id)
```

Visual Search
-------------

Visual search can be used to search indexed images based on query image.

```javascript
// image_url is required field. The API will perform visual search on the image and return
image_url = "https://example.com/image_url.jpg"

// crop_box is optional field. You can supply empty array if you don't want to specify crop box.
// The format of crop box is [xmin, ymin, xmax, ymax]
crop_box = [179,163,599,1026]

// Filters argument is optional. You can specify upto 3 filters.
// For example, if you specify filter1 = "nike", it will only return images which are indexed with
// "nike" as filter1.
filters = ["filter1" => "nike"]

// now let's call the API.
resp = visual.search(image_url, crop_box, filters)
```

Visual Recommendations
----------------------

Visual recommendations give visually similar image recommendations which can be used to display recommendation widget on e-commerce sites which greatly improved CTR and conversion rates.

```javascript
// image_url is required field. The API will perform visual search on the image and return
id = "some_product_id"

// Filters argument is optional. You can specify upto 3 filters.
// For example, if you specify filter1 = "nike", it will only return images which are indexed with
// "nike" as filter1.
filters = ["filter1" => "nike"]

// now let's call the API.
resp = visual.recommendation(id, filters)
```

Run Tests
----------------------

```sh
API_KEY='api_key' npm test --runInBand
```