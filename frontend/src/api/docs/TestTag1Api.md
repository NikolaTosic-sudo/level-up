# TestTag1Api

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**testGet**](TestTag1Api.md#testget) | **GET** /test | testing swagger and api |



## testGet

> MainTestResponse testGet()

testing swagger and api

test job

### Example

```ts
import {
  Configuration,
  TestTag1Api,
} from '';
import type { TestGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestTag1Api();

  try {
    const data = await api.testGet();
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

[**MainTestResponse**](MainTestResponse.md)

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

