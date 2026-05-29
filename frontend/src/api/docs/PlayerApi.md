# PlayerApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1LevelupApiCreateProfilePost**](PlayerApi.md#v1levelupapicreateprofilepost) | **POST** /v1/levelup_api/createProfile | Create the player |
| [**v1LevelupApiUpdateUserPost**](PlayerApi.md#v1levelupapiupdateuserpost) | **POST** /v1/levelup_api/updateUser | Update the player |
| [**v1LevelupApiUserInfoGet**](PlayerApi.md#v1levelupapiuserinfoget) | **GET** /v1/levelup_api/user/info | Get player info |
| [**v1LevelupApiUserProfileGet**](PlayerApi.md#v1levelupapiuserprofileget) | **GET** /v1/levelup_api/userProfile | Get the player |



## v1LevelupApiCreateProfilePost

> MainLoginResponse v1LevelupApiCreateProfilePost(body)

Create the player

Create the player with user\&#39;s info, skills and quests

### Example

```ts
import {
  Configuration,
  PlayerApi,
} from '';
import type { V1LevelupApiCreateProfilePostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PlayerApi();

  const body = {
    // MainProfileCreationBody | Profile creation payload
    body: ...,
  } satisfies V1LevelupApiCreateProfilePostRequest;

  try {
    const data = await api.v1LevelupApiCreateProfilePost(body);
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
| **body** | [MainProfileCreationBody](MainProfileCreationBody.md) | Profile creation payload | |

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


## v1LevelupApiUpdateUserPost

> v1LevelupApiUpdateUserPost(body)

Update the player

Update the player

### Example

```ts
import {
  Configuration,
  PlayerApi,
} from '';
import type { V1LevelupApiUpdateUserPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PlayerApi();

  const body = {
    // MainUpdateUserBody | User update payload
    body: ...,
  } satisfies V1LevelupApiUpdateUserPostRequest;

  try {
    const data = await api.v1LevelupApiUpdateUserPost(body);
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
| **body** | [MainUpdateUserBody](MainUpdateUserBody.md) | User update payload | |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1LevelupApiUserInfoGet

> MainPlayerInfoResponse v1LevelupApiUserInfoGet()

Get player info

Get info for the header

### Example

```ts
import {
  Configuration,
  PlayerApi,
} from '';
import type { V1LevelupApiUserInfoGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PlayerApi();

  try {
    const data = await api.v1LevelupApiUserInfoGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**MainPlayerInfoResponse**](MainPlayerInfoResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## v1LevelupApiUserProfileGet

> MainUserResponse v1LevelupApiUserProfileGet()

Get the player

Get everything about the player

### Example

```ts
import {
  Configuration,
  PlayerApi,
} from '';
import type { V1LevelupApiUserProfileGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new PlayerApi();

  try {
    const data = await api.v1LevelupApiUserProfileGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**MainUserResponse**](MainUserResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

