# OpenApiDefinition.DefaultApi

All URIs are relative to *http://localhost:8084*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createRule**](DefaultApi.md#createRule) | **POST** /api/v1/rules | Создание правила
[**deleteRule**](DefaultApi.md#deleteRule) | **DELETE** /api/v1/rules/{ruleId} | Удаление правила правила
[**getApartmentRules**](DefaultApi.md#getApartmentRules) | **GET** /api/v1/rules/{apartmentId} | Получение правил по идентификатору квартиры
[**updateRule**](DefaultApi.md#updateRule) | **PUT** /api/v1/rules | Обновление правила



## createRule

> RuleDto createRule(createRuleRequest)

Создание правила

Позволяет создать новое правило

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let createRuleRequest = new OpenApiDefinition.CreateRuleRequest(); // CreateRuleRequest | 
apiInstance.createRule(createRuleRequest, (error, data, response) => {
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
 **createRuleRequest** | [**CreateRuleRequest**](CreateRuleRequest.md)|  | 

### Return type

[**RuleDto**](RuleDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deleteRule

> deleteRule(ruleId)

Удаление правила правила

Позволяет удалить существующее правило

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let ruleId = "ruleId_example"; // String | 
apiInstance.deleteRule(ruleId, (error, data, response) => {
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
 **ruleId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## getApartmentRules

> [RuleDto] getApartmentRules(apartmentId)

Получение правил по идентификатору квартиры

Позволяет получить правила по идентификатору квартиры

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
apiInstance.getApartmentRules(apartmentId, (error, data, response) => {
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

### Return type

[**[RuleDto]**](RuleDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateRule

> RuleDto updateRule(updateRuleRequest)

Обновление правила

Позволяет обновить существующее правило

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let updateRuleRequest = new OpenApiDefinition.UpdateRuleRequest(); // UpdateRuleRequest | 
apiInstance.updateRule(updateRuleRequest, (error, data, response) => {
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
 **updateRuleRequest** | [**UpdateRuleRequest**](UpdateRuleRequest.md)|  | 

### Return type

[**RuleDto**](RuleDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

