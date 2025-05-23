# open_api_definition

OpenApiDefinition - JavaScript client for open_api_definition
No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: v0
- Package version: v0
- Generator version: 7.12.0
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install open_api_definition --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your open_api_definition from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var OpenApiDefinition = require('open_api_definition');

var defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
var bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

var api = new OpenApiDefinition.DefaultApi()
var penaltyId = "penaltyId_example"; // {String} 
var status = "status_example"; // {String} 
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.changeStatus(penaltyId, status, callback);

```

## Documentation for API Endpoints

All URIs are relative to *http://localhost:8085*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*OpenApiDefinition.DefaultApi* | [**changeStatus**](docs/DefaultApi.md#changeStatus) | **PATCH** /api/v1/penalties/{penaltyId} | Изменение статуса штрафа
*OpenApiDefinition.DefaultApi* | [**createPenalty**](docs/DefaultApi.md#createPenalty) | **POST** /api/v1/penalties | Создание штрафа
*OpenApiDefinition.DefaultApi* | [**deletePenalty**](docs/DefaultApi.md#deletePenalty) | **DELETE** /api/v1/penalties/{penaltyId} | Удаление штрафа
*OpenApiDefinition.DefaultApi* | [**getApartmentPenalties**](docs/DefaultApi.md#getApartmentPenalties) | **GET** /api/v1/penalties/{apartmentId} | Получение штрафов по квартире


## Documentation for Models

 - [OpenApiDefinition.CreatePenaltyRequest](docs/CreatePenaltyRequest.md)
 - [OpenApiDefinition.PenaltyDto](docs/PenaltyDto.md)
 - [OpenApiDefinition.PenaltyResponse](docs/PenaltyResponse.md)
 - [OpenApiDefinition.Response](docs/Response.md)
 - [OpenApiDefinition.RuleDto](docs/RuleDto.md)
 - [OpenApiDefinition.UserInfoDto](docs/UserInfoDto.md)


## Documentation for Authorization


Authentication schemes defined for the API:
### bearerAuth

- **Type**: Bearer authentication (JWT)

