
# MainRepeatingQuest


## Properties

Name | Type
------------ | -------------
`completed` | boolean
`experience` | number
`id` | number
`name` | string
`skills` | [Array&lt;MainQuestsSkills&gt;](MainQuestsSkills.md)
`subQuests` | [Array&lt;MainRepeatingQuest&gt;](MainRepeatingQuest.md)
`subQuestsCompleted` | number
`type` | string

## Example

```typescript
import type { MainRepeatingQuest } from ''

// TODO: Update the object below with actual values
const example = {
  "completed": null,
  "experience": null,
  "id": null,
  "name": null,
  "skills": null,
  "subQuests": null,
  "subQuestsCompleted": null,
  "type": null,
} satisfies MainRepeatingQuest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as MainRepeatingQuest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


