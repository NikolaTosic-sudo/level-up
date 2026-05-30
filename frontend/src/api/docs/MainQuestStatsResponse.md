
# MainQuestStatsResponse


## Properties

Name | Type
------------ | -------------
`customQuestCompleted` | number
`experienceGained` | number
`questCompleted` | number
`repeatingQuestCompleted` | number
`subQuestsCompleted` | number

## Example

```typescript
import type { MainQuestStatsResponse } from ''

// TODO: Update the object below with actual values
const example = {
  "customQuestCompleted": null,
  "experienceGained": null,
  "questCompleted": null,
  "repeatingQuestCompleted": null,
  "subQuestsCompleted": null,
} satisfies MainQuestStatsResponse

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainQuestStatsResponse
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


