
# MainPlayerInfoResponse


## Properties

Name | Type
------------ | -------------
`experience` | number
`experienceNeeded` | number
`hotStreak` | number
`level` | number
`name` | string

## Example

```typescript
import type { MainPlayerInfoResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "experience": null,
  "experienceNeeded": null,
  "hotStreak": null,
  "level": null,
  "name": null,
} satisfies MainPlayerInfoResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainPlayerInfoResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


