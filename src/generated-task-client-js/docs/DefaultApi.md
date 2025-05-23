# OpenApiDefinition.DefaultApi

All URIs are relative to *http://localhost:8083*

Method | HTTP request | Description
------------- | ------------- | -------------
[**changeStatus**](DefaultApi.md#changeStatus) | **PATCH** /api/v1/tasks/status | Изменение статуса задачи
[**create**](DefaultApi.md#create) | **POST** /api/v1/tasks | Создание задачи
[**deleteTask**](DefaultApi.md#deleteTask) | **DELETE** /api/v1/tasks/{taskId} | Удаление задачи
[**getOverdueTasks**](DefaultApi.md#getOverdueTasks) | **GET** /api/v1/tasks/{apartmentId}/overdue | Получение списка просроченных задач
[**getTasks**](DefaultApi.md#getTasks) | **GET** /api/v1/tasks/{apartmentId}/all | Получение списка задач



## changeStatus

> ChangeStatusResponse changeStatus(taskDto)

Изменение статуса задачи

Позволяет создать задачу

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let taskDto = new OpenApiDefinition.TaskDto(); // TaskDto | 
apiInstance.changeStatus(taskDto, (error, data, response) => {
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
 **taskDto** | [**TaskDto**](TaskDto.md)|  | 

### Return type

[**ChangeStatusResponse**](ChangeStatusResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## create

> TaskDto create(createTaskRequest)

Создание задачи

Позволяет создать задачу

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let createTaskRequest = new OpenApiDefinition.CreateTaskRequest(); // CreateTaskRequest | 
apiInstance.create(createTaskRequest, (error, data, response) => {
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
 **createTaskRequest** | [**CreateTaskRequest**](CreateTaskRequest.md)|  | 

### Return type

[**TaskDto**](TaskDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deleteTask

> deleteTask(taskId)

Удаление задачи

Позволяет удалить задачу

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let taskId = "taskId_example"; // String | 
apiInstance.deleteTask(taskId, (error, data, response) => {
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
 **taskId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## getOverdueTasks

> [TaskDto] getOverdueTasks(apartmentId)

Получение списка просроченных задач

Позволяет получить список просроченных задач

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
apiInstance.getOverdueTasks(apartmentId, (error, data, response) => {
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

[**[TaskDto]**](TaskDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getTasks

> [TaskDto] getTasks(apartmentId, startDate, endDate)

Получение списка задач

Позволяет получить задачи исходя из текущих статусов правил и проживающих

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
let startDate = new Date("2013-10-20"); // Date | 
let endDate = new Date("2013-10-20"); // Date | 
apiInstance.getTasks(apartmentId, startDate, endDate, (error, data, response) => {
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
 **startDate** | **Date**|  | 
 **endDate** | **Date**|  | 

### Return type

[**[TaskDto]**](TaskDto.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

