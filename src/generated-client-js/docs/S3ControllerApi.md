# OpenApiDefinition.S3ControllerApi

All URIs are relative to *http://localhost:8082*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getFile**](S3ControllerApi.md#getFile) | **GET** /api/v1/s3/file/get/{key} | 
[**uploadBase64File**](S3ControllerApi.md#uploadBase64File) | **POST** /api/v1/s3/file/upload/base64 | 
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


## uploadBase64File

> String uploadBase64File(body)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.S3ControllerApi();
let body = "body_example"; // String | 
apiInstance.uploadBase64File(body, (error, data, response) => {
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
 **body** | **String**|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
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

