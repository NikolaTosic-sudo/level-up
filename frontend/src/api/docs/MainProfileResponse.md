
# MainProfileResponse


## Properties

Name | Type
------------ | -------------
`dateOfBirth` | string
`email` | string
`firstName` | string
`lastName` | string
`nickName` | string

## Example

```typescript
import type { MainProfileResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "dateOfBirth": null,
  "email": null,
  "firstName": null,
  "lastName": null,
  "nickName": null,
} satisfies MainProfileResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainProfileResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


