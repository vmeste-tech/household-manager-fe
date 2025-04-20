# OpenApiDefinition.DefaultApi

All URIs are relative to *http://localhost:8087*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getNotifications**](DefaultApi.md#getNotifications) | **GET** /api/v1/notification | Получение списка уведомлений
[**getSetting**](DefaultApi.md#getSetting) | **GET** /api/v1/notification/setting | 
[**readNotification**](DefaultApi.md#readNotification) | **PATCH** /api/v1/notification/read/{notificationId} | Обновление статуса уведомления
[**updateSetting**](DefaultApi.md#updateSetting) | **PUT** /api/v1/notification/setting/update | 



## getNotifications

> [NotificationDto] getNotifications()

Получение списка уведомлений

Позволяет получить список уведомлений

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
apiInstance.getNotifications((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[NotificationDto]**](NotificationDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getSetting

> NotificationSettingDto getSetting()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
apiInstance.getSetting((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**NotificationSettingDto**](NotificationSettingDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## readNotification

> NotificationDto readNotification(notificationId)

Обновление статуса уведомления

Позволяет обновить статус уведомления

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let notificationId = "notificationId_example"; // String | 
apiInstance.readNotification(notificationId, (error, data, response) => {
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
 **notificationId** | **String**|  | 

### Return type

[**NotificationDto**](NotificationDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateSetting

> NotificationSettingDto updateSetting(notificationSettingDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let notificationSettingDto = new OpenApiDefinition.NotificationSettingDto(); // NotificationSettingDto | 
apiInstance.updateSetting(notificationSettingDto, (error, data, response) => {
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
 **notificationSettingDto** | [**NotificationSettingDto**](NotificationSettingDto.md)|  | 

### Return type

[**NotificationSettingDto**](NotificationSettingDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

