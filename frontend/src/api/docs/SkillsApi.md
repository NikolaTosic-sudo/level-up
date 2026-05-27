# SkillsApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1LevelupApiSkillsGet**](SkillsApi.md#v1levelupapiskillsget) | **GET** /v1/levelup_api/skills | Get skills from database |
| [**v1LevelupApiUserSkillsGet**](SkillsApi.md#v1levelupapiuserskillsget) | **GET** /v1/levelup_api/user/skills | Get skills from database |



## v1LevelupApiSkillsGet

> MainSkillsResponse v1LevelupApiSkillsGet(name)

Get skills from database

get skills, limited to 200 results

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { V1LevelupApiSkillsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SkillsApi();

  const body = {
    // string | Get skills with the typed in prefix (optional)
    name: name_example,
  } satisfies V1LevelupApiSkillsGetRequest;

  try {
    const data = await api.v1LevelupApiSkillsGet(body);
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
| **name** | `string` | Get skills with the typed in prefix | [Optional] [Defaults to `undefined`] |

### Return type

[**MainSkillsResponse**](MainSkillsResponse.md)

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


## v1LevelupApiUserSkillsGet

> MainUsersSkillsResponse v1LevelupApiUserSkillsGet()

Get skills from database

get skills, limited to 200 results

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { V1LevelupApiUserSkillsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SkillsApi();

  try {
    const data = await api.v1LevelupApiUserSkillsGet();
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

[**MainUsersSkillsResponse**](MainUsersSkillsResponse.md)

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

