# OpenApiDefinition.S3ControllerApi

All URIs are relative to *http://localhost:8082*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getFile**](S3ControllerApi.md#getFile) | **GET** /api/v1/s3/file/get/{key} | 
[**uploadFile**](S3ControllerApi.md#uploadFile) | **POST** /api/v1/s3/file/upload | 



## getFile

> String getFile(key)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.S3ControllerApi();
let key = "key_example"; // String | 
apiInstance.getFile(key, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **key** | **String**|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## uploadFile

> String uploadFile(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.S3ControllerApi();
let opts = {
  'uploadFileRequest': new OpenApiDefinition.UploadFileRequest() // UploadFileRequest | 
};
apiInstance.uploadFile(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **uploadFileRequest** | [**UploadFileRequest**](UploadFileRequest.md)|  | [optional] 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

