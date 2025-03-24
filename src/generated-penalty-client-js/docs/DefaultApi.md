# OpenApiDefinition.DefaultApi

All URIs are relative to *http://localhost:8085*

Method | HTTP request | Description
------------- | ------------- | -------------
[**changeStatus**](DefaultApi.md#changeStatus) | **PATCH** /api/v1/penalties/{penaltyId} | Изменение статуса штрафа
[**createPenalty**](DefaultApi.md#createPenalty) | **POST** /api/v1/penalties | Создание штрафа
[**deletePenalty**](DefaultApi.md#deletePenalty) | **DELETE** /api/v1/penalties/{penaltyId} | Удаление штрафа
[**getApartmentPenalties**](DefaultApi.md#getApartmentPenalties) | **GET** /api/v1/penalties/{apartmentId} | Получение штрафов по квартире



## changeStatus

> PenaltyDto changeStatus(penaltyId, status)

Изменение статуса штрафа

Позволяет изменить статус штрафа по идентификатору

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let penaltyId = "penaltyId_example"; // String | 
let status = "status_example"; // String | 
apiInstance.changeStatus(penaltyId, status, (error, data, response) => {
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
 **penaltyId** | **String**|  | 
 **status** | **String**|  | 

### Return type

[**PenaltyDto**](PenaltyDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## createPenalty

> PenaltyDto createPenalty(createPenaltyRequest)

Создание штрафа

Позволяет создать новый штраф

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let createPenaltyRequest = new OpenApiDefinition.CreatePenaltyRequest(); // CreatePenaltyRequest | 
apiInstance.createPenalty(createPenaltyRequest, (error, data, response) => {
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
 **createPenaltyRequest** | [**CreatePenaltyRequest**](CreatePenaltyRequest.md)|  | 

### Return type

[**PenaltyDto**](PenaltyDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deletePenalty

> deletePenalty(penaltyId)

Удаление штрафа

Позволяет удалить штраф по идентификатору

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let penaltyId = "penaltyId_example"; // String | 
apiInstance.deletePenalty(penaltyId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **penaltyId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getApartmentPenalties

> [PenaltyResponse] getApartmentPenalties(apartmentId, opts)

Получение штрафов по квартире

Позволяет получить все штрафы по идентификатору квартиры за указанный период

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
let opts = {
  'startDate': new Date("2013-10-20"), // Date | 
  'endDate': new Date("2013-10-20") // Date | 
};
apiInstance.getApartmentPenalties(apartmentId, opts, (error, data, response) => {
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
 **apartmentId** | **String**|  | 
 **startDate** | **Date**|  | [optional] 
 **endDate** | **Date**|  | [optional] 

### Return type

[**[PenaltyResponse]**](PenaltyResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

