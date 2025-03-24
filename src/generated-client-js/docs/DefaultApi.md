# OpenApiDefinition.DefaultApi

All URIs are relative to *http://localhost:8082*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addToApartment**](DefaultApi.md#addToApartment) | **POST** /api/v1/apartments/{apartmentId}/users/{userId} | Добавление пользователя в квартиру
[**changePassword**](DefaultApi.md#changePassword) | **PATCH** /api/v1/users/{userId}/password | Обновление пароля
[**createApartment**](DefaultApi.md#createApartment) | **POST** /api/v1/apartments | Создание квартиры
[**deleteApartment**](DefaultApi.md#deleteApartment) | **DELETE** /api/v1/apartments/{apartmentId} | Удаление квартиры
[**deleteFromApartment**](DefaultApi.md#deleteFromApartment) | **DELETE** /api/v1/apartments/{apartmentId}/users/{userId} | Удаление пользователя из квартиры
[**deleteUser**](DefaultApi.md#deleteUser) | **DELETE** /api/v1/users/{userId} | 
[**findApartmentByUser**](DefaultApi.md#findApartmentByUser) | **GET** /api/v1/apartments/by-user | Получение квартиры по JWT токену пользователя
[**getApartment**](DefaultApi.md#getApartment) | **GET** /api/v1/apartments/{apartmentId} | Получение квартиры идентификатору
[**getApartmentUsers**](DefaultApi.md#getApartmentUsers) | **GET** /api/v1/apartments/{apartmentId}/users | Получение пользователей, проживающих в квартире
[**getUser**](DefaultApi.md#getUser) | **GET** /api/v1/users/me | Получение информации о пользователе по JWT токену
[**login**](DefaultApi.md#login) | **POST** /api/v1/auth/login | Получение JWT токена
[**refreshToken**](DefaultApi.md#refreshToken) | **POST** /api/v1/auth/refresh | Обновление JWT токена
[**register**](DefaultApi.md#register) | **POST** /api/v1/users/register | Регистрация пользователя
[**updateApartment**](DefaultApi.md#updateApartment) | **PUT** /api/v1/apartments/{apartmentId} | Обновление квартиры



## addToApartment

> AddToApartmentResponse addToApartment(apartmentId, userId)

Добавление пользователя в квартиру

Позволяет добавить пользователя в квартиру по идентификатору

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
let userId = "userId_example"; // String | 
apiInstance.addToApartment(apartmentId, userId, (error, data, response) => {
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
 **userId** | **String**|  | 

### Return type

[**AddToApartmentResponse**](AddToApartmentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## changePassword

> changePassword(userId, changePasswordRequest)

Обновление пароля

Позволяет обновить пароль пользователя

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.DefaultApi();
let userId = "userId_example"; // String | 
let changePasswordRequest = new OpenApiDefinition.ChangePasswordRequest(); // ChangePasswordRequest | 
apiInstance.changePassword(userId, changePasswordRequest, (error, data, response) => {
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
 **userId** | **String**|  | 
 **changePasswordRequest** | [**ChangePasswordRequest**](ChangePasswordRequest.md)|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## createApartment

> CreateApartmentResponse createApartment(createApartmentRequest)

Создание квартиры

Позволяет создать квартиру

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let createApartmentRequest = new OpenApiDefinition.CreateApartmentRequest(); // CreateApartmentRequest | 
apiInstance.createApartment(createApartmentRequest, (error, data, response) => {
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
 **createApartmentRequest** | [**CreateApartmentRequest**](CreateApartmentRequest.md)|  | 

### Return type

[**CreateApartmentResponse**](CreateApartmentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deleteApartment

> deleteApartment(apartmentId)

Удаление квартиры

Позволяет удалить квартиру

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
apiInstance.deleteApartment(apartmentId, (error, data, response) => {
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
 **apartmentId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## deleteFromApartment

> deleteFromApartment(apartmentId, userId)

Удаление пользователя из квартиры

Позволяет удалить пользователя из квартиры

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
let userId = "userId_example"; // String | 
apiInstance.deleteFromApartment(apartmentId, userId, (error, data, response) => {
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
 **apartmentId** | **String**|  | 
 **userId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## deleteUser

> deleteUser(userId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.DefaultApi();
let userId = "userId_example"; // String | 
apiInstance.deleteUser(userId, (error, data, response) => {
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
 **userId** | **String**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## findApartmentByUser

> ApartmentInfo findApartmentByUser()

Получение квартиры по JWT токену пользователя

Позволяет получить квартиру по JWT токену пользователя

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
apiInstance.findApartmentByUser((error, data, response) => {
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

[**ApartmentInfo**](ApartmentInfo.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getApartment

> GetApartmentResponse getApartment(apartmentId)

Получение квартиры идентификатору

Позволяет получить квартиру по JWT токену пользователя

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
apiInstance.getApartment(apartmentId, (error, data, response) => {
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

[**GetApartmentResponse**](GetApartmentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getApartmentUsers

> [GetUserResponse] getApartmentUsers(apartmentId)

Получение пользователей, проживающих в квартире

Позволяет получить пользователей, проживающих в квартире

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
apiInstance.getApartmentUsers(apartmentId, (error, data, response) => {
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

[**[GetUserResponse]**](GetUserResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getUser

> GetUserResponse getUser()

Получение информации о пользователе по JWT токену

Позволяет получить информацию о пользователе по JWT токену

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.DefaultApi();
apiInstance.getUser((error, data, response) => {
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

[**GetUserResponse**](GetUserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## login

> TokenResponse login(authRequest)

Получение JWT токена

Позволяет получить JWT токен для доступа к защищенным ресурсам

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.DefaultApi();
let authRequest = new OpenApiDefinition.AuthRequest(); // AuthRequest | 
apiInstance.login(authRequest, (error, data, response) => {
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
 **authRequest** | [**AuthRequest**](AuthRequest.md)|  | 

### Return type

[**TokenResponse**](TokenResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## refreshToken

> TokenResponse refreshToken(refreshTokenRequest)

Обновление JWT токена

Позволяет обновить JWT токен для доступа к защищенным ресурсам

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.DefaultApi();
let refreshTokenRequest = new OpenApiDefinition.RefreshTokenRequest(); // RefreshTokenRequest | 
apiInstance.refreshToken(refreshTokenRequest, (error, data, response) => {
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
 **refreshTokenRequest** | [**RefreshTokenRequest**](RefreshTokenRequest.md)|  | 

### Return type

[**TokenResponse**](TokenResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## register

> UserResponse register(userRegistrationRequest)

Регистрация пользователя

Позволяет зарегистрировать пользователя в системе

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.DefaultApi();
let userRegistrationRequest = new OpenApiDefinition.UserRegistrationRequest(); // UserRegistrationRequest | 
apiInstance.register(userRegistrationRequest, (error, data, response) => {
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
 **userRegistrationRequest** | [**UserRegistrationRequest**](UserRegistrationRequest.md)|  | 

### Return type

[**UserResponse**](UserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## updateApartment

> UpdateApartmentResponse updateApartment(apartmentId, updateApartmentRequest)

Обновление квартиры

Позволяет обновить квартиру

### Example

```javascript
import OpenApiDefinition from 'open_api_definition';
let defaultClient = OpenApiDefinition.ApiClient.instance;
// Configure Bearer (JWT) access token for authorization: bearerAuth
let bearerAuth = defaultClient.authentications['bearerAuth'];
bearerAuth.accessToken = "YOUR ACCESS TOKEN"

let apiInstance = new OpenApiDefinition.DefaultApi();
let apartmentId = "apartmentId_example"; // String | 
let updateApartmentRequest = new OpenApiDefinition.UpdateApartmentRequest(); // UpdateApartmentRequest | 
apiInstance.updateApartment(apartmentId, updateApartmentRequest, (error, data, response) => {
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
 **updateApartmentRequest** | [**UpdateApartmentRequest**](UpdateApartmentRequest.md)|  | 

### Return type

[**UpdateApartmentResponse**](UpdateApartmentResponse.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

