# OpenApiDefinition.DefaultApi

All URIs are relative to *http://localhost:8086*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createExpenses**](DefaultApi.md#createExpenses) | **POST** /api/v1/expenses | Создание нового расхода
[**getDebts**](DefaultApi.md#getDebts) | **GET** /api/v1/finance/debts/{apartmentId} | Получение списка долгов
[**getExpenses**](DefaultApi.md#getExpenses) | **GET** /api/v1/expenses | Получение расходов за указанный период
[**getUserFinances**](DefaultApi.md#getUserFinances) | **GET** /api/v1/finance/{apartmentId} | Получение финансов пользователей
[**payDebt**](DefaultApi.md#payDebt) | **PATCH** /api/v1/finance/debts/{debtId}/pay | Оплата долга



## createExpenses

> ExpensesDto createExpenses(createExpenseRequest)

Создание нового расхода

Позволяет создать запись о новом расходе.

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let createExpenseRequest = new OpenApiDefinition.CreateExpenseRequest(); // CreateExpenseRequest | 
apiInstance.createExpenses(createExpenseRequest, (error, data, response) => {
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
 **createExpenseRequest** | [**CreateExpenseRequest**](CreateExpenseRequest.md)|  | 

### Return type

[**ExpensesDto**](ExpensesDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## getDebts

> [DebtDto] getDebts(apartmentId, period)

Получение списка долгов

Возвращает список долгов пользователей за указанный период времени.

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
let period = 56; // Number | 
apiInstance.getDebts(apartmentId, period, (error, data, response) => {
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
 **period** | **Number**|  | 

### Return type

[**[DebtDto]**](DebtDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getExpenses

> [ExpensesDto] getExpenses(opts)

Получение расходов за указанный период

Позволяет получить список всех расходов за указанный период времени.

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let opts = {
  'startDate': new Date("2013-10-20"), // Date | 
  'endDate': new Date("2013-10-20") // Date | 
};
apiInstance.getExpenses(opts, (error, data, response) => {
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
 **startDate** | **Date**|  | [optional] 
 **endDate** | **Date**|  | [optional] 

### Return type

[**[ExpensesDto]**](ExpensesDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getUserFinances

> [Participant] getUserFinances(apartmentId, period)

Получение финансов пользователей

Возвращает финансовую информацию по пользователям за указанный период времени. Если даты не указаны, возвращаются данные за всё время.

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
let period = 56; // Number | 
apiInstance.getUserFinances(apartmentId, period, (error, data, response) => {
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
 **period** | **Number**|  | 

### Return type

[**[Participant]**](Participant.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## payDebt

> DebtDto payDebt(debtId)

Оплата долга

Отмечает долг как оплаченный по его идентификатору.

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let debtId = "debtId_example"; // String | 
apiInstance.payDebt(debtId, (error, data, response) => {
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
 **debtId** | **String**|  | 

### Return type

[**DebtDto**](DebtDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

