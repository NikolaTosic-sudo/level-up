# QuestsApi

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**v1LevelupApiQuestsGet**](QuestsApi.md#v1levelupapiquestsget) | **GET** /v1/levelup_api/quests | Get all quests for the user |



## v1LevelupApiQuestsGet

> MainQuestsReponse v1LevelupApiQuestsGet()

Get all quests for the user

### Example

```ts
import {
  Configuration,
  QuestsApi,
} from '';
import type { V1LevelupApiQuestsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new QuestsApi();

  try {
    const data = await api.v1LevelupApiQuestsGet();
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

[**MainQuestsReponse**](MainQuestsReponse.md)

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

