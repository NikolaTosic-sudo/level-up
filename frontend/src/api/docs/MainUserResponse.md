
# MainUserResponse


## Properties

Name | Type
------------ | -------------
`bio` | string
`highestLeveledSkill` | string
`mostRecentLeveledSkill` | string
`profile` | [MainProfileResponse](MainProfileResponse.md)

## Example

```typescript
import type { MainUserResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "bio": null,
  "highestLeveledSkill": null,
  "mostRecentLeveledSkill": null,
  "profile": null,
} satisfies MainUserResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainUserResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


