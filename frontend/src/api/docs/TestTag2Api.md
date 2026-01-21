# TestTag2Api

All URIs are relative to *http://localhost:8080*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**testTwoGet**](TestTag2Api.md#testtwoget) | **GET** /test-two | testing swagger and api |



## testTwoGet

> MainTestResponseTwo testTwoGet()

testing swagger and api

test job

### Example

```ts
import {
  Configuration,
  TestTag2Api,
} from '';
import type { TestTwoGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new TestTag2Api();

  try {
    const data = await api.testTwoGet();
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

[**MainTestResponseTwo**](MainTestResponseTwo.md)

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

