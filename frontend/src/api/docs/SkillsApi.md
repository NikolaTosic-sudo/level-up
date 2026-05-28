# SkillsApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1LevelupApiCreateSkillPost**](SkillsApi.md#v1levelupapicreateskillpost) | **POST** /v1/levelup_api/create-skill | Create skill |
| [**v1LevelupApiSkillIdDeactivateDelete**](SkillsApi.md#v1levelupapiskilliddeactivatedelete) | **DELETE** /v1/levelup_api/skill/{id}/deactivate | Deactivate |
| [**v1LevelupApiSkillsGet**](SkillsApi.md#v1levelupapiskillsget) | **GET** /v1/levelup_api/skills | Get skills from database |
| [**v1LevelupApiSkillsNotUserGet**](SkillsApi.md#v1levelupapiskillsnotuserget) | **GET** /v1/levelup_api/skills-not-user | Get skills from database |
| [**v1LevelupApiUserSkillsExcludeGet**](SkillsApi.md#v1levelupapiuserskillsexcludeget) | **GET** /v1/levelup_api/user/skills_exclude | Get user\&#39;s skills from database |
| [**v1LevelupApiUserSkillsGet**](SkillsApi.md#v1levelupapiuserskillsget) | **GET** /v1/levelup_api/user/skills | Get user\&#39;s skills from database |



## v1LevelupApiCreateSkillPost

> v1LevelupApiCreateSkillPost(body)

Create skill

create skill for user

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { V1LevelupApiCreateSkillPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SkillsApi();

  const body = {
    // MainSkillCreationPayload | Skill creation
    body: ...,
  } satisfies V1LevelupApiCreateSkillPostRequest;

  try {
    const data = await api.v1LevelupApiCreateSkillPost(body);
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
| **body** | [MainSkillCreationPayload](MainSkillCreationPayload.md) | Skill creation | |

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


## v1LevelupApiSkillIdDeactivateDelete

> v1LevelupApiSkillIdDeactivateDelete(id)

Deactivate

deactivate the skill

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { V1LevelupApiSkillIdDeactivateDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SkillsApi();

  const body = {
    // number | Id of the skill
    id: 56,
  } satisfies V1LevelupApiSkillIdDeactivateDeleteRequest;

  try {
    const data = await api.v1LevelupApiSkillIdDeactivateDelete(body);
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
| **id** | `number` | Id of the skill | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


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


## v1LevelupApiSkillsNotUserGet

> MainSkillsNotOwnedResponse v1LevelupApiSkillsNotUserGet(name)

Get skills from database

get skills not owned by the user, limited to 200 results

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { V1LevelupApiSkillsNotUserGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SkillsApi();

  const body = {
    // string | Get skills with the typed in prefix and not owned by current user (optional)
    name: name_example,
  } satisfies V1LevelupApiSkillsNotUserGetRequest;

  try {
    const data = await api.v1LevelupApiSkillsNotUserGet(body);
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
| **name** | `string` | Get skills with the typed in prefix and not owned by current user | [Optional] [Defaults to `undefined`] |

### Return type

[**MainSkillsNotOwnedResponse**](MainSkillsNotOwnedResponse.md)

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


## v1LevelupApiUserSkillsExcludeGet

> MainSkillsExcludeResponse v1LevelupApiUserSkillsExcludeGet(name, excludeIds, excludeName)

Get user\&#39;s skills from database

get user\&#39;s skills

### Example

```ts
import {
  Configuration,
  SkillsApi,
} from '';
import type { V1LevelupApiUserSkillsExcludeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new SkillsApi();

  const body = {
    // string | Get skills with the typed in prefix (optional)
    name: name_example,
    // Array<number> | Exclude skills (optional)
    excludeIds: ...,
    // string | Exclude given skill (optional)
    excludeName: excludeName_example,
  } satisfies V1LevelupApiUserSkillsExcludeGetRequest;

  try {
    const data = await api.v1LevelupApiUserSkillsExcludeGet(body);
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
| **excludeIds** | `Array<number>` | Exclude skills | [Optional] |
| **excludeName** | `string` | Exclude given skill | [Optional] [Defaults to `undefined`] |

### Return type

[**MainSkillsExcludeResponse**](MainSkillsExcludeResponse.md)

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

Get user\&#39;s skills from database

get user\&#39;s skills

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

