# LoginApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1LevelupApiLogInPost**](LoginApi.md#v1levelupapiloginpost) | **POST** /v1/levelup_api/logIn | Log In the user |
| [**v1LevelupApiSignUpPost**](LoginApi.md#v1levelupapisignuppost) | **POST** /v1/levelup_api/signUp | Sign up the user |



## v1LevelupApiLogInPost

> MainLoginResponse v1LevelupApiLogInPost(body)

Log In the user

take the email and the password, hash the password, check for user and login

### Example

```ts
import {
  Configuration,
  LoginApi,
} from '';
import type { V1LevelupApiLogInPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LoginApi();

  const body = {
    // MainLoginBody | Login payload
    body: ...,
  } satisfies V1LevelupApiLogInPostRequest;

  try {
    const data = await api.v1LevelupApiLogInPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **body** | [MainLoginBody](MainLoginBody.md) | Login payload | |

### Return type

[**MainLoginResponse**](MainLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1LevelupApiSignUpPost

> MainLoginResponse v1LevelupApiSignUpPost(body)

Sign up the user

take the email and the password, hash the password, create the user and make cookies

### Example

```ts
import {
  Configuration,
  LoginApi,
} from '';
import type { V1LevelupApiSignUpPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new LoginApi();

  const body = {
    // MainLoginBody | SignUp payload
    body: ...,
  } satisfies V1LevelupApiSignUpPostRequest;

  try {
    const data = await api.v1LevelupApiSignUpPost(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **body** | [MainLoginBody](MainLoginBody.md) | SignUp payload | |

### Return type

[**MainLoginResponse**](MainLoginResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

