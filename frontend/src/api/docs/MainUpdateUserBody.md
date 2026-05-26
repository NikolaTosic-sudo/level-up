
# MainUpdateUserBody


## Properties

Name | Type
------------ | -------------
`bio` | string
`dateOfBirth` | string
`email` | string
`firstName` | string
`lastName` | string
`nickName` | string
`target` | string

## Example

```typescript
import type { MainUpdateUserBody } from ''

// TODO: Update the object below with actual values
const example = {
  "bio": null,
  "dateOfBirth": null,
  "email": null,
  "firstName": null,
  "lastName": null,
  "nickName": null,
  "target": null,
} satisfies MainUpdateUserBody

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainUpdateUserBody
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


