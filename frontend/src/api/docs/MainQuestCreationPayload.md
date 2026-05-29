
# MainQuestCreationPayload


## Properties

Name | Type
------------ | -------------
`experience` | number
`id` | number
`name` | string
`skills` | [Array&lt;MainSkillCreationPayload&gt;](MainSkillCreationPayload.md)
`subQuests` | [Array&lt;MainRepeatingQuest&gt;](MainRepeatingQuest.md)
`type` | string

## Example

```typescript
import type { MainQuestCreationPayload } from ''

// TODO: Update the object below with actual values
const example = {
  "experience": null,
  "id": null,
  "name": null,
  "skills": null,
  "subQuests": null,
  "type": null,
} satisfies MainQuestCreationPayload

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainQuestCreationPayload
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


